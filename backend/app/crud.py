import json
import math
from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, func
from geopy.distance import geodesic
from app.database import Restaurant, MenuItem, Review, User, Bookmark
from app.schemas import (
    RestaurantCreate, RestaurantUpdate, ReviewCreate, 
    SearchFilters, LocationSearch, DishSearch, UserCreate, UserUpdate
)
from app.auth import get_password_hash

# User CRUD operations
def create_user(db: Session, user: UserCreate) -> User:
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        username=user.username,
        full_name=user.full_name,
        hashed_password=hashed_password,
        dietary_restrictions=json.dumps(user.dietary_restrictions),
        favorite_cuisines=json.dumps(user.favorite_cuisines),
        spice_level=user.spice_level
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()

def update_user(db: Session, user_id: int, user_update: UserUpdate) -> Optional[User]:
    db_user = get_user(db, user_id)
    if not db_user:
        return None
    
    update_data = user_update.dict(exclude_unset=True)
    
    # Handle JSON fields
    if 'dietary_restrictions' in update_data:
        update_data['dietary_restrictions'] = json.dumps(update_data['dietary_restrictions'])
    if 'favorite_cuisines' in update_data:
        update_data['favorite_cuisines'] = json.dumps(update_data['favorite_cuisines'])
    
    for field, value in update_data.items():
        setattr(db_user, field, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user

# Restaurant CRUD operations
def create_restaurant(db: Session, restaurant: RestaurantCreate) -> Restaurant:
    db_restaurant = Restaurant(
        name=restaurant.name,
        description=restaurant.description,
        address=restaurant.address,
        latitude=restaurant.latitude,
        longitude=restaurant.longitude,
        phone=restaurant.phone,
        website=restaurant.website,
        cuisine_type=restaurant.cuisine_type,
        price_range=restaurant.price_range
    )
    db.add(db_restaurant)
    db.commit()
    db.refresh(db_restaurant)
    
    # Add menu items if provided
    for menu_item in restaurant.menu_items:
        db_menu_item = MenuItem(
            restaurant_id=db_restaurant.id,
            name=menu_item.name,
            description=menu_item.description,
            price=menu_item.price,
            category=menu_item.category,
            dietary_tags=json.dumps(menu_item.dietary_tags),
            is_signature=menu_item.is_signature
        )
        db.add(db_menu_item)
    
    db.commit()
    return db_restaurant

def get_restaurant(db: Session, restaurant_id: int) -> Optional[Restaurant]:
    return db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()

def update_restaurant(db: Session, restaurant_id: int, restaurant_update: RestaurantUpdate) -> Optional[Restaurant]:
    db_restaurant = get_restaurant(db, restaurant_id)
    if not db_restaurant:
        return None
    
    update_data = restaurant_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_restaurant, field, value)
    
    db.commit()
    db.refresh(db_restaurant)
    return db_restaurant

# Search operations
def calculate_hidden_gem_score(review_count: int, avg_rating: float) -> float:
    """Calculate hidden gem score - high rating with low review count"""
    if review_count == 0:
        return 0.0
    
    # Score decreases as review count increases, but rewards high ratings
    review_penalty = 1 / (1 + review_count / 50)  # Penalty for too many reviews
    rating_bonus = (avg_rating - 3.0) / 2.0  # Bonus for ratings above 3.0
    
    return max(0.0, min(1.0, review_penalty * (0.5 + rating_bonus)))

def search_restaurants_by_location(db: Session, search: LocationSearch) -> List[Tuple[Restaurant, float]]:
    query = db.query(Restaurant)
    
    # Apply filters
    filters = search.filters
    if filters.cuisine_type:
        query = query.filter(Restaurant.cuisine_type == filters.cuisine_type)
    
    if filters.price_range:
        query = query.filter(Restaurant.price_range.in_(filters.price_range))
    
    if filters.min_rating:
        query = query.filter(Restaurant.avg_rating >= filters.min_rating)
    
    if filters.hidden_gems_only:
        query = query.filter(Restaurant.hidden_gem_score > 0.3)
    
    restaurants = query.all()
    
    # Calculate distances and filter by radius
    results = []
    user_location = (search.latitude, search.longitude)
    
    for restaurant in restaurants:
        restaurant_location = (restaurant.latitude, restaurant.longitude)
        distance = geodesic(user_location, restaurant_location).miles
        
        if distance <= filters.radius_miles:
            results.append((restaurant, distance))
    
    # Sort by hidden gem score (for discovery) or distance
    if filters.hidden_gems_only:
        results.sort(key=lambda x: (-x[0].hidden_gem_score, x[1]))
    else:
        results.sort(key=lambda x: x[1])  # Sort by distance
    
    return results

