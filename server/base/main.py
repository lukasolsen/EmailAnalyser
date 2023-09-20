from fastapi import FastAPI, HTTPException, Depends, status
import service.parse as parser
from pydantic import BaseModel
import json
from database.db import Database
from auth.users import UserRegistration, UserLogin, register_user, login_user, verify_token, get_user_role


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
@app.post("/login", response_model=dict)
async def login(user: UserLogin):
    return await login_user(user, conn)

# Check token endpoint


@app.get("/check_token")
async def check_token(access_token: str):
    verified = verify_token(access_token)
    print("Verified:", verified)
    if verified.__len__() > 0:
        return verified
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")


@app.post("/scan")
async def scan_email(email_content: Email, access_token: str):
    verified = verify_token(access_token)
    print("Verified:", verified.get("role"))
    if verified:
        if (verified.get("role") != "admin"):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        print("Received email_content:", email_content)
        parsed_email = parser.parse_email(str(email_content.email_content))
        return str(parsed_email)
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")
