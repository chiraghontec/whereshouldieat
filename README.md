# FoodieFind - Restaurant Discovery SaaS Platform

> Discover hidden culinary gems your taste buds have been searching for

FoodieFind is a comprehensive restaurant discovery platform that helps food enthusiasts find underrated local restaurants using our proprietary "Hidden Gem Algorithm." The platform consists of a FastAPI backend, Next.js web application, and React Native mobile apps.

## 🏗️ Project Structure

```
foodiefind/
├── backend/           # FastAPI Backend API
├── frontend/          # Frontend Applications
│   ├── web/          # Next.js Web Application  
│   ├── mobile/       # React Native Mobile App
│   └── shared/       # Shared Components & Logic
├── docs/             # Documentation
└── scripts/          # Deployment & Development Scripts
```

## 🎯 Key Features

### 🔍 **Smart Discovery**
- **Hidden Gem Algorithm**: Finds restaurants with high ratings but low review counts
- **Dish-Level Search**: Search for specific menu items across all restaurants
- **Advanced Filtering**: Cuisine type, price range, dietary restrictions, distance

### 👥 **Community-Driven**
- **Verified Reviews**: Photo-required reviews from real food enthusiasts
- **Local Insights**: "Why it's underrated" stories from community members
- **Multi-Category Ratings**: Food, atmosphere, service, and value ratings

### 📱 **Cross-Platform**
- **Progressive Web App**: Responsive web experience
- **iOS & Android Apps**: Native mobile experience
- **Offline Support**: Cached data for offline browsing

### 🥗 **Dietary Intelligence**
- **Smart Filtering**: Accurate dietary restriction filtering
- **Menu-Level Tags**: Vegan, gluten-free, keto options clearly marked
- **Allergy-Friendly**: Safe dining for people with food allergies

## 🚀 Quick Start

### Prerequisites
- **Backend**: Python 3.8+, PostgreSQL
- **Web**: Node.js 18+, npm/yarn
- **Mobile**: React Native development environment

### Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python seed_data.py
uvicorn app.main:app --reload
# API available at http://localhost:8000
```

### Web Application (Next.js)
```bash
cd frontend/web
npm install
npm run dev
# Web app available at http://localhost:3000
```

### Mobile Application (React Native)
```bash
cd frontend/mobile
npm install
npm run ios    # or npm run android
```

## 📊 Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Database ORM
- **PostgreSQL** - Primary database
- **JWT** - Authentication
- **Geopy** - Location calculations

### Web Frontend
- **Next.js 15** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **TypeScript** - Type safety

### Mobile Frontend
- **React Native** - Cross-platform mobile framework
- **React Navigation** - Navigation library
- **React Native Paper** - Material Design components
- **TypeScript** - Type safety

### Shared
- **React Context** - State management
- **Custom Hooks** - Reusable logic
- **Utility Libraries** - Common functions

## 🌟 Unique Value Proposition

**Problem**: Food enthusiasts waste time and money on disappointing restaurant experiences because existing platforms prioritize popular/paid establishments over genuine quality.

**Solution**: FoodieFind reveals hidden culinary gems through:
- Proprietary algorithm that finds underrated restaurants
- Community of verified local food enthusiasts
- Dish-specific search and dietary intelligence
- Focus on authentic experiences over tourist traps

## 📈 Market Opportunity

- **Food Discovery Market**: $150B+ globally
- **Target Users**: Food enthusiasts, travelers, people with dietary restrictions
- **Competitive Advantage**: Focus on hidden gems vs. mainstream popularity
- **Growth Strategy**: Community-driven discovery and word-of-mouth

## 🔧 Development

### Branch Strategy
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Individual feature development
- `backend/*` - Backend-specific features  
- `frontend/*` - Frontend-specific features
- `mobile/*` - Mobile-specific features

### API Documentation
- **Interactive Docs**: http://localhost:8000/docs
- **OpenAPI Spec**: http://localhost:8000/redoc
- **Postman Collection**: Available in `/docs`

### Environment Variables
```bash
# Backend (.env)
DATABASE_URL=postgresql://user:pass@localhost/foodie_db
SECRET_KEY=your-secret-key
GOOGLE_MAPS_API_KEY=your-api-key

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key
```

## 🧪 Testing

```bash
# Backend
cd backend && pytest

# Web Frontend  
cd frontend/web && npm test

# Mobile
cd frontend/mobile && npm test
```

## 🚀 Deployment

### Production URLs
- **Web App**: https://foodiefind.com
- **API**: https://api.foodiefind.com
- **Mobile Apps**: Available on App Store & Google Play

### Docker Deployment
```bash
docker-compose up -d
```

## 📱 Screenshots

### Mobile App
- 📱 Restaurant discovery with hidden gem highlighting
- 🗺️ Interactive map with restaurant clustering
- ⭐ Multi-category review system
- 📸 Photo-verified community reviews

### Web Application
- 🌐 Marketing landing page
- 🔍 Advanced search and filtering
- 📊 Restaurant analytics dashboard
- 👤 User profile and preferences

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 🔗 Links

- **Website**: https://foodiefind.com
- **Documentation**: https://docs.foodiefind.com
- **Support**: support@foodiefind.com
- **Twitter**: [@FoodieFindApp](https://twitter.com/foodiefindapp)

---

**Built with ❤️ for food lovers everywhere**
