# FoodieFind API Backend

A FastAPI-based backend for discovering hidden gem restaurants and cafes. This is the complete MVP implementation for a restaurant discovery SaaS platform.

## ✅ Implemented Features

### 🔐 **User Authentication & Profiles**
- JWT-based authentication with secure password hashing
- User registration and login
- Customizable taste preferences (dietary restrictions, favorite cuisines, spice level)
- User profile management

### 🏪 **Restaurant Management**
- Complete CRUD operations for restaurants
- Location-based storage (latitude/longitude)
- Business information (contact, website, cuisine type, price range)
- Menu item management with dietary tags
- Signature dish highlighting

### 🔍 **Smart Search System**
- **Location-based search** with configurable radius (1-30 miles)
- **Dish-specific search** - find restaurants by menu item names
- **Advanced filtering**: cuisine type, price range, dietary restrictions
- **Hidden gem algorithm** - prioritizes high-quality, low-review-count places

### ⭐ **Review System**
- Multi-category ratings (food, atmosphere, service, value)
- Photo uploads support
- "Why it's underrated" field for hidden gems
- Review verification system
- Automatic restaurant statistics updates

### 📌 **Bookmarking**
- Save/unsave favorite restaurants
- Personal bookmark collections
- Quick access to saved places

### 🎯 **Hidden Gem Discovery**
- Proprietary scoring algorithm that identifies underrated restaurants
- Combines high ratings with low review counts
- Surfaces authentic local favorites over tourist traps

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- pip or poetry for package management

### Development Setup

1. **Install dependencies:**
```bash
pip install -r requirements.txt
```

2. **Start the development server:**
```bash
./start_server.sh
# OR manually:
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

3. **Seed sample data:**
```bash
python seed_data.py
```

4. **Access the API:**
- **API Server**: `http://localhost:8000`
- **Interactive Docs**: `http://localhost:8000/docs`
- **Alternative Docs**: `http://localhost:8000/redoc`

### Production Deployment

Using Docker Compose:
```bash
docker-compose up -d
```

## 📊 Sample Data

The seed script creates:
- 3 sample users with different preferences
- 5 diverse restaurants (Italian, Indian, American, Vegan, Japanese)
- Authentic reviews with photos and hidden gem insights
- Complete menu items with dietary tags

## 🧪 Testing

Run the test suite:
```bash
pytest tests/ -v
```

Current test coverage:
- ✅ User registration and authentication
- ✅ Restaurant creation and management  
- ✅ Location-based search functionality
- ✅ API health checks

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/token` - Login and get access token

### Users
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update user profile

### Restaurants
- `POST /restaurants` - Create restaurant
- `GET /restaurants/{id}` - Get restaurant details
- `PUT /restaurants/{id}` - Update restaurant

### Search
- `POST /search/location` - Search restaurants by location
- `POST /search/dish` - Search by specific dish

### Reviews
- `POST /reviews` - Create review
- `GET /restaurants/{id}/reviews` - Get restaurant reviews

### Bookmarks
- `POST /bookmarks/{restaurant_id}` - Bookmark restaurant
- `DELETE /bookmarks/{restaurant_id}` - Remove bookmark
- `GET /bookmarks` - Get user bookmarks

## Database Models

### User
- Profile with dietary preferences and taste settings
- Authentication and verification status

### Restaurant
- Location, contact info, and business details
- Computed metrics (rating, review count, hidden gem score)

### MenuItem
- Dish details with dietary tags and pricing
- Signature dish highlighting

### Review
- Multi-category ratings (food, atmosphere, service, value)
- Content with photos and "why underrated" notes

### Bookmark
- User's saved restaurants

## Hidden Gem Algorithm

The system calculates a "hidden gem score" based on:
- High ratings (4.0+ stars)
- Low review count (<100 reviews)
- Quality-to-discovery ratio

This helps surface amazing places that haven't been "discovered" yet.

## Testing

Run the test suite:
```bash
pytest
```

## Deployment

For production deployment:

1. Set up a PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Deploy with a production WSGI server like Gunicorn

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: JWT signing key
- `GOOGLE_MAPS_API_KEY`: For location services
- `DEBUG`: Enable debug mode

## Tech Stack

- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: Database ORM
- **PostgreSQL**: Primary database
- **JWT**: Authentication tokens
- **Geopy**: Location calculations
- **Pydantic**: Data validation
