from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import timedelta
import json

from app.database import get_db, create_tables
from app.config import settings
from app import crud, schemas, auth
from app.database import User

# Create FastAPI app
app = FastAPI(title=settings.app_name, debug=settings.debug)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

# Create tables on startup
@app.on_event("startup")
def startup_event():
    create_tables()

# Dependency to get current user
async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    username = auth.verify_token(token)
    if username is None:
        raise credentials_exception
    
    user = auth.get_user_by_username(db, username)
    if user is None:
        raise credentials_exception
    
    return user

# Helper function to convert JSON strings back to lists
def parse_json_field(field_value: str) -> List[str]:
    try:
        return json.loads(field_value) if field_value else []
    except:
        return []

# Auth endpoints
@app.post("/auth/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    if auth.get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    if auth.get_user_by_username(db, user.username):
        raise HTTPException(status_code=400, detail="Username already taken")
    
    db_user = crud.create_user(db, user)
    
    # Convert JSON strings back to lists for response
    db_user.dietary_restrictions = parse_json_field(db_user.dietary_restrictions)
    db_user.favorite_cuisines = parse_json_field(db_user.favorite_cuisines)
    
    return db_user

@app.post("/auth/token", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# User endpoints
@app.get("/users/me", response_model=schemas.User)
def read_users_me(current_user: User = Depends(get_current_user)):
    # Convert JSON strings back to lists
    current_user.dietary_restrictions = parse_json_field(current_user.dietary_restrictions)
    current_user.favorite_cuisines = parse_json_field(current_user.favorite_cuisines)
    return current_user

@app.put("/users/me", response_model=schemas.User)
def update_user_profile(
    user_update: schemas.UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    updated_user = crud.update_user(db, current_user.id, user_update)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Convert JSON strings back to lists
    updated_user.dietary_restrictions = parse_json_field(updated_user.dietary_restrictions)
    updated_user.favorite_cuisines = parse_json_field(updated_user.favorite_cuisines)
    
    return updated_user

# Restaurant endpoints
@app.post("/restaurants", response_model=schemas.Restaurant)
def create_restaurant(
    restaurant: schemas.RestaurantCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_restaurant = crud.create_restaurant(db, restaurant)
    
    # Parse JSON fields for menu items
    parse_menu_items(db_restaurant.menu_items)
    
    return db_restaurant

@app.get("/restaurants/{restaurant_id}", response_model=schemas.Restaurant)
def get_restaurant(restaurant_id: int, db: Session = Depends(get_db)):
    restaurant = crud.get_restaurant(db, restaurant_id)
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    # Parse JSON fields for menu items
    parse_menu_items(restaurant.menu_items)
    
    return restaurant

@app.put("/restaurants/{restaurant_id}", response_model=schemas.Restaurant)
def update_restaurant(
    restaurant_id: int,
    restaurant_update: schemas.RestaurantUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # TODO: Add ownership verification for restaurant owners
    updated_restaurant = crud.update_restaurant(db, restaurant_id, restaurant_update)
    if not updated_restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    # Parse JSON fields for menu items
    parse_menu_items(updated_restaurant.menu_items)
    
    return updated_restaurant

# Helper function to convert JSON strings back to lists for menu items
def parse_menu_items(menu_items):
    for item in menu_items:
        if hasattr(item, 'dietary_tags') and isinstance(item.dietary_tags, str):
            item.dietary_tags = parse_json_field(item.dietary_tags)
    return menu_items

# Search endpoints
@app.post("/search/location", response_model=List[schemas.RestaurantSearchResult])
def search_by_location(search: schemas.LocationSearch, db: Session = Depends(get_db)):
    results = crud.search_restaurants_by_location(db, search)
    
    search_results = []
    for restaurant, distance in results:
        # Parse JSON fields for menu items
        parse_menu_items(restaurant.menu_items)
        
        search_results.append(schemas.RestaurantSearchResult(
            restaurant=restaurant,
            distance_miles=round(distance, 2)
        ))
    
    return search_results

@app.post("/search/dish", response_model=List[schemas.RestaurantSearchResult])
def search_by_dish(search: schemas.DishSearch, db: Session = Depends(get_db)):
    results = crud.search_restaurants_by_dish(db, search)
    
    search_results = []
    for restaurant, distance, dishes in results:
        # Parse JSON fields for menu items
        parse_menu_items(restaurant.menu_items)
        parse_menu_items(dishes)
        
        search_results.append(schemas.RestaurantSearchResult(
            restaurant=restaurant,
            distance_miles=round(distance, 2),
            matching_dishes=dishes
        ))
    
    return search_results

# Review endpoints
@app.post("/reviews", response_model=schemas.Review)
def create_review(
    review: schemas.ReviewCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Verify restaurant exists
    restaurant = crud.get_restaurant(db, review.restaurant_id)
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    db_review = crud.create_review(db, review, current_user.id)
    
    # Convert photos JSON string back to list
    db_review.photos = parse_json_field(db_review.photos)
    
    return db_review

@app.get("/restaurants/{restaurant_id}/reviews", response_model=List[schemas.Review])
def get_restaurant_reviews(restaurant_id: int, db: Session = Depends(get_db)):
    restaurant = crud.get_restaurant(db, restaurant_id)
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    reviews = restaurant.reviews
    
    # Convert photos JSON strings back to lists
    for review in reviews:
        review.photos = parse_json_field(review.photos)
    
    return reviews

# Bookmark endpoints
@app.post("/bookmarks/{restaurant_id}", response_model=schemas.BookmarkResponse)
def create_bookmark(
    restaurant_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Verify restaurant exists
    restaurant = crud.get_restaurant(db, restaurant_id)
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    bookmark = crud.create_bookmark(db, current_user.id, restaurant_id)
    return schemas.BookmarkResponse(
        id=bookmark.id,
        restaurant=restaurant,
        created_at=bookmark.created_at
    )

@app.delete("/bookmarks/{restaurant_id}")
def delete_bookmark(
    restaurant_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    success = crud.delete_bookmark(db, current_user.id, restaurant_id)
    if not success:
        raise HTTPException(status_code=404, detail="Bookmark not found")
    return {"message": "Bookmark deleted successfully"}

@app.get("/bookmarks", response_model=List[schemas.BookmarkResponse])
def get_user_bookmarks(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    bookmarks = crud.get_user_bookmarks(db, current_user.id)
    
    result = []
    for bookmark in bookmarks:
        result.append(schemas.BookmarkResponse(
            id=bookmark.id,
            restaurant=bookmark.restaurant,
            created_at=bookmark.created_at
        ))
    
    return result

# Health check
@app.get("/health")
def health_check():
    return {"status": "healthy", "app": settings.app_name}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
