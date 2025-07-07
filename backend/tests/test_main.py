import pytest
import json
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.database import Base, get_db

# Test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

# Create test tables
Base.metadata.create_all(bind=engine)

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_register_user():
    user_data = {
        "email": "test2@example.com",
        "username": "testuser2",
        "password": "testpass123",
        "full_name": "Test User",
        "dietary_restrictions": ["vegetarian"],
        "favorite_cuisines": ["italian", "mexican"],
        "spice_level": 3
    }
    
    response = client.post("/auth/register", json=user_data)
    assert response.status_code == 200
    
    data = response.json()
    assert data["email"] == user_data["email"]
    assert data["username"] == user_data["username"]
    assert "id" in data

def test_login():
    # First register a user
    user_data = {
        "email": "login@example.com",
        "username": "loginuser",
        "password": "loginpass123",
        "full_name": "Login User"
    }
    client.post("/auth/register", json=user_data)
    
    # Then login
    login_data = {
        "username": "loginuser",
        "password": "loginpass123"
    }
    
    response = client.post("/auth/token", data=login_data)
    assert response.status_code == 200
    
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_create_restaurant():
    # Register and login user first
    user_data = {
        "email": "restaurant@example.com",
        "username": "restaurantuser",
        "password": "restpass123"
    }
    client.post("/auth/register", json=user_data)
    
    login_response = client.post("/auth/token", data={
        "username": "restaurantuser",
        "password": "restpass123"
    })
    token = login_response.json()["access_token"]
    
    # Create restaurant
    restaurant_data = {
        "name": "Test Restaurant",
        "description": "A great hidden gem",
        "address": "123 Main St, San Francisco, CA",
        "latitude": 37.7749,
        "longitude": -122.4194,
        "cuisine_type": "italian",
        "price_range": 2,
        "menu_items": [
            {
                "name": "Margherita Pizza",
                "description": "Classic pizza with tomato and mozzarella",
                "price": 18.50,
                "category": "main",
                "dietary_tags": ["vegetarian"],
                "is_signature": True
            }
        ]
    }
    
    headers = {"Authorization": f"Bearer {token}"}
    response = client.post("/restaurants", json=restaurant_data, headers=headers)
    
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == restaurant_data["name"]
    assert data["latitude"] == restaurant_data["latitude"]

def test_search_restaurants():
    search_data = {
        "latitude": 37.7749,
        "longitude": -122.4194,
        "filters": {
            "radius_miles": 10.0,
            "cuisine_type": "italian"
        }
    }
    
    response = client.post("/search/location", json=search_data)
    assert response.status_code == 200
    assert isinstance(response.json(), list)
