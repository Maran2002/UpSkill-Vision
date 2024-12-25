import json
from db_connection import get_db_connection
from datetime import datetime , timedelta
import mysql
connection = get_db_connection()
cursor = connection.cursor()


def save_session_to_db(email, token):
    """
    Save or update session data in the database.
    """
    try:
        # print("11")
        expiry = datetime.now() + timedelta(hours=1)
        # print("22")
# Ensure token is a string
        if isinstance(token, bytes):
            token = token.decode("utf-8")

        # Execute the SQL query
        cursor.execute("""
            INSERT INTO otp (email, token, expiry)
            VALUES (%s, %s, %s)
            ON DUPLICATE KEY UPDATE
            token = VALUES(token),
            expiry = VALUES(expiry)
        """, (email, token, expiry))

        # print("33")
        connection.commit()
        print("token saved")
        return True
    except mysql.connector.Error as err:
        print(f"Database error: {err}")
        return False

def delete_user_sessions(user_id):
    """
    Delete all sessions for a specific user.
    """
    cursor.execute("DELETE FROM otp WHERE email = %s", (user_id,))
    print("token deleted")
    connection.commit()
