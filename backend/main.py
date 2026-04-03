from fastapi import FastAPI, HTTPException, Depends, Body
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorDatabase
from database import get_db
from models import User, Flight, UserCreate, LoginRequest
from passlib.context import CryptContext
from typing import List
from datetime import datetime

app = FastAPI(title="Flight Price System API")

# CORS setup for React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")

# Helper to hash password
def get_password_hash(password):
    return pwd_context.hash(password)

# Helper to verify password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

@app.get("/")
async def root():
    return {"message": "Flight API is running"}

@app.get("/api/flights", response_model=List[Flight])
async def get_flights(
    from_city: str = None, 
    to_city: str = None, 
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    query = {}
    if from_city:
        query["from"] = {"$regex": from_city, "$options": "i"}
    if to_city:
        query["to"] = {"$regex": to_city, "$options": "i"}
        
    flights = []
    async for flight in db.flights.find(query):
        flight["id"] = str(flight["_id"])
        flight["_id"] = str(flight["_id"])
        flights.append(flight)
    return flights

@app.post("/api/bookings")
async def create_booking(
    booking: dict = Body(...), 
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    # Expanded booking with passenger details
    result = await db.bookings.insert_one({
        "username": booking.get("username"),
        "flight_id": booking.get("flight_id"),
        "flight_details": booking.get("flight_details"),
        "passengers": booking.get("passengers", []), # List of names
        "seat_preference": booking.get("seat_preference", "Any"),
        "booking_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "status": "Confirmed"
    })
    return {"status": "success", "booking_id": str(result.inserted_id)}

@app.get("/api/predict/{flight_id}")
async def predict_price(flight_id: str):
    # Mock AI prediction logic
    # In a real app, this would use a ML model
    import random
    prediction = random.choice(["Rising", "Falling", "Stable"])
    confidence = random.randint(70, 98)
    change = random.randint(5, 20) if prediction != "Stable" else 0
    
    return {
        "flight_id": flight_id,
        "prediction": prediction,
        "confidence": f"{confidence}%",
        "expected_change": f"{change}%" if change > 0 else "No significant change",
        "recommendation": "Book Now" if prediction == "Rising" else "Wait" if prediction == "Falling" else "Good Price"
    }

@app.get("/api/bookings/{username}")
async def get_user_bookings(username: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    bookings = []
    async for booking in db.bookings.find({"username": username}):
        booking["id"] = str(booking["_id"])
        booking["_id"] = str(booking["_id"])
        bookings.append(booking)
    return bookings

@app.post("/api/login")
async def login(request: LoginRequest, db: AsyncIOMotorDatabase = Depends(get_db)):
    user = await db.users.find_one({"username": request.username})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    if not verify_password(request.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    return {"status": "success", "username": user["username"]}

@app.post("/api/register")
async def register(user: UserCreate, db: AsyncIOMotorDatabase = Depends(get_db)):
    existing_user = await db.users.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = {"username": user.username, "password": hashed_password}
    result = await db.users.insert_one(new_user)
    return {"status": "success", "id": str(result.inserted_id)}

@app.get("/api/deals", response_model=List[Flight])
async def get_deals(db: AsyncIOMotorDatabase = Depends(get_db)):
    # Simple logic: get flights with price less than 5000 as "deals"
    deals = []
    async for flight in db.flights.find({"price": {"$lt": 5000}}):
        flight["id"] = str(flight["_id"])
        flight["_id"] = str(flight["_id"])
        deals.append(flight)
    return deals

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
