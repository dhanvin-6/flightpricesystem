from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: Optional[str] = Field(None, alias="_id")

class Flight(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    airline: str
    origin: str = Field(alias="from")
    destination: str = Field(alias="to")
    departure: str
    arrival: str
    price: int

class Booking(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    user_id: str
    flight_id: str
    booking_date: datetime = Field(default_factory=datetime.now)

class LoginRequest(BaseModel):
    username: str
    password: str
