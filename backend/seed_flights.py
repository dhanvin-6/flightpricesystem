import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

async def seed():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client.flight_db
    
    # Clean old ones to ensure fresh data for "New Delhi"/"Mumbai" matching
    await db.flights.delete_many({})

    print("Seeding fresh mock data for performance and reliability...")
    
    mock_flights = [
        {"from": "Delhi", "to": "Mumbai", "airline": "Indigo", "price": 4200, "departure": "10:00 AM", "arrival": "12:30 PM"},
        {"from": "Delhi", "to": "Bangalore", "airline": "Air India", "price": 5400, "departure": "02:00 PM", "arrival": "05:00 PM"},
        {"from": "Mumbai", "to": "Delhi", "airline": "Vistara", "price": 4800, "departure": "11:00 AM", "arrival": "01:30 PM"},
        {"from": "Bangalore", "to": "Delhi", "airline": "Akasa Air", "price": 6100, "departure": "04:00 PM", "arrival": "06:45 PM"},
        {"from": "Chennai", "to": "Delhi", "airline": "Indigo", "price": 3900, "departure": "09:00 AM", "arrival": "11:45 AM"},
        {"from": "Delhi", "to": "Chennai", "airline": "Vistara", "price": 4500, "departure": "07:00 PM", "arrival": "09:45 PM"},
        {"from": "Mumbai", "to": "Bangalore", "airline": "Air India", "price": 3200, "departure": "06:00 AM", "arrival": "07:45 AM"},
        {"from": "Delhi", "to": "Mumbai", "airline": "SpiceJet", "price": 3800, "departure": "08:00 PM", "arrival": "10:15 PM"},
        
        # New International Flights for Activities Page Integration
        {"from": "Chennai", "to": "Pakistan", "airline": "Air India", "price": 12500, "departure": "10:00 AM", "arrival": "01:30 PM"},
        {"from": "Delhi", "to": "Pakistan", "airline": "Emirates", "price": 14200, "departure": "04:00 PM", "arrival": "06:45 PM"},
        
        {"from": "Bangalore", "to": "Sri Lanka", "airline": "Srilankan Airlines", "price": 8500, "departure": "09:30 AM", "arrival": "11:00 AM"},
        {"from": "Chennai", "to": "Sri Lanka", "airline": "Indigo", "price": 6200, "departure": "02:15 PM", "arrival": "03:45 PM"},
        
        {"from": "Delhi", "to": "Japan", "airline": "ANA", "price": 45000, "departure": "08:00 PM", "arrival": "07:30 AM"},
        {"from": "Mumbai", "to": "Japan", "airline": "Japan Airlines", "price": 48500, "departure": "11:30 PM", "arrival": "11:00 AM"},
        
        {"from": "Delhi", "to": "Indonesia", "airline": "Singapore Airlines", "price": 28000, "departure": "01:00 AM", "arrival": "09:45 AM"},
        {"from": "Bangalore", "to": "Indonesia", "airline": "AirAsia", "price": 22000, "departure": "10:45 AM", "arrival": "06:30 PM"},
    ]
    
    result = await db.flights.insert_many(mock_flights)
    print(f"Successfully seeded {len(result.inserted_ids)} flights!")

if __name__ == "__main__":
    asyncio.run(seed())
