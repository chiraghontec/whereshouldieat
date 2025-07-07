from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database
    database_url: str = "sqlite:///./foodie.db"  # Using SQLite for development
    
    # JWT
    secret_key: str = "your-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # API Keys
    google_maps_api_key: Optional[str] = None
    
    # App
    app_name: str = "FoodieFind API"
    debug: bool = True
    
    class Config:
        env_file = ".env"

settings = Settings()
