import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="username",
  password="password",
  database="studyplanner"
)
mycursor = mydb.cursor()
mycursor.execute("DELETE FROM events WHERE 1")
mycursor.execute("DELETE FROM notes WHERE 1")
mycursor.execute("DELETE FROM subjects WHERE 1")
mycursor.execute("DELETE FROM topics WHERE 1")
mycursor.execute("DELETE FROM users WHERE 1")
mycursor.execute("DELETE FROM visit WHERE 1")
mydb.commit()
