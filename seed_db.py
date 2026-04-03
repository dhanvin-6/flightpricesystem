import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext

MONGO_URL = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URL)
db = client.flight_db
pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")

async def seed_db():
    print("Seeding database...")
    
    # Clear existing collections
    await db.users.delete_many({})
    await db.flights.delete_many({})
    
    # Seed Users
    users = [
        {"username": "admin", "password": pwd_context.hash("admin")},
        {"username": "testuser", "password": pwd_context.hash("password123")}
    ]
    await db.users.insert_many(users)
    print(f"Inserted {len(users)} users.")
    
    # Seed Flights
    flights = [
        {"airline": "Indigo", "from": "Delhi", "to": "Goa", "departure": "10:00 AM", "arrival": "12:30 PM", "price": 4200},
        {"airline": "Air India", "from": "Mumbai", "to": "Dubai", "departure": "02:00 PM", "arrival": "05:00 PM", "price": 6100},
        {"airline": "Vistara", "from": "Chennai", "to": "Singapore", "departure": "08:00 AM", "arrival": "11:30 AM", "price": 6500},
        {"airline": "Indigo", "from": "Bangalore", "to": "Bangkok", "departure": "11:00 PM", "arrival": "04:00 AM", "price": 4500},
        {"airline": "Akasa Air", "from": "Bangalore", "to": "Goa", "departure": "07:00 AM", "arrival": "08:30 AM", "price": 3200},
        {"airline": "Singapore Airlines", "from": "Mumbai", "to": "Singapore", "departure": "11:30 PM", "arrival": "05:30 AM", "price": 12500},
        {"airline": "Emirates", "from": "Dubai", "to": "London", "departure": "09:00 AM", "arrival": "01:30 PM", "price": 45000},
        {"airline": "Qatar Airways", "from": "Delhi", "to": "New York", "departure": "01:00 AM", "arrival": "07:00 AM", "price": 85000},
        {"airline": "Lufthansa", "from": "Frankfurt", "to": "Tokyo", "departure": "01:00 PM", "arrival": "08:00 AM", "price": 75000},
        {"airline": "Air France", "from": "Paris", "to": "Los Angeles", "departure": "10:00 AM", "arrival": "01:00 PM", "price": 68000},
        {"airline": "Thai Airways", "from": "Bangkok", "to": "Sydney", "departure": "11:00 PM", "arrival": "12:00 PM", "price": 52000},
        {"airline": "Swiss Air", "from": "Zurich", "to": "Mumbai", "departure": "12:30 PM", "arrival": "01:00 AM", "price": 42000},
        {"airline": "Etihad", "from": "Abu Dhabi", "to": "Toronto", "departure": "03:00 AM", "arrival": "09:00 AM", "price": 95000},
        {"airline": "British Airways", "from": "London", "to": "Cape Town", "departure": "08:00 PM", "arrival": "08:30 AM", "price": 58000},
        {"airline": "Cathay Pacific", "from": "Hong Kong", "to": "Vancouver", "departure": "04:00 PM", "arrival": "12:00 PM", "price": 72000}
    ]
    await db.flights.insert_many(flights)
    print(f"Inserted {len(flights)} flights.")
    
    print("Database seeding complete!")

if __name__ == "__main__":
    asyncio.run(seed_db())
