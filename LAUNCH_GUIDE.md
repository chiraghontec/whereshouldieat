# 🚀 WhereShouldIEat - Complete Launch Guide

## 📋 Overview
This guide will help you launch WhereShouldIEat as both a web application and mobile app. The project is production-ready with all components tested and functional.

---

## 🔧 Prerequisites Setup

### 1. Development Environment
```bash
# Check your current tools
node --version    # Should be 18+
python3 --version # Should be 3.8+
git --version     # Any recent version
```

### 2. Mobile Development Setup (for React Native)
#### For iOS (Mac only):
- **Xcode** (latest version from App Store)
- **iOS Simulator** (included with Xcode)
- **CocoaPods**: `sudo gem install cocoapods`

#### For Android:
- **Android Studio** (download from developer.android.com)
- **Android SDK** (via Android Studio)
- **Java Development Kit (JDK)** 8 or 11

#### React Native CLI:
```bash
npm install -g @react-native-community/cli
```

---

## 🌐 PART 1: Web Application Launch

### Step 1: Setup Backend (FastAPI)
```bash
cd backend

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate  # macOS/Linux
# OR
.venv\\Scripts\\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env file with your database connection details
```

### Step 2: Configure Database
```bash
# For local development (SQLite is already configured)
# For production, update .env with your MongoDB/PostgreSQL connection

# Create database tables
python -m alembic upgrade head

# Seed with sample data (optional)
python seed_data.py
```

### Step 3: Start Backend Server
```bash
# Development mode
python -m uvicorn app.main:app --reload

# Production mode
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```
**Backend will be available at: http://localhost:8000**

### Step 4: Setup Frontend (Next.js)
```bash
cd frontend/web

# Install dependencies
npm install

# Start development server
npm run dev

# For production build
npm run build
npm start
```
**Frontend will be available at: http://localhost:3000**

### Step 5: Verify Web Application
- ✅ Backend API: http://localhost:8000/docs
- ✅ Frontend: http://localhost:3000
- ✅ Test all 11 routes work correctly

---

## 📱 PART 2: Mobile Application Launch

### Step 1: Setup React Native Environment
```bash
cd frontend/mobile

# Install dependencies
npm install

# For iOS (Mac only)
cd ios && pod install && cd ..
```

### Step 2: Configure Mobile App
```bash
# Update API endpoint in mobile app
# Edit src/config/api.ts to point to your backend
```

### Step 3: Run on iOS (Mac only)
```bash
# Start Metro bundler
npm start

# In another terminal, run iOS app
npm run ios
# OR
npx react-native run-ios
```

### Step 4: Run on Android
```bash
# Start Android emulator or connect device
# Then run:
npm run android
# OR
npx react-native run-android
```

---

## 🌍 PART 3: Production Deployment

### Web Application Deployment Options:

#### Option A: Vercel (Recommended for Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend/web
vercel

# Follow prompts to deploy
```

#### Option B: Netlify
```bash
# Build the app
npm run build

# Deploy to Netlify (drag & drop build folder)
# Or use Netlify CLI
```

#### Backend Deployment Options:

#### Option A: Railway/Render (Recommended)
```bash
# Connect your GitHub repo to Railway/Render
# Set environment variables
# Deploy with one click
```

#### Option B: AWS/Google Cloud
```bash
# Use Docker container
docker build -t whereshouldieat-backend .
# Deploy to your preferred cloud platform
```

### Mobile App Deployment:

#### iOS App Store
1. **Apple Developer Account** ($99/year)
2. **Build for production**:
   ```bash
   cd frontend/mobile
   npx react-native run-ios --configuration Release
   ```
3. **Archive and upload** via Xcode
4. **Submit for review**

#### Google Play Store
1. **Google Play Console account** ($25 one-time)
2. **Build APK/AAB**:
   ```bash
   cd frontend/mobile
   npm run build:android
   ```
3. **Upload to Play Console**
4. **Submit for review**

---

## ⚙️ PART 4: Configuration & Environment Variables

### Backend (.env file):
```env
# Database
DATABASE_URL=your_database_connection_string
MONGODB_URL=your_mongodb_connection

# Security
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256

# API Settings
API_V1_STR=/api
PROJECT_NAME=WhereShouldIEat

# External APIs (optional)
GOOGLE_MAPS_API_KEY=your_maps_api_key
```

### Frontend (next.config.mjs):
```javascript
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:8000', // Your backend URL
    NEXT_PUBLIC_APP_NAME: 'WhereShouldIEat',
  }
}
```

### Mobile (src/config/api.ts):
```typescript
export const API_CONFIG = {
  BASE_URL: 'https://your-backend-url.com', // Your deployed backend
  TIMEOUT: 10000,
}
```

---

## 🔧 PART 5: Quick Launch Commands

### Development (Local):
```bash
# Terminal 1: Backend
cd backend && source .venv/bin/activate && python -m uvicorn app.main:app --reload

# Terminal 2: Web Frontend  
cd frontend/web && npm run dev

# Terminal 3: Mobile (optional)
cd frontend/mobile && npm start
```

### Production Build:
```bash
# Backend
cd backend && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000

# Frontend
cd frontend/web && npm run build && npm start

# Mobile
cd frontend/mobile && npm run build:android && npm run build:ios
```

---

## 🎯 PART 6: Testing & Verification

### Backend Testing:
```bash
cd backend
python -m pytest tests/
curl http://localhost:8000/health
```

### Frontend Testing:
```bash
cd frontend/web
npm run lint
npm run type-check
# Test all routes manually
```

### Mobile Testing:
```bash
cd frontend/mobile
npm test
# Test on real devices/emulators
```

---

## 📊 Success Metrics

After launch, monitor:
- ✅ **Web App**: Response times, error rates, user engagement
- ✅ **Mobile App**: Crash reports, user ratings, download metrics  
- ✅ **Backend**: API response times, database performance
- ✅ **User Experience**: Restaurant discovery success rate

---

## 🆘 Troubleshooting

### Common Issues:
1. **Port conflicts**: Change ports in config files
2. **Database connection**: Verify connection strings
3. **Mobile build errors**: Check React Native setup
4. **API CORS issues**: Configure CORS in backend
5. **Environment variables**: Double-check all .env files

---

## 🎉 Next Steps After Launch

1. **Monitor Performance** using analytics tools
2. **Gather User Feedback** and iterate
3. **Add New Features** based on user needs
4. **Scale Infrastructure** as user base grows
5. **Marketing & User Acquisition**

---

**Your WhereShouldIEat application is ready for launch! 🚀**

Choose your deployment strategy and follow the steps above. The project is fully functional and production-ready.
