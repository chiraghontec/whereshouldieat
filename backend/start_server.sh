#!/bin/bash

# WhereShouldIEat API Development Server Startup Script

echo "🍽️  Starting WhereShouldIEat API Server..."
echo "======================================="

# Activate virtual environment
source .venv/bin/activate

# Set environment variables for development
export DATABASE_URL="sqlite:///./whereshouldieat.db"
export SECRET_KEY="dev-secret-key-change-in-production"
export DEBUG="True"

# Start the FastAPI server
echo "🚀 Server starting at http://localhost:8000"
echo "📖 API Documentation at http://localhost:8000/docs"
echo "📝 Alternative docs at http://localhost:8000/redoc"
echo ""
echo "Press Ctrl+C to stop the server"
echo "======================================="

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
