from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
import json
from database.db import UserDatabase, ReportDatabase
from model.users import UserRegistration, UserLogin, register_user, login_user, verify_token
from datetime import datetime
import service.scan as scan


class Email(BaseModel):
    email_content: str

app = FastAPI()

# Initialize the user database
userDB = UserDatabase()
userDB.init_db()
userConn = userDB.get_con()

# Initialize the report database
reportDB = ReportDatabase()
reportDB.init_db()
reportConn = reportDB.get_con()

@app.get("/")
def read_root():
    return {"Hello": "World"}

# User registration endpoint
@app.post("/register", response_model=str)
async def register(user: UserRegistration):
    return await register_user(user, userConn)


# User login endpoint
@app.post("/login", response_model=dict)
async def login(user: UserLogin):
    return await login_user(user, userConn)

# Check token endpoint


@app.get("/check_token")
async def check_token(access_token: str):
    verified = verify_token(access_token)
    if verified:
        return verified
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")


@app.post("/scan")
async def scan_email(email_content: Email, access_token: str):
    verified = verify_token(access_token)
    if verified:
        if (verified.get("role") != "admin"):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        scanModule = scan.Scanner()

        # Analyze the email
        analysis_result = scanModule.scan(str(email_content.email_content))

        # Make a report of the analysis result
        report = {
            "yara_result": analysis_result.get("analysis_result"),
            "email_data": analysis_result.get("parsed_email"),
            #"geoip": analysis_result.get("geoip"),
            "timestamp": datetime.now().strftime("%d/%m/%Y %H:%M:%S"),

            # more information for the general report, such as comments, etc.
            "comments": [],
            "tags": [],
            "status": "pending",
  
            "reporter": verified.get("sub")
        }
        print(report)

        return "ok"
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")
