from flask import Flask, request, jsonify, make_response
import random
import smtplib
import mysql
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import datetime
from db_connection import get_db_connection  # Import the connection function
from config import EMAIL_CONFIG  # Import credentials for email
from flask_cors import CORS
import jwt
from cryptography.fernet import Fernet
from dotenv import load_dotenv
import os
from send_course_notificaion import send_course_notification_email
load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
connection = get_db_connection()
print("server running...")
JWT_SECRET = os.getenv("JWT_SECRET_TOKEN")
ENCRYPTION_KEY = Fernet.generate_key()
cipher = Fernet(ENCRYPTION_KEY)
# Function to generate a random OTP
def generate_otp():
    return random.randint(100000, 999999)

# Function to send OTP via Gmail
def send_otp_email(recipient_email, otp):
    try:
        sender_email = EMAIL_CONFIG["email"]
        sender_password = EMAIL_CONFIG["password"]

        # Set up the email
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = recipient_email
        message["Subject"] = "Your OTP Code"
        body = f"Your OTP code is: {otp}. It is valid for 5 minutes."
        message.attach(MIMEText(body, "plain"))

        # Set up the SMTP server
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(message)
        server.quit()
        print(f"OTP sent to {recipient_email}")
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False
# Function to generate and encrypt JWT token
def generate_jwt(email):
    payload = {
        'email': email,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)  # Expiration time
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm='HS256')
    encrypted_token = cipher.encrypt(token.encode('utf-8'))
    return encrypted_token

@app.route('/login-verification', methods=['POST'])
def verify_data():
    print("request received")
    # Get data sent from React (assume JSON format)
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Connect to the database and verify the data
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        
        # Query the database for the username and password
        cursor.execute("SELECT * FROM userdetails WHERE email = %s", (email,))
        user = cursor.fetchone()
        if user and user[4] == password:
            otp = generate_otp()
            send_otp_email(email, otp)
            # Insert or update user details
            cursor.execute("""
                INSERT INTO otp (email, otp)
                VALUES (%s, %s)
                ON DUPLICATE KEY UPDATE
                otp = VALUES(otp)
        """, (email, otp))
            connection.commit()
            return jsonify({"message": "Data matches and OTP sent!", "status": "success"}), 200
        else:
            return jsonify({"message": "Invalid username or password", "status": "error"}), 400

    except mysql.connector.Error as err:
        return jsonify({"message": f"Error connecting to database: {err}", "status": "error"}), 500
    finally:
        cursor.close()
        connection.close()



@app.route("/api/verify-otp", methods=["POST"])
def generate_otp_route():
    print("verify-otp")
    data = request.json
    req_otp = data.get("otp")
    email = data.get("email")
    if not email:
        return jsonify({"error": "Email is required"}), 400
    try:
        # Save details to the database
          # Use the function from db_connection.py
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM otp WHERE email = %s", (email,))
        user = cursor.fetchone()
        if int(req_otp) == user[0]:
            encrypted_token = generate_jwt(email)
            cursor.execute("""
                INSERT INTO otp (email, token)
                VALUES (%s, %s)
                ON DUPLICATE KEY UPDATE
                token = VALUES(token)
        """, (email, encrypted_token.decode("utf-8")))
            connection.commit()


            # Create response
            response = make_response(jsonify({
                "message": "Data matches!",
                "status": "success",
                "token":encrypted_token.decode('utf-8')
            }))
       
            return response, 200
        else:
            return jsonify({"message": "Invalid OTP", "status": "error"}), 400
    except mysql.connector.Error as err:
        print(f"Database error: {err}")
        return jsonify({"error": "Database error"}), 500
    finally:
        connection.commit()
        cursor.close()
        connection.close()



