import sqlite3

class UserDatabase:
    def __init__(self):
        self.conn = sqlite3.connect("users.db")
        self.cursor = self.conn.cursor()

    def __enter__(self):
        return self.cursor

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.commit()
        self.conn.close()

    def init_db(self):
        self.cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            role TEXT NOT NULL
        )
    """)
        self.conn.commit()

    def get_con(self):
        return self.conn

    def get_cursor(self):
        return self.cursor

# TODO: Add a report database
class ReportDatabase:
    def __init__(self):
        self.conn = sqlite3.connect("reports.db")
        self.cursor = self.conn.cursor()

    def __enter__(self):
        return self.cursor

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.commit()
        self.conn.close()

    def init_db(self):
        self.cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            role TEXT NOT NULL
        )
    """)
        self.conn.commit()

    def get_con(self):
        return self.conn

    def get_cursor(self):
        return self.cursor
