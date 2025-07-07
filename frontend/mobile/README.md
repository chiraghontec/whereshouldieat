# FoodieFind React Native App

A cross-platform mobile application for discovering and reviewing restaurants, built with React Native and OpenStreetMap integration.

## 🚀 Features

### Core Functionality
- **Restaurant Discovery**: Browse and search restaurants with advanced filtering
- **Interactive Maps**: OpenStreetMap integration for location-based discovery
- **User Reviews**: Write and read restaurant reviews with star ratings
- **Bookmarks**: Save favorite restaurants for quick access
- **User Profiles**: Personalized preferences and statistics

### Mobile-Optimized Features
- **Location Services**: GPS integration for nearby restaurant discovery
- **Touch Interactions**: Smooth gestures and animations
- **Offline Support**: Cached data for better performance
- **Push Notifications**: Restaurant recommendations and updates
- **Social Sharing**: Share restaurant discoveries with friends

## 🛠️ Tech Stack

### Core Technologies
- **React Native 0.72+**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **React Navigation 6**: Navigation and routing
- **React Native Paper**: Material Design components

### Key Libraries
- **OpenStreetMap Integration**: `react-native-webview` with Leaflet.js
- **Location Services**: `@react-native-community/geolocation`
- **Image Handling**: `react-native-fast-image`
- **State Management**: React Context + useReducer
- **UI Components**: React Native Paper + Vector Icons

### Development Tools
- **Metro Bundler**: React Native bundler
- **Flipper**: Debugging and development tools
- **ESLint + Prettier**: Code formatting and linting
- **TypeScript**: Static type checking

## 📱 Platform Support

### iOS
- iOS 11.0+
- iPhone and iPad support
- Native iOS UI adaptations
- App Store ready

### Android
- Android API 21+ (Android 5.0)
- Material Design 3 components
- Google Play Store ready
- Adaptive icons and splash screens

## 🏗️ Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── RestaurantCard.tsx
│   ├── StarRating.tsx
│   └── FilterModal.tsx
├── contexts/           # React Context providers
│   └── AppContext.tsx
├── navigation/         # Navigation configuration
│   └── Navigation.tsx
├── screens/           # Screen components
│   ├── auth/          # Authentication screens
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── OnboardingScreen.tsx
│   └── main/          # Main app screens
│       ├── DashboardScreen.tsx
│       ├── SearchScreen.tsx
│       ├── MapScreen.tsx
│       ├── BookmarksScreen.tsx
│       ├── ProfileScreen.tsx
│       ├── RestaurantDetailScreen.tsx
│       └── ReviewScreen.tsx
├── theme/             # Design system
│   └── theme.ts
└── types/             # TypeScript definitions
\`\`\`

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/your-username/foodie-find-rn.git
cd foodie-find-rn
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **iOS Setup**
\`\`\`bash
cd ios && pod install && cd ..
\`\`\`

4. **Start Metro bundler**
\`\`\`bash
npm start
# or
yarn start
\`\`\`

5. **Run on device/simulator**
\`\`\`bash
# iOS
npm run ios
# or
yarn ios

# Android
npm run android
# or
yarn android
\`\`\`

## 🗺️ OpenStreetMap Integration

The app uses OpenStreetMap instead of Google Maps for several advantages:

### Benefits
- **No API Keys Required**: Free to use without restrictions
- **Open Source**: Community-driven mapping data
- **Privacy Focused**: No tracking or data collection
- **Customizable**: Full control over map styling and features

### Implementation
- **Leaflet.js**: Lightweight mapping library
- **WebView Integration**: Seamless map rendering in React Native
- **Custom Markers**: Restaurant locations with popup information
- **User Location**: GPS integration for current position

### Map Features
- **Restaurant Markers**: Interactive pins showing restaurant locations
- **User Location**: Blue dot showing current position
- **Popup Information**: Restaurant details on marker tap
- **Zoom Controls**: Pinch-to-zoom and double-tap gestures
- **Offline Tiles**: Cached map tiles for offline viewing

## 🎨 Design System

### Color Palette
- **Primary Orange**: #FF6B35 (brand color)
- **Secondary**: #FFA726 (accent color)
- **Success Green**: #4CAF50
- **Background**: #FFFFFF
- **Surface**: #F5F5F5
- **Text**: #212121

### Typography
- **Headings**: Bold, clear hierarchy
- **Body Text**: Readable, accessible sizing
- **Captions**: Secondary information styling

### Components
- **Material Design 3**: Modern, accessible components
- **Custom Components**: Restaurant cards, star ratings, filters
- **Consistent Spacing**: 4px grid system
- **Responsive Design**: Adapts to different screen sizes

## 📊 State Management

### Context Architecture
\`\`\`typescript
interface AppState {
  user: User | null;
  restaurants: Restaurant[];
  bookmarks: string[];
  searchQuery: string;
  filters: FilterState;
  isLoading: boolean;
}
\`\`\`

### Key Actions
- `SET_USER`: User authentication state
- `SET_RESTAURANTS`: Restaurant data updates
- `TOGGLE_BOOKMARK`: Bookmark management
- `SET_SEARCH_QUERY`: Search functionality
- `SET_FILTERS`: Filter preferences
- `ADD_REVIEW`: Review submissions

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

\`\`\`env
# Optional: Analytics and crash reporting
SENTRY_DSN=your_sentry_dsn_here

# Optional: Backend API endpoints
API_BASE_URL=https://your-api.com

# Optional: Social login credentials
GOOGLE_CLIENT_ID=your_google_client_id
APPLE_CLIENT_ID=your_apple_client_id
\`\`\`

### Build Configuration

#### iOS (ios/FoodieFindRN/Info.plist)
\`\`\`xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs location access to find nearby restaurants</string>
\`\`\`

#### Android (android/app/src/main/AndroidManifest.xml)
\`\`\`xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.INTERNET" />
\`\`\`

## 🚀 Deployment

### iOS App Store
1. **Archive the app** in Xcode
2. **Upload to App Store Connect**
3. **Submit for review**

### Google Play Store
1. **Generate signed APK**
\`\`\`bash
cd android
./gradlew assembleRelease
\`\`\`
2. **Upload to Google Play Console**
3. **Submit for review**

## 🧪 Testing

### Unit Tests
\`\`\`bash
npm test
# or
yarn test
\`\`\`

### E2E Testing
\`\`\`bash
# iOS
npm run test:ios
# Android
npm run test:android
\`\`\`

## 📈 Performance Optimization

### Image Optimization
- **Fast Image**: Optimized image loading and caching
- **Lazy Loading**: Images load as needed
- **Compression**: Automatic image compression

### Memory Management
- **FlatList**: Efficient list rendering
- **Image Caching**: Reduced network requests
- **State Optimization**: Minimal re-renders

### Network Optimization
- **Request Caching**: Cached API responses
- **Offline Support**: Local data storage
- **Background Sync**: Data updates when online

## 🔒 Security

### Data Protection
- **Secure Storage**: Encrypted local storage
- **API Security**: Token-based authentication
- **Privacy**: No unnecessary data collection

### Permissions
- **Location**: Only when needed for restaurant discovery
- **Camera**: For profile pictures and review photos
- **Storage**: For offline data and image caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@foodiefind.com
- Documentation: [docs.foodiefind.com](https://docs.foodiefind.com)

---

**FoodieFind React Native** - Discover great food, wherever you are! 🍽️📱
