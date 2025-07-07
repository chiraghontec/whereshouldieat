"""
Sample data seeder for WhereShouldIEat API
Run this script to populate the database with test data
"""

import json
from sqlalchemy.orm import Session
from app.database import SessionLocal, create_tables
from app.crud import create_user, create_restaurant, create_review
from app.schemas import UserCreate, RestaurantCreate, ReviewCreate, MenuItemCreate

def seed_database():
    """Seed the database with sample data"""
    
    # Create tables first
    create_tables()
    
    db = SessionLocal()
    
    try:
        # Create sample users
        print("🧑‍🍳 Creating sample users...")
        
        users_data = [
            {
                "email": "foodie@example.com",
                "username": "foodie_explorer",
                "password": "password123",
                "full_name": "Alex Foodie",
                "dietary_restrictions": ["vegetarian"],
                "favorite_cuisines": ["italian", "thai", "mexican"],
                "spice_level": 4
            },
            {
                "email": "gourmet@example.com", 
                "username": "gourmet_hunter",
                "password": "password123",
                "full_name": "Sam Gourmet",
                "dietary_restrictions": [],
                "favorite_cuisines": ["french", "japanese", "indian"],
                "spice_level": 5
            },
            {
                "email": "vegan@example.com",
                "username": "plant_lover",
                "password": "password123", 
                "full_name": "Riley Green",
                "dietary_restrictions": ["vegan", "gluten-free"],
                "favorite_cuisines": ["mediterranean", "middle_eastern"],
                "spice_level": 2
            }
        ]
        
        created_users = []
        for user_data in users_data:
            user = UserCreate(**user_data)
            db_user = create_user(db, user)
            created_users.append(db_user)
            print(f"✅ Created user: {db_user.username}")
        
        # Create sample restaurants
        print("\n🏪 Creating sample restaurants...")
        
        restaurants_data = [
            {
                "name": "Nonna's Hidden Kitchen",
                "description": "Family-run Italian trattoria serving authentic recipes passed down for generations. A true hidden gem in North Beach.",
                "address": "1247 Grant Ave, San Francisco, CA 94133",
                "latitude": 37.7983,
                "longitude": -122.4077,
                "phone": "(415) 555-0123",
                "cuisine_type": "italian",
                "price_range": 2,
                "menu_items": [
                    {
                        "name": "Handmade Pappardelle with Wild Boar Ragu",
                        "description": "Fresh pasta made daily with slow-braised wild boar in tomato sauce",
                        "price": 24.50,
                        "category": "main",
                        "dietary_tags": [],
                        "is_signature": True
                    },
                    {
                        "name": "Burrata with Heirloom Tomatoes",
                        "description": "Creamy burrata cheese with seasonal heirloom tomatoes and basil",
                        "price": 16.00,
                        "category": "appetizer", 
                        "dietary_tags": ["vegetarian"],
                        "is_signature": False
                    }
                ]
            },
            {
                "name": "Spice Route", 
                "description": "Authentic South Indian street food in a cozy setting. Known for incredible dosas and curry.",
                "address": "3621 18th St, San Francisco, CA 94110",
                "latitude": 37.7615,
                "longitude": -122.4252,
                "phone": "(415) 555-0456",
                "cuisine_type": "indian",
                "price_range": 1,
                "menu_items": [
                    {
                        "name": "Masala Dosa",
                        "description": "Crispy fermented crepe filled with spiced potatoes, served with chutneys",
                        "price": 12.95,
                        "category": "main",
                        "dietary_tags": ["vegan", "gluten-free"],
                        "is_signature": True
                    },
                    {
                        "name": "Sambar Vada",
                        "description": "Lentil donuts in savory lentil curry",
                        "price": 8.50,
                        "category": "appetizer",
                        "dietary_tags": ["vegan"],
                        "is_signature": False
                    }
                ]
            },
            {
                "name": "The Brass Monkey",
                "description": "Neighborhood pub with elevated comfort food and craft cocktails. Their burger is legendary among locals.",
                "address": "2440 Fillmore St, San Francisco, CA 94115", 
                "latitude": 37.7887,
                "longitude": -122.4342,
                "phone": "(415) 555-0789",
                "cuisine_type": "american",
                "price_range": 2,
                "menu_items": [
                    {
                        "name": "The Monkey Burger",
                        "description": "Grass-fed beef, aged cheddar, bacon jam, brioche bun",
                        "price": 18.00,
                        "category": "main",
                        "dietary_tags": [],
                        "is_signature": True
                    },
                    {
                        "name": "Truffle Mac & Cheese",
                        "description": "House-made pasta with three cheeses and truffle oil",
                        "price": 14.00,
                        "category": "side",
                        "dietary_tags": ["vegetarian"],
                        "is_signature": False
                    }
                ]
            },
            {
                "name": "Green Goddess",
                "description": "Plant-based fine dining with seasonal ingredients. Proves vegan food can be gourmet.",
                "address": "2865 Mission St, San Francisco, CA 94110",
                "latitude": 37.7521,
                "longitude": -122.4186,
                "cuisine_type": "vegan",
                "price_range": 3,
                "menu_items": [
                    {
                        "name": "Mushroom Wellington",
                        "description": "Puff pastry filled with mixed mushrooms, nuts, and herbs",
                        "price": 26.00,
                        "category": "main",
                        "dietary_tags": ["vegan"],
                        "is_signature": True
                    },
                    {
                        "name": "Cashew Cheesecake",
                        "description": "Rich cashew-based cheesecake with berry compote",
                        "price": 9.00,
                        "category": "dessert", 
                        "dietary_tags": ["vegan", "gluten-free"],
                        "is_signature": False
                    }
                ]
            },
            {
                "name": "Sushi Zen",
                "description": "Intimate 8-seat sushi counter run by Chef Tanaka. Omakase experience with daily fresh fish.",
                "address": "1737 Post St, San Francisco, CA 94115",
                "latitude": 37.7852,
                "longitude": -122.4331,
                "phone": "(415) 555-0321",
                "cuisine_type": "japanese",
                "price_range": 4,
                "menu_items": [
                    {
                        "name": "Omakase Tasting Menu",
                        "description": "Chef's choice of 12 seasonal pieces with miso soup",
                        "price": 95.00,
                        "category": "main",
                        "dietary_tags": [],
                        "is_signature": True
                    },
                    {
                        "name": "Chirashi Bowl",
                        "description": "Assorted sashimi over seasoned sushi rice",
                        "price": 32.00,
                        "category": "main",
                        "dietary_tags": [],
                        "is_signature": False
                    }
                ]
            }
        ]
        
        created_restaurants = []
        for restaurant_data in restaurants_data:
            restaurant = RestaurantCreate(**restaurant_data)
            db_restaurant = create_restaurant(db, restaurant)
            created_restaurants.append(db_restaurant)
            print(f"✅ Created restaurant: {db_restaurant.name}")
        
        # Create sample reviews
        print("\n⭐ Creating sample reviews...")
        
        reviews_data = [
            # Reviews for Nonna's Hidden Kitchen
            {
                "restaurant_id": created_restaurants[0].id,
                "user_id": created_users[0].id,
                "food_rating": 5,
                "atmosphere_rating": 4,
                "service_rating": 5,
                "value_rating": 4,
                "title": "Incredible authentic Italian!",
                "content": "This place is exactly what you hope to find in North Beach. The pappardelle was perfect - clearly made fresh. Nonna herself came out to check on us!",
                "why_underrated": "Hidden on a side street, most tourists miss it. But locals know this is the real deal for authentic Italian.",
                "photos": ["pasta1.jpg", "interior1.jpg"]
            },
            # Review for Spice Route  
            {
                "restaurant_id": created_restaurants[1].id,
                "user_id": created_users[1].id,
                "food_rating": 5,
                "atmosphere_rating": 3,
                "service_rating": 4,
                "value_rating": 5,
                "title": "Best dosas in the city",
                "content": "Crispy, huge dosas with perfect chutneys. The sambar was flavorful and authentic. Cash only but worth it!",
                "why_underrated": "Looks like a hole in the wall from outside, but the food quality rivals expensive Indian restaurants.",
                "photos": ["dosa1.jpg"]
            },
            # Review for Green Goddess
            {
                "restaurant_id": created_restaurants[3].id,
                "user_id": created_users[2].id,
                "food_rating": 5,
                "atmosphere_rating": 5,
                "service_rating": 5,
                "value_rating": 3,
                "title": "Vegan fine dining done right",
                "content": "The mushroom wellington was incredible - even my omnivore friends were impressed. Beautiful presentation and innovative flavors.",
                "why_underrated": "People assume vegan means boring food. This place proves that wrong with creative, delicious plant-based cuisine.",
                "photos": ["wellington1.jpg", "plating1.jpg"]
            }
        ]
        
        for review_data in reviews_data:
            user_id = review_data.pop("user_id")
            review = ReviewCreate(**review_data)
            db_review = create_review(db, review, user_id)
            restaurant_name = next(r.name for r in created_restaurants if r.id == review.restaurant_id)
            print(f"✅ Created review for {restaurant_name}")
        
        print(f"\n🎉 Database seeded successfully!")
        print(f"   • {len(created_users)} users created")
        print(f"   • {len(created_restaurants)} restaurants created")
        print(f"   • {len(reviews_data)} reviews created")
        print(f"\n🔗 API available at: http://localhost:8000")
        print(f"📖 Documentation at: http://localhost:8000/docs")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
