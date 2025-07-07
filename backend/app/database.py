from sqlalchemy import create_engine, Column, Integer, String, DateTime, Float, Text, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.sql import func
from app.config import settings

# Database setup
engine = create_engine(settings.database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Models
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Taste preferences
    dietary_restrictions = Column(Text)  # JSON string of restrictions
    favorite_cuisines = Column(Text)     # JSON string of cuisines
    spice_level = Column(Integer, default=3)  # 1-5 scale
    
    # Relationships
    reviews = relationship("Review", back_populates="user")
    bookmarks = relationship("Bookmark", back_populates="user")

class Restaurant(Base):
    __tablename__ = "restaurants"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    description = Column(Text)
    address = Column(String, nullable=False)
    latitude = Column(Float, nullable=False, index=True)
    longitude = Column(Float, nullable=False, index=True)
    phone = Column(String)
    website = Column(String)
    
    # Business info
    cuisine_type = Column(String, index=True)
    price_range = Column(Integer)  # 1-4 scale ($-$$$$)
    is_claimed = Column(Boolean, default=False)
    
    # Computed fields
    avg_rating = Column(Float, default=0.0)
    review_count = Column(Integer, default=0)
    hidden_gem_score = Column(Float, default=0.0)  # Algorithm-based score
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    reviews = relationship("Review", back_populates="restaurant")
    menu_items = relationship("MenuItem", back_populates="restaurant")
    bookmarks = relationship("Bookmark", back_populates="restaurant")

class MenuItem(Base):
    __tablename__ = "menu_items"
    
    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"), nullable=False)
    name = Column(String, nullable=False, index=True)
    description = Column(Text)
    price = Column(Float)
    category = Column(String)  # appetizer, main, dessert, etc.
    dietary_tags = Column(Text)  # JSON string of tags (vegan, gluten-free, etc.)
    is_signature = Column(Boolean, default=False)
    
    # Relationships
    restaurant = relationship("Restaurant", back_populates="menu_items")

class Review(Base):
    __tablename__ = "reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"), nullable=False)
    
    # Rating categories (1-5 scale)
    food_rating = Column(Integer, nullable=False)
    atmosphere_rating = Column(Integer, nullable=False)
    service_rating = Column(Integer, nullable=False)
    value_rating = Column(Integer, nullable=False)
    overall_rating = Column(Float, nullable=False)  # Computed average
    
    # Review content
    title = Column(String)
    content = Column(Text, nullable=False)
    why_underrated = Column(Text)  # Special field for hidden gems
    photos = Column(Text)  # JSON string of photo URLs
    
    # Verification
    is_verified = Column(Boolean, default=False)
    visit_date = Column(DateTime)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="reviews")
    restaurant = relationship("Restaurant", back_populates="reviews")

class Bookmark(Base):
    __tablename__ = "bookmarks"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="bookmarks")
    restaurant = relationship("Restaurant", back_populates="bookmarks")

# Create tables
def create_tables():
    Base.metadata.create_all(bind=engine)