def search_restaurants_by_dish(db: Session, search: DishSearch) -> List[Tuple[Restaurant, float, List[MenuItem]]]:
    # Find menu items matching the dish name
    menu_items = db.query(MenuItem).filter(
        MenuItem.name.ilike(f"%{search.dish_name}%")
    ).all()
    
    # Get unique restaurants and calculate distances
    restaurant_dishes = {}
    user_location = (search.latitude, search.longitude)
    
    for item in menu_items:
        restaurant = item.restaurant
        restaurant_location = (restaurant.latitude, restaurant.longitude)
        distance = geodesic(user_location, restaurant_location).miles
        
        if distance <= search.radius_miles:
            if restaurant.id not in restaurant_dishes:
                restaurant_dishes[restaurant.id] = (restaurant, distance, [])
            restaurant_dishes[restaurant.id][2].append(item)
    
    # Convert to list and sort by distance
    results = list(restaurant_dishes.values())
    results.sort(key=lambda x: x[1])
    
    return results

# Review operations
def create_review(db: Session, review: ReviewCreate, user_id: int) -> Review:
    # Calculate overall rating
    overall_rating = (
        review.food_rating + review.atmosphere_rating + 
        review.service_rating + review.value_rating
    ) / 4.0
    
    db_review = Review(
        user_id=user_id,
        restaurant_id=review.restaurant_id,
        food_rating=review.food_rating,
        atmosphere_rating=review.atmosphere_rating,
        service_rating=review.service_rating,
        value_rating=review.value_rating,
        overall_rating=overall_rating,
        title=review.title,
        content=review.content,
        why_underrated=review.why_underrated,
        photos=json.dumps(review.photos),
        visit_date=review.visit_date
    )
    db.add(db_review)
    db.commit()
    
    # Update restaurant stats
    update_restaurant_stats(db, review.restaurant_id)
    
    db.refresh(db_review)
    return db_review

def update_restaurant_stats(db: Session, restaurant_id: int):
    """Update restaurant's average rating, review count, and hidden gem score"""
    restaurant = get_restaurant(db, restaurant_id)
    if not restaurant:
        return
    
    # Calculate new stats
    reviews = db.query(Review).filter(Review.restaurant_id == restaurant_id).all()
    
    if reviews:
        avg_rating = sum(r.overall_rating for r in reviews) / len(reviews)
        review_count = len(reviews)
        hidden_gem_score = calculate_hidden_gem_score(review_count, avg_rating)
    else:
        avg_rating = 0.0
        review_count = 0
        hidden_gem_score = 0.0
    
    # Update restaurant
    restaurant.avg_rating = avg_rating
    restaurant.review_count = review_count
    restaurant.hidden_gem_score = hidden_gem_score
    
    db.commit()

# Bookmark operations
def create_bookmark(db: Session, user_id: int, restaurant_id: int) -> Optional[Bookmark]:
    # Check if bookmark already exists
    existing = db.query(Bookmark).filter(
        and_(Bookmark.user_id == user_id, Bookmark.restaurant_id == restaurant_id)
    ).first()
    
    if existing:
        return existing
    
    bookmark = Bookmark(user_id=user_id, restaurant_id=restaurant_id)
    db.add(bookmark)
    db.commit()
    db.refresh(bookmark)
    return bookmark

def delete_bookmark(db: Session, user_id: int, restaurant_id: int) -> bool:
    bookmark = db.query(Bookmark).filter(
        and_(Bookmark.user_id == user_id, Bookmark.restaurant_id == restaurant_id)
    ).first()
    
    if bookmark:
        db.delete(bookmark)
        db.commit()
        return True
    return False

def get_user_bookmarks(db: Session, user_id: int) -> List[Bookmark]:
    return db.query(Bookmark).filter(Bookmark.user_id == user_id).all()
