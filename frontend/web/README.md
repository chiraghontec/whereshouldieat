# FoodieFind Frontend

A modern React.js frontend for FoodieFind - a restaurant discovery SaaS that helps food enthusiasts find hidden gem restaurants.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/chirag0117-outlookcoms-projects/v0-foodie-find-frontend)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/vUFS3b1WWa7)

## 🎨 Design System

### Colors
- **Primary**: `#FF6B35` (warm orange) - Main brand color for CTAs and highlights
- **Secondary**: `#2E8B57` (forest green) - Supporting color for accents
- **Accent**: `#FFD700` (gold) - Special highlights and premium features
- **Neutral**: `#F8F9FA` (light gray) - Background colors
- **Dark**: `#2C3E50` - Primary text color
- **Success**: `#28A745` - Success states and confirmations
- **Warning**: `#FFC107` - Warning states and alerts

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headlines**: `font-bold text-3xl md:text-5xl`
- **Subheadlines**: `font-medium text-xl md:text-2xl`
- **Body Text**: `font-normal text-base md:text-lg`
- **Buttons**: `font-bold text-lg`

### Component Styling
- **Rounded Corners**: `rounded-lg` (8px) for buttons and inputs
- **Cards**: `rounded-xl` with subtle shadows
- **Buttons**: `rounded-lg` with hover states and transitions
- **Modern Aesthetic**: Clean design similar to Airbnb/Uber

## 📱 Application Screens

### 1. Landing Page (`/`)
Marketing homepage with:
- **Hero Section**: Compelling headline, CTAs, trust indicators
- **Features Section**: 3 key feature cards with icons
- **How It Works**: 3-step process explanation
- **Testimonials**: Customer reviews with ratings
- **Pricing**: Free and Premium plan comparison

### 2. Authentication
- **Login Page** (`/login`): Email/password with social login options
- **Registration Page** (`/register`): Account creation with validation

### 3. Onboarding Flow (`/onboarding`)
4-step personalization process:
1. **Location Setup**: Current location or manual entry
2. **Taste Preferences**: Spice level and dietary restrictions
3. **Favorite Cuisines**: Multi-select cuisine preferences
4. **Price Range**: Spending preferences per meal

### 4. Main Application
- **Dashboard** (`/dashboard`): Main app interface with search and filters
- **Restaurant Details** (`/restaurant/[id]`): Detailed restaurant information
- **Map View** (`/map`): Interactive map with restaurant locations
- **Search Results** (`/search`): Filtered restaurant listings

### 5. User Features
- **User Profile** (`/profile`): Personal stats and preferences
- **Write Review** (`/review`): Review creation with photos and ratings
- **Bookmarks** (`/bookmarks`): Saved restaurants and custom lists

## 🏗️ Project Structure

