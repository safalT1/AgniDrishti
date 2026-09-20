from passlib.context import CryptContext
from database.mongo import db
from pydantic import BaseModel, EmailStr

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def ensure_admin_exists():
    admin_email = "admin@gmail.com"
    try:
        existing = await db["users"].find_one({"email": admin_email})

        if not existing:
            hashed = pwd_context.hash("example")  
            await db["users"].insert_one({
                "email": admin_email,
                "password": hashed,
                "role": "admin",
                "is_approved": True,
                "reset_token": None
            })
            print("Admin user created")
        else:
            print("Admin already exists")
    except Exception as e:
        print(f"[WARNING] Could not run admin user seeding/check: {e}")
        print("[WARNING] App will continue starting, but database queries may fail.")

class AdminLogin(BaseModel):
    email: EmailStr
    password: str
