#!/bin/bash

# 🚀 WhereShouldIEat Quick Launch Script
echo "🍽️ Starting WhereShouldIEat Application..."
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "LAUNCH_GUIDE.md" ]; then
    echo "❌ Error: Please run this script from the WhereShouldIEat project root directory"
    exit 1
fi

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

# Function to start backend
start_backend() {
    echo "🔧 Starting Backend (FastAPI)..."
    cd backend
    
    # Check if virtual environment exists
    if [ ! -d ".venv" ]; then
        echo "📦 Creating Python virtual environment..."
        python3 -m venv .venv
    fi
    
    # Activate virtual environment
    source .venv/bin/activate
    
    # Install dependencies if needed
    if [ ! -f ".venv/pyvenv.cfg" ] || [ requirements.txt -nt .venv/pyvenv.cfg ]; then
        echo "📦 Installing Python dependencies..."
        pip install -r requirements.txt
    fi
    
    # Check if .env exists
    if [ ! -f ".env" ]; then
        echo "⚙️ Creating .env file from example..."
        cp .env.example .env
        echo "📝 Please edit backend/.env file with your configuration"
    fi
    
    # Start the server
    echo "🚀 Starting FastAPI server on port 8000..."
    python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
    BACKEND_PID=$!
    
    # Wait for backend to start
    sleep 3
    
    # Check if backend is running
    if check_port 8000; then
        echo "✅ Backend started successfully at http://localhost:8000"
        echo "📚 API Documentation: http://localhost:8000/docs"
    else
        echo "❌ Backend failed to start"
        return 1
    fi
    
    cd ..
}

# Function to start frontend
start_frontend() {
    echo ""
    echo "🌐 Starting Frontend (Next.js)..."
    cd frontend/web
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing Node.js dependencies..."
        npm install
    fi
    
    # Start the development server
    echo "🚀 Starting Next.js server on port 3000..."
    npm run dev &
    FRONTEND_PID=$!
    
    # Wait for frontend to start
    sleep 5
    
    # Check if frontend is running
    if check_port 3000; then
        echo "✅ Frontend started successfully at http://localhost:3000"
    else
        echo "❌ Frontend failed to start"
        return 1
    fi
    
    cd ../..
}

# Function to check system requirements
check_requirements() {
    echo "🔍 Checking system requirements..."
    
    # Check Node.js
    if command -v node >/dev/null 2>&1; then
        NODE_VERSION=$(node --version)
        echo "✅ Node.js: $NODE_VERSION"
    else
        echo "❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org"
        exit 1
    fi
    
    # Check Python
    if command -v python3 >/dev/null 2>&1; then
        PYTHON_VERSION=$(python3 --version)
        echo "✅ Python: $PYTHON_VERSION"
    else
        echo "❌ Python 3 not found. Please install Python 3.8+ from https://python.org"
        exit 1
    fi
    
    # Check npm
    if command -v npm >/dev/null 2>&1; then
        NPM_VERSION=$(npm --version)
        echo "✅ npm: $NPM_VERSION"
    else
        echo "❌ npm not found. Please install Node.js which includes npm"
        exit 1
    fi
    
    echo ""
}

# Function to show status
show_status() {
    echo ""
    echo "📊 Application Status:"
    echo "====================="
    
    if check_port 8000; then
        echo "🟢 Backend:  http://localhost:8000 (Running)"
        echo "📚 API Docs: http://localhost:8000/docs"
    else
        echo "🔴 Backend:  http://localhost:8000 (Not running)"
    fi
    
    if check_port 3000; then
        echo "🟢 Frontend: http://localhost:3000 (Running)"
    else
        echo "🔴 Frontend: http://localhost:3000 (Not running)"
    fi
    
    echo ""
    echo "🎯 Available Routes:"
    echo "   / - Landing page"
    echo "   /login - User login"
    echo "   /register - User registration"
    echo "   /dashboard - User dashboard"
    echo "   /search - Restaurant search"
    echo "   /bookmarks - Saved restaurants"
    echo "   /map - Restaurant map"
    echo "   /profile - User profile"
    echo "   /review - Write reviews"
    echo "   /onboarding - User onboarding"
    echo "   /restaurant/[id] - Restaurant details"
}

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    
    # Kill any remaining processes on our ports
    lsof -ti:8000 | xargs kill -9 2>/dev/null
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    
    echo "✅ Cleanup complete"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Main execution
main() {
    echo "🍽️ WhereShouldIEat Quick Launch"
    echo "================================"
    echo ""
    
    check_requirements
    
    # Check if servers are already running
    if check_port 8000 || check_port 3000; then
        echo "⚠️  Some ports are already in use:"
        if check_port 8000; then echo "   - Port 8000 (Backend)"; fi
        if check_port 3000; then echo "   - Port 3000 (Frontend)"; fi
        echo ""
        read -p "Do you want to kill existing processes and restart? (y/n): " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            lsof -ti:8000 | xargs kill -9 2>/dev/null
            lsof -ti:3000 | xargs kill -9 2>/dev/null
            sleep 2
        else
            echo "Showing current status..."
            show_status
            exit 0
        fi
    fi
    
    # Start services
    start_backend
    if [ $? -ne 0 ]; then
        echo "❌ Failed to start backend"
        exit 1
    fi
    
    start_frontend
    if [ $? -ne 0 ]; then
        echo "❌ Failed to start frontend"
        cleanup
        exit 1
    fi
    
    # Show final status
    show_status
    
    echo ""
    echo "🎉 WhereShouldIEat is now running!"
    echo "🌐 Open http://localhost:3000 in your browser"
    echo ""
    echo "Press Ctrl+C to stop all servers"
    
    # Keep script running
    while true; do
        sleep 1
    done
}

# Run main function
main
