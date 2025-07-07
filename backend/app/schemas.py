from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str
    dietary_restrictions: Optional[List[str]] = []
    favorite_cuisines: Optional[List[str]] = []
    spice_level: int = 3

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    dietary_restrictions: Optional[List[str]] = None
    favorite_cuisines: Optional[List[str]] = None
    spice_level: Optional[int] = None

class User(UserBase):
    id: int
    is_active: bool
    is_verified: bool
    created_at: datetime
    dietary_restrictions: Optional[List[str]] = []
    favorite_cuisines: Optional[List[str]] = []
    spice_level: int
    
    class Config:
        from_attributes = True

# Restaurant schemas
class MenuItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    dietary_tags: Optional[List[str]] = []
    is_signature: bool = False

class MenuItemCreate(MenuItemBase):
    pass

class MenuItem(MenuItemBase):
    id: int
    restaurant_id: int
    
    class Config:
        from_attributes = True

class RestaurantBase(BaseModel):
    name: str
    description: Optional[str] = None
    address: str
    latitude: float
    longitude: float
    phone: Optional[str] = None
    website: Optional[str] = None
    cuisine_type: Optional[str] = None
    price_range: Optional[int] = Field(None, ge=1, le=4)

class RestaurantCreate(RestaurantBase):
    menu_items: Optional[List[MenuItemCreate]] = []

class RestaurantUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    phone: Optional[str] = None
    website: Optional[str] = None
    cuisine_type: Optional[str] = None
    price_range: Optional[int] = Field(None, ge=1, le=4)

class Restaurant(RestaurantBase):
    id: int
    avg_rating: float
    review_count: int
    hidden_gem_score: float
    is_claimed: bool
    created_at: datetime
    menu_items: List[MenuItem] = []
    
    class Config:
        from_attributes = True

# Review schemas
class ReviewBase(BaseModel):
    food_rating: int = Field(..., ge=1, le=5)
    atmosphere_rating: int = Field(..., ge=1, le=5)
    service_rating: int = Field(..., ge=1, le=5)
    value_rating: int = Field(..., ge=1, le=5)
    title: Optional[str] = None
    content: str
    why_underrated: Optional[str] = None
    visit_date: Optional[datetime] = None

class ReviewCreate(ReviewBase):
    restaurant_id: int
    photos: Optional[List[str]] = []

class Review(ReviewBase):
    id: int
    user_id: int
    restaurant_id: int
    overall_rating: float
    photos: List[str] = []
    is_verified: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Search schemas
class SearchFilters(BaseModel):
    cuisine_type: Optional[str] = None
    price_range: Optional[List[int]] = None
    dietary_restrictions: Optional[List[str]] = []
    radius_miles: float = 10.0
    min_rating: Optional[float] = None
    hidden_gems_only: bool = False

class LocationSearch(BaseModel):
    latitude: float
    longitude: float
    filters: Optional[SearchFilters] = SearchFilters()

class DishSearch(BaseModel):
    dish_name: str
    latitude: float
    longitude: float
    radius_miles: float = 10.0

# Response schemas
class RestaurantSearchResult(BaseModel):
    restaurant: Restaurant
    distance_miles: float
    matching_dishes: Optional[List[MenuItem]] = []

class BookmarkResponse(BaseModel):
    id: int
    restaurant: Restaurant
    created_at: datetime
    
    class Config:
        from_attributes = True

# Auth schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
