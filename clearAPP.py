"""
Database Cleanup Utility
This script clears all data from the Study Planner database tables
WARNING: This will permanently delete all data - use with caution!
"""

import mysql.connector

# Establish database connection
mydb = mysql.connector.connect(
    host="localhost",
    user="username",  # Database username should be configured
    password="password",  # Database password should be configured
    database="studyplanner"
)

# Create cursor for executing commands
mycursor = mydb.cursor()

# Clear all tables in the database
# Order matters due to foreign key constraints
mycursor.execute("DELETE FROM events WHERE 1")    # Clear events table
mycursor.execute("DELETE FROM notes WHERE 1")     # Clear notes table
mycursor.execute("DELETE FROM subjects WHERE 1")  # Clear subjects table
mycursor.execute("DELETE FROM topics WHERE 1")    # Clear topics table
mycursor.execute("DELETE FROM users WHERE 1")     # Clear users table
mycursor.execute("DELETE FROM visit WHERE 1")     # Clear visit records

# Commit the changes
mydb.commit()