@app.route('/api/protected', methods=['GET'])
def protected():
    # Get token from cookies
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "Unauthorized NO Token"}), 401
    
    try:
        # Decode JWT token
        # print("decrypte started")
        # decrypted_token = cipher.decrypt(token.encode('utf-8')).decode('utf-8')
        
        # print("decrypted")
        # # Decode the JWT token
        # decoded = jwt.decode(decrypted_token, JWT_SECRET, algorithms="HS256")
        # print("Decoded",decoded)
        connection = get_db_connection()
        cursor = connection.cursor()
        
        # Query the database for the username and password
        cursor.execute("SELECT * FROM otp WHERE token = %s", (token,))
        user = cursor.fetchone()
        if user:
            # cursor.execute("SELECT * FROM credentials WHERE email = %s", (user[1],))
            # user1 = cursor.fetchone()
            cursor.execute("SELECT * FROM userdetails WHERE email = %s", (user[1],))
            user_details = cursor.fetchone()
            name = user_details[2]
            # Proceed with your logic if the token is valid
            if user_details[3] == "hradmin" and user_details[5]==1:
                query = """
                SELECT email, status, phone, name, designation
                FROM userdetails 
            """
                cursor.execute(query)
                data = cursor.fetchall()
                return jsonify({"message": "Token is valid","authority":"hradmin", "content":data, "name":name , "email":user[1]}), 200
            elif user_details[3] == "manager" and user_details[5]==1:
                query = """
                    SELECT email, status, phone, name, designation
                    FROM userdetails
                    WHERE designation != 'hradmin' OR (designation = 'hradmin' AND status = 1)
                """
                cursor.execute(query)
                data = cursor.fetchall()
                return jsonify({"message": "Token is valid","authority":"manager", "content":data, "name":name , "email":user[1]}), 200
            elif user_details[3] == "instructor" and user_details[5]==1:
                query = """
                    SELECT email, status, phone, name, designation
                    FROM userdetails
                    WHERE designation = 'participant'
                """
                cursor.execute(query)
                data = cursor.fetchall()
                return jsonify({"message": "Token is valid","authority":"instructor", "content":data, "name":name}), 200
            elif user_details[3] == "participant" and user_details[5]==1:
                return jsonify({"message": "Token is valid","authority":"participant", "content":"Courses are yet to be added. Please check back later", "name":name}), 200
            else:
                return jsonify({"message": "Token not exists or account under validation","underReview":"account under validation"}), 401
        else:
            return jsonify({"message": "User not found"}), 404
    except mysql.connector.Error as err:
        print(f"Database error: {err}")
        return jsonify({"error": "Database error"}), 500
    finally:
        connection.commit()
    # except jwt.ExpiredSignatureError:
    #     return jsonify({"message": "Token has expired"}), 401
    # except jwt.InvalidTokenError:
    #     return jsonify({"message": "Invalid token"}), 401

@app.route('/verify-mail', methods=["POST"])
def verifymail():
    data = request.json
    email = data.get("email")
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        
        # Query the database for the username and password
        cursor.execute("SELECT * FROM userdetails WHERE email = %s", (email,))
        user = cursor.fetchone()

        if user:
            otp = generate_otp()
            send_otp_email(email, otp)
            # Insert or update user details
            cursor.execute("""
                INSERT INTO otp (email, otp)
                VALUES (%s, %s)
                ON DUPLICATE KEY UPDATE
                otp = VALUES(otp)
        """, (email, otp))
            connection.commit()
            return jsonify({"message": "Email found and OTP sent!", "status": "success"}), 200
        else:
            return jsonify({"message": "Email not exixts", "status": "error"}), 400

    except mysql.connector.Error as err:
        return jsonify({"message": f"Error connecting to database: {err}", "status": "error"}), 500
    finally:
        cursor.close()
        connection.close()
@app.route('/api/update-password', methods=["POST"])
def update_password():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        
        # Query the database for the username and password
        cursor.execute("SELECT * FROM userdetails WHERE email = %s", (email,))
        user = cursor.fetchone()

        if user:
            cursor.execute(
        "UPDATE userdetails SET password = %s WHERE email = %s",
            (password, email)
        )
        connection.commit()  # Save changes to the database
        return jsonify({"message": "Password updated!", "status": "success"}), 200
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error connecting to database: {err}", "status": "error"}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/registration-otp-request', methods=['POST'])
def registration_otp_request():
    data = request.json
    email = data.get("email")
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        otp = generate_otp()
        send_otp_email(email, otp)
        # Insert or update user details
        cursor.execute("""
                INSERT INTO otp (email, otp)
                VALUES (%s, %s)
                ON DUPLICATE KEY UPDATE
                otp = VALUES(otp)
        """, (email, otp))
        connection.commit()
        return jsonify({"message": "OTP Sent", "status": "success"}), 200
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error connecting to database: {err}", "status": "error"}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/verify-registration', methods=["POST"])
def verify_registration():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    designation = data.get("designation")
    otp = data.get("otp")
    password = data.get("password")
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM otp WHERE email = %s", (email,))
        user = cursor.fetchone()
        if int(otp) == user[0]:
            encrypted_token = generate_jwt(email)

            # Insert or update in the `otp` table
            cursor.execute("""
                INSERT INTO otp (email, token)
                VALUES (%s, %s)
                ON DUPLICATE KEY UPDATE
                token = VALUES(token)
            """, (email, encrypted_token.decode("utf-8")))
            connection.commit()

            # Insert or update in the `userdetails` table
            cursor.execute("""
                INSERT INTO userdetails (email, phone, name, designation, password)
                VALUES (%s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    phone = VALUES(phone),
                    name = VALUES(name),
                    designation = VALUES(designation)
            """, (email, phone, name, designation, password))
            connection.commit()
            # Create the response
            response = make_response(jsonify({
                "message": "Registration Successful",
                "status": "success",
                "token": encrypted_token.decode('utf-8')
            }))
            return response, 200

        else:
            return jsonify({"message": "Invalid OTP"}), 401
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error connecting to database: {err}", "status": "error"}), 500
    finally:
        cursor.close()
        connection.close()