\`\`\`
foodie-find-frontend/
├── app/                          # Next.js App Router pages
│   ├── bookmarks/
│   │   └── page.tsx             # Saved restaurants page
│   ├── dashboard/
│   │   └── page.tsx             # Main dashboard
│   ├── login/
│   │   └── page.tsx             # Login page
│   ├── map/
│   │   └── page.tsx             # Map view
│   ├── onboarding/
│   │   └── page.tsx             # User onboarding flow
│   ├── profile/
│   │   └── page.tsx             # User profile
│   ├── register/
│   │   └── page.tsx             # Registration page
│   ├── restaurant/
│   │   └── [id]/
│   │       └── page.tsx         # Restaurant detail page
│   ├── review/
│   │   └── page.tsx             # Write review page
│   ├── search/
│   │   ├── loading.tsx          # Search loading state
│   │   └── page.tsx             # Search results
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/                   # Reusable components
│   ├── pages/                   # Page-specific components
│   │   ├── dashboard.tsx        # Dashboard components
│   │   ├── landing-page.tsx     # Landing page sections
│   │   ├── login-page.tsx       # Login form
│   │   ├── onboarding-flow.tsx  # Onboarding steps
│   │   └── register-page.tsx    # Registration form
│   ├── ui/                      # UI components (shadcn/ui)
│   │   ├── button.tsx           # Button variants
│   │   ├── card.tsx             # Card components
│   │   ├── input.tsx            # Form inputs
│   │   ├── restaurant-card.tsx  # Restaurant display card
│   │   ├── search-bar.tsx       # Search input component
│   │   ├── star-rating.tsx      # Rating display/input
│   │   └── ...                  # Other UI components
│   └── theme-provider.tsx       # Theme context provider
├── contexts/
│   └── app-context.tsx          # Global app state
├── hooks/
│   ├── use-mobile.tsx           # Mobile detection hook
│   └── use-toast.ts             # Toast notifications
├── lib/
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
│   ├── placeholder-logo.png     # Logo placeholder
│   ├── placeholder-user.jpg     # User avatar placeholder
│   └── placeholder.svg          # General placeholder
├── styles/
│   └── globals.css              # Additional global styles
├── components.json              # shadcn/ui configuration
├── next.config.mjs              # Next.js configuration
├── package.json                 # Dependencies
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
\`\`\`

## 🧩 Key Components

### Core UI Components

#### Button Component (`components/ui/button.tsx`)
\`\`\`tsx
// Variants: default, destructive, outline, secondary, ghost, link
<Button variant="default" size="lg">Find Hidden Gems</Button>
\`\`\`

#### Restaurant Card (`components/ui/restaurant-card.tsx`)
\`\`\`tsx
<RestaurantCard
  restaurant={restaurantData}
  onBookmark={handleBookmark}
  onViewDetails={handleViewDetails}
/>
\`\`\`

#### Star Rating (`components/ui/star-rating.tsx`)
\`\`\`tsx
<StarRating
  rating={4.5}
  maxRating={5}
  showText={true}
  interactive={false}
/>
\`\`\`

#### Search Bar (`components/ui/search-bar.tsx`)
\`\`\`tsx
<SearchBar
  placeholder="Search restaurants or dishes..."
  onSearch={handleSearch}
  showFilters={true}
/>
\`\`\`

### Page Components

#### Landing Page (`components/pages/landing-page.tsx`)
- Hero section with CTAs
- Features showcase
- How it works section
- Customer testimonials
- Pricing comparison

#### Onboarding Flow (`components/pages/onboarding-flow.tsx`)
- Multi-step form with progress indicator
- Location setup
- Preference collection
- Cuisine selection
- Price range configuration

#### Dashboard (`components/pages/dashboard.tsx`)
- Search interface
- Filter controls
- Restaurant grid/list view
- Quick action buttons

## 🔧 Technical Stack

### Core Technologies
- **React 18** - UI library with hooks and context
- **Next.js 14** - App Router for file-based routing
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Pre-built accessible components

### Key Dependencies
\`\`\`json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.0.0",
  "@radix-ui/react-*": "Various Radix primitives",
  "lucide-react": "Icon library",
  "class-variance-authority": "Component variants",
  "clsx": "Conditional classes"
}
\`\`\`

### State Management
- **React Context** (`contexts/app-context.tsx`) for global state
- **Local State** with useState for component-specific data
- **Form State** with controlled components

### Responsive Design
- **Mobile-first** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly** interactions on mobile
- **Optimized layouts** for desktop

## 🎯 Key Features

### Restaurant Discovery
- **Hidden Gem Algorithm**: Finds high-rated, low-review-count restaurants
- **Dish-Level Search**: Search for specific dishes, not just cuisines
- **Dietary Intelligence**: Accurate filtering for dietary restrictions
- **Location-Based**: Distance-aware restaurant recommendations

### User Experience
- **Personalized Onboarding**: Tailored experience based on preferences
- **Advanced Filtering**: Cuisine, price, distance, dietary options
- **Interactive Maps**: Visual restaurant discovery
- **Review System**: Photo uploads and detailed ratings
- **Bookmark System**: Save restaurants to custom lists

### Modern UI/UX
- **Smooth Animations**: Hover states and transitions
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time validation feedback
- **Accessibility**: ARIA labels and keyboard navigation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation
\`\`\`bash
# Clone the repository
git clone https://github.com/your-username/foodie-find-frontend.git

# Navigate to project directory
cd foodie-find-frontend

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

### Development
\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
\`\`\`

## 📊 Sample Data Structure

### Restaurant Object
\`\`\`typescript
interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  priceRange: 1 | 2 | 3 | 4;
  rating: number;
  reviewCount: number;
  distance: number;
  isHiddenGem: boolean;
  photos: string[];
  address: string;
  phone: string;
  menuItems: MenuItem[];
  reviews: Review[];
}
\`\`\`

### User Preferences
\`\`\`typescript
interface UserPreferences {
  location: {
    city: string;
    coordinates: [number, number];
  };
  cuisines: string[];
  dietaryRestrictions: string[];
  spiceLevel: number;
  priceRange: number[];
}
\`\`\`

## 🔮 Future Enhancements

### Planned Features
- **Real-time Chat**: Connect with other food enthusiasts
- **Social Features**: Follow users and share discoveries
- **AI Recommendations**: Machine learning-powered suggestions
- **Reservation Integration**: Book tables directly through the app
- **Loyalty Program**: Rewards for discovering hidden gems

### Technical Improvements
- **Progressive Web App**: Offline functionality
- **Push Notifications**: New restaurant alerts
- **Advanced Analytics**: User behavior tracking
- **Performance Optimization**: Image lazy loading and caching
- **Internationalization**: Multi-language support

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

Built with ❤️ using [v0.dev](https://v0.dev) and deployed on [Vercel](https://vercel.com)
