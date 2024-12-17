import mysql.connector
from config import DB_CONFIG

def get_db_connection():
    """Establish and return a MySQL database connection."""
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        print("Successfully connected to the database.")
        return connection
    except mysql.connector.Error as err:
        print(f"Database connection error: {err}")
        raise