@app.route('/api/approve-user', methods=['POST'])
def approve_user():
    try:
        data = request.get_json()  # Parse JSON request body
        user_id = data.get('userId')
        token = data.get('token')
        updated_user = update_user(token)
        # Update user status in the database
        connection = get_db_connection()
        cursor = connection.cursor()
        query = "UPDATE userdetails SET status = 1 WHERE email = %s"
        cursor.execute(query, (user_id,))
        connection.commit()

        return jsonify({'message': f'User {user_id} approved successfully.', "content":updated_user}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()

# Reject User Endpoint
@app.route('/api/reject-user', methods=['DELETE'])
def reject_user():
    try:
        data = request.get_json()  # Parse JSON request body
        user_id = data.get('userId')
        token = data.get('token')
        updated_user = update_user(token)
        # Delete user from the database
        connection = get_db_connection()
        cursor = connection.cursor()
        query = "DELETE FROM userdetails WHERE email = %s"
        cursor.execute(query, (user_id,))
        connection.commit()

        return jsonify({'message': f'User {user_id} rejected successfully.', "content":updated_user}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()


def update_user(token):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM otp WHERE token = %s", (token,))
    user = cursor.fetchone()
    if user:
        # cursor.execute("SELECT * FROM credentials WHERE email = %s", (user[1],))
        # user1 = cursor.fetchone()
        cursor.execute("SELECT * FROM userdetails WHERE email = %s", (user[1],))
        user_details = cursor.fetchone()
        # Proceed with your logic if the token is valid
        if user_details[3] == "hradmin" and user_details[5]==1:
            query = """
            SELECT email, status, phone, name, designation
            FROM userdetails 
        """
            cursor.execute(query)
            data = cursor.fetchall()
            return data
        elif user_details[3] == "manager" and user_details[5]==1:
            query = """
                SELECT email, status, phone, name, designation
                FROM userdetails
                WHERE designation != 'hradmin' OR (designation = 'hradmin' AND status = 1)
            """
            cursor.execute(query)
            data = cursor.fetchall()
            return data


@app.route('/api/create-course', methods=['POST'])
def create_course():
    data = request.get_json()
    print(data)
    # Extract course data
    courseId = data.get('courseId')
    courseTitle = data.get('courseTitle')
    description = data.get('description')
    duration = data.get('duration')
    startDate = data.get('startDate')
    endDate = data.get('endDate')
    instructor = data.get('instructor')
    connection = get_db_connection()
    cursor = connection.cursor()

    # Insert course into the database
    cursor.execute("""
        INSERT INTO coursedetails (courseid, title, description, instructor, start_date, end_date )
        VALUES (%s, %s, %s, %s, %s, %s)
    """, ( data['courseId'], 
    data['courseTitle'], 
    data['description'], 
    data['instructor'],
    data['startDate'], 
    data['endDate']
     ))
    connection.commit()
    cursor.execute("SELECT email FROM otp")
    emails = cursor.fetchall()
    email_list = [email[0] for email in emails]
    send_course_notification_email(email_list, data['courseTitle'], data['startDate'], duration)

    return jsonify({'message': 'Course created and emails sent successfully'}), 200


@app.route('/api/fetch-courses', methods=["GET"])
def fetch_courses():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM coursedetails")
    courses = cursor.fetchall()
    # courses_list = [course[0] for course in courses]
    # print(courses)
    return jsonify({"message":"course fetch successful", "content":courses})




# def send_bulk_emails():
# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
