<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# FoodieFind API Development Instructions

This is a FastAPI-based restaurant discovery SaaS backend. When working on this project:

## Architecture Guidelines
- Follow FastAPI best practices with proper dependency injection
- Use Pydantic models for request/response validation
- Implement proper error handling with HTTPException
- Use SQLAlchemy ORM for database operations
- Maintain separation of concerns: routes, business logic (crud), and data models

## Code Style
- Use type hints throughout the codebase
- Follow PEP 8 naming conventions
- Write descriptive docstrings for functions and classes
- Use dependency injection for database sessions and authentication

## Database Guidelines
- Use Alembic for database migrations in production
- Always use transactions for multi-step operations
- Index frequently queried fields (location, ratings, etc.)
- Handle JSON fields properly for arrays (dietary_restrictions, photos, etc.)

## Security Best Practices
- Validate all user inputs with Pydantic
- Use proper authentication for protected endpoints
- Hash passwords with bcrypt
- Implement rate limiting for search endpoints in production

## Testing
- Write unit tests for all CRUD operations
- Test authentication flows
- Mock external API calls (Google Maps)
- Test edge cases for search algorithms

## Performance Considerations
- Use database indexes for location-based queries
- Implement pagination for list endpoints
- Cache frequently accessed restaurant data
- Optimize the hidden gem scoring algorithm

## API Design
- Use consistent HTTP status codes
- Return meaningful error messages
- Follow RESTful conventions
- Include proper response models

## Key Features to Remember
- Hidden gem algorithm prioritizes high-quality, low-review-count restaurants
- Multi-category review system (food, atmosphere, service, value)
- Location-based search with configurable radius
- Dish-specific search across restaurant menus
- User preference-based filtering (dietary restrictions, cuisine types)
