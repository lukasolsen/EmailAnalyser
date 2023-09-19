from pydantic import BaseModel
from passlib.context import CryptContext
from sqlite3 import IntegrityError
from fastapi import HTTPException, status, Depends

class UserRegistration(BaseModel):
    username: str
    password: str
    email: str

# Define a Pydantic model for user login
class UserLogin(BaseModel):
    username: str
    password: str

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Function to hash a password
def hash_password(password: str):
    return password_context.hash(password)

# Function to verify a password
def verify_password(plain_password: str, hashed_password: str):
    return password_context.verify(plain_password, hashed_password)

async def register_user(user: UserRegistration, conn):
    try:
        cursor = conn.cursor()
        hashed_password = hash_password(user.password)
        cursor.execute("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", (user.username, hashed_password, user.email))
        conn.commit()
        return "User registered successfully"
    except IntegrityError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username or email already exists")
    
async def login_user(user: UserLogin, conn):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username=?", (user.username,))
    row = cursor.fetchone()
    if row and verify_password(user.password, row[2]):
        return "Login successful"
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Login failed")

async def get_current_user(user: UserLogin = Depends(), conn=Depends):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username=?", (user.username,))
    row = cursor.fetchone()
    if row:
        return UserLogin(username=row[1], password=row[2])
    return None
