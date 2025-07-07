# WhereShouldIEat Frontend

This directory contains the frontend applications for WhereShouldIEat - a restaurant discovery SaaS platform.

## 🏗️ Architecture Overview

The frontend is organized into three main directories:

### 📱 `/mobile` - React Native App
Cross-platform mobile application for iOS and Android.

**Tech Stack:**
- React Native
- React Navigation
- React Native Paper (UI components)
- TypeScript
- React Native Reanimated

**Getting Started:**
```bash
cd mobile
npm install

# For iOS
npm run ios

# For Android  
npm run android
```

### 🌐 `/web` - Next.js Web App
Progressive web application built with Next.js.

**Tech Stack:**
- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- Radix UI Components
- TypeScript

**Getting Started:**
```bash
cd web
npm install
npm run dev
```

Access at `http://localhost:3000`

### 🔄 `/shared` - Shared Components & Logic
Reusable components, contexts, hooks, and utilities shared between platforms.

**Contents:**
- `components/` - Shared React components
- `contexts/` - React contexts for state management
- `hooks/` - Custom React hooks
- `lib/` - Utility functions and helpers

## 🎯 Key Features

### Core Functionality
- 🔍 **Restaurant Discovery** - Find hidden gem restaurants
- 📍 **Location-based Search** - Search by proximity and filters
- 🍜 **Dish-level Search** - Find restaurants by specific menu items
- ⭐ **Review System** - Multi-category ratings with photos
- 📌 **Bookmarking** - Save favorite restaurants
- 🥗 **Dietary Filtering** - Filter by dietary restrictions

### User Experience
- 🎯 **Personalized Onboarding** - Taste preferences setup
- 💎 **Hidden Gem Algorithm** - Discover underrated restaurants
- 📱 **Cross-platform** - Consistent experience on web and mobile
- 🌐 **Progressive Web App** - Offline capabilities
- 🎨 **Modern UI** - Clean, food-focused design

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn
- For mobile: React Native development environment

### Project Structure
```
frontend/
├── web/                    # Next.js web application
│   ├── app/               # Next.js app router pages
│   ├── public/            # Static assets
│   ├── styles/            # Global styles
│   └── package.json       # Web dependencies
│
├── mobile/                # React Native application
│   ├── screens/           # Mobile screens
│   ├── navigation/        # Navigation setup
│   ├── theme/             # Mobile theme
│   ├── App.tsx            # React Native entry point
│   └── package.json       # Mobile dependencies
│
└── shared/                # Shared code
    ├── components/        # Reusable components
    ├── contexts/          # React contexts
    ├── hooks/             # Custom hooks
    └── lib/               # Utilities
```

### API Integration
Both applications connect to the FastAPI backend at `/backend`.

**API Base URL:** `http://localhost:8000`

**Key Endpoints:**
- `POST /auth/register` - User registration
- `POST /auth/token` - User login
- `POST /search/location` - Location-based restaurant search
- `POST /search/dish` - Dish-specific search
- `GET /restaurants/{id}` - Restaurant details
- `POST /reviews` - Create review
- `POST /bookmarks/{id}` - Bookmark restaurant

### Environment Variables

**Web (.env.local):**
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
```

**Mobile (.env):**
```bash
API_URL=http://localhost:8000
GOOGLE_MAPS_API_KEY=your_api_key
```

## 🚀 Deployment

### Web Application
```bash
cd web
npm run build
npm start
```

### Mobile Application
```bash
cd mobile

# Android
npm run build:android

# iOS
npm run build:ios
```

## 🧪 Testing
```bash
# Web
cd web
npm test

# Mobile
cd mobile
npm test
```

## 📱 Screenshots & Demos

### Mobile App
- Authentication flow
- Restaurant discovery
- Hidden gem highlighting
- Review and rating system
- Bookmarking functionality

### Web App  
- Landing page
- Dashboard with search
- Map integration
- Restaurant details
- User profile

## 🤝 Contributing

1. Make changes in the appropriate platform directory
2. Update shared components in `/shared` if reusable
3. Test on both platforms when modifying shared code
4. Follow the established code style and conventions

## 📄 License

This project is part of the WhereShouldIEat SaaS platform.
