import csv
import os
import mysql.connector


mydb = mysql.connector.connect(host='your-host',
    user='your-username',
    password='your-password',
    database='your-database')
cursor = mydb.cursor()

for filename in os.listdir("/Users/tonto/Downloads/tennis_wta-master"):
    if "matches" not in filename:
        print("Hello")
        continue
    count = 1
    csv_data = csv.reader(file("/Users/tonto/Downloads/tennis_wta-master/"+filename))
    for row in csv_data:
        cursor.execute('INSERT IGNORE INTO Versus(Winner, Loser, TournamentID, \
          Round, Date, Gender )' \
          'VALUES("%s", "%s", "%s", "%s", "%s", "Female")',
          (row[7], row[17], row[0], row[29], row[5]))
        #close the connection to the database.
mydb.commit()
cursor.close()
