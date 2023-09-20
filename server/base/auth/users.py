from jose import JWTError, jwt
from datetime import datetime, timedelta
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
    role: str = None
    token: str = None


# ! NOT SECURE !  Replace with a secure random key
SECRET_KEY = "placeholder-key"  # Replace with a secure random key
ALGORITHM = "HS256"


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str):
    try:
        print("Verifying token:", token)
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print("Payload:", payload)
        return payload
    except JWTError:
        return None


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
        cursor.execute("INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)",
                       (user.username, hashed_password, user.email, "user"))
        conn.commit()
        return "User registered successfully"
    except IntegrityError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Username or email already exists")


async def login_user(user: UserLogin, conn):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username=?", (user.username,))
    row = cursor.fetchone()
    if row and verify_password(user.password, row[2]):
        access_token = create_access_token(
            data={"sub": user.username, "role": row[4]})
        return {"access_token": access_token, "token_type": "bearer"}
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Login failed")


async def get_user_role(user: UserLogin, conn):
    cursor = conn.cursor()
    cursor.execute("SELECT role FROM users WHERE username=?", (user.username,))
    row = cursor.fetchone()
    if row:
        return row[0]
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Login failed")
