#!/bin/bash

# FoodieFind Development Setup Script
# Run this script to set up the entire development environment

set -e

echo "🍽️  Setting up FoodieFind Development Environment"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "README.md" ] || [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    print_error "Please run this script from the FoodieFind root directory"
    exit 1
fi

print_status "Setting up FoodieFind development environment..."

# Backend setup
echo ""
echo "🐍 Setting up Backend (FastAPI)..."
cd backend

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    print_status "Creating Python virtual environment..."
    python3 -m venv .venv
fi

# Activate virtual environment
print_status "Activating virtual environment..."
source .venv/bin/activate

# Install dependencies
print_status "Installing Python dependencies..."
pip install -r requirements.txt

# Set up environment variables
if [ ! -f ".env" ]; then
    print_status "Creating backend .env file..."
    cp .env.example .env
    print_warning "Please edit backend/.env with your database credentials"
fi

# Seed database
print_status "Seeding database with sample data..."
python seed_data.py

cd ..

# Web frontend setup
echo ""
echo "🌐 Setting up Web Frontend (Next.js)..."
cd frontend/web

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Install dependencies
print_status "Installing web dependencies..."
npm install

# Set up environment variables
if [ ! -f ".env.local" ]; then
    print_status "Creating web .env.local file..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
    echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key-here" >> .env.local
    print_warning "Please edit frontend/web/.env.local with your API keys"
fi

cd ../..

# Mobile frontend setup
echo ""
echo "📱 Setting up Mobile Frontend (React Native)..."
cd frontend/mobile

# Install dependencies
print_status "Installing mobile dependencies..."
npm install

# Set up environment variables
if [ ! -f ".env" ]; then
    print_status "Creating mobile .env file..."
    echo "API_URL=http://localhost:8000" > .env
    echo "GOOGLE_MAPS_API_KEY=your-api-key-here" >> .env
    print_warning "Please edit frontend/mobile/.env with your API keys"
fi

cd ../..

# Final instructions
echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "To start development:"
echo ""
echo "1. Backend (Terminal 1):"
echo "   cd backend"
echo "   source .venv/bin/activate"
echo "   uvicorn app.main:app --reload"
echo "   # API will be available at http://localhost:8000"
echo ""
echo "2. Web Frontend (Terminal 2):"
echo "   cd frontend/web"
echo "   npm run dev"
echo "   # Web app will be available at http://localhost:3000"
echo ""
echo "3. Mobile Frontend (Terminal 3):"
echo "   cd frontend/mobile"
echo "   npm run ios    # or npm run android"
echo ""
echo "📖 Documentation:"
echo "   • API Docs: http://localhost:8000/docs"
echo "   • Project Docs: ./docs/"
echo ""
echo "⚠️  Don't forget to:"
echo "   • Set up your database credentials in backend/.env"
echo "   • Add your Google Maps API key to environment files"
echo "   • Set up React Native development environment for mobile"

print_status "Happy coding! 🚀"
