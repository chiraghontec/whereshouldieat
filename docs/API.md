# API Documentation

## Base URL
```
Development: http://localhost:8000
Production: https://api.foodiefind.com
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Get Access Token
```http
POST /auth/token
Content-Type: application/x-www-form-urlencoded

username=your_username&password=your_password
```

## Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/token` - Login and get access token

### Users
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update user profile

### Restaurants
- `POST /restaurants` - Create restaurant (authenticated)
- `GET /restaurants/{id}` - Get restaurant details
- `PUT /restaurants/{id}` - Update restaurant (authenticated)

### Search
- `POST /search/location` - Search restaurants by location
- `POST /search/dish` - Search by specific dish

### Reviews
- `POST /reviews` - Create review (authenticated)
- `GET /restaurants/{id}/reviews` - Get restaurant reviews

### Bookmarks
- `POST /bookmarks/{restaurant_id}` - Bookmark restaurant (authenticated)
- `DELETE /bookmarks/{restaurant_id}` - Remove bookmark (authenticated)
- `GET /bookmarks` - Get user bookmarks (authenticated)

## Data Models

### User
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "foodie_user",
  "full_name": "John Doe",
  "dietary_restrictions": ["vegetarian"],
  "favorite_cuisines": ["italian", "thai"],
  "spice_level": 3
}
```

### Restaurant
```json
{
  "id": 1,
  "name": "Amazing Restaurant",
  "description": "Great hidden gem",
  "address": "123 Main St, San Francisco, CA",
  "latitude": 37.7749,
  "longitude": -122.4194,
  "cuisine_type": "italian",
  "price_range": 2,
  "avg_rating": 4.5,
  "review_count": 23,
  "hidden_gem_score": 0.8,
  "menu_items": [...]
}
```

### Review
```json
{
  "id": 1,
  "user_id": 1,
  "restaurant_id": 1,
  "food_rating": 5,
  "atmosphere_rating": 4,
  "service_rating": 5,
  "value_rating": 4,
  "overall_rating": 4.5,
  "title": "Amazing experience!",
  "content": "The food was incredible...",
  "why_underrated": "Hidden on a side street...",
  "photos": ["url1", "url2"]
}
```

## Error Handling

All errors return a JSON response with error details:

```json
{
  "detail": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error
