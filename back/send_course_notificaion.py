import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import EMAIL_CONFIG  # Import credentials for email
def send_course_notification_email(recipient_emails, course_name, start_date, duration):
    try:
        sender_email = EMAIL_CONFIG["email"]
        sender_password = EMAIL_CONFIG["password"]

        # Load the HTML template
        with open("course_notification_template.html", "r") as file:
            email_body = file.read()

        # Replace placeholders with actual values
        email_body = email_body.replace("{course_name}", course_name)
        email_body = email_body.replace("{start_date}", start_date)
        email_body = email_body.replace("{duration}", duration +" days")

        # Set up the email
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = ", ".join(recipient_emails)  # Join the list of emails into a comma-separated string
        message["Subject"] = f"New Course Available: {course_name}"
        message.attach(MIMEText(email_body, "html"))

        # Set up the SMTP server (Gmail SMTP server)
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()  # Establish a secure TLS connection
        server.login(sender_email, sender_password)

        # Send the email
        server.send_message(message)
        server.quit()

        print(f"Course notification sent to {', '.join(recipient_emails)}")
        return True
    except smtplib.SMTPException as e:
        print(f"SMTP error: {e}")
    except Exception as e:
        print(f"Error sending email: {e}")
    return False
