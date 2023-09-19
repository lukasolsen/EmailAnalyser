from fastapi import FastAPI, HTTPException, Depends, status
import service.parse as parser
from pydantic import BaseModel
import json
from database.db import Database
from auth.users import UserRegistration, UserLogin, register_user, login_user, get_current_user

class Email(BaseModel):
  email_content: str


app = FastAPI()
database = Database()
database.init_db()
conn = database.get_con()

@app.get("/")
def read_root():
    return {"Hello": "World"}


# User registration endpoint
@app.post("/register", response_model=str)
async def register(user: UserRegistration):
    return await register_user(user, conn)


# User login endpoint
@app.post("/login", response_model=str)
async def login(user: UserLogin):
    return await login_user(user, conn)

@app.post("/scan")
async def scan_email(email_content: Email, user: UserLogin = Depends(get_current_user)):
    print("Received email_content:", email_content)
    parsed_email = parser.parse_email(str(email_content.email_content))
    return str(parsed_email)
