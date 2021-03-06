import sqlite3 as s3
import os

def initdb(name):
    s3.connect(f'{name}.db')

def runSqlQuery(query, name):
    path = os.getcwd().split('/')[-1]
    path = path + '/backend/databases'
    db = s3.connect(f'{os.getcwd()}/databases/{name}.db')
    cursor = db.cursor()
    if query == '':
        return None
    else:
        if cursor.fetchall() == '' or cursor.fetchall() == None:
            return cursor.execute(query)
        if cursor.execute(query):
            db.commit()
            return cursor.fetchall()
        else:
            return False