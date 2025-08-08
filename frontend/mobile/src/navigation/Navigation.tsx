import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialIcons } from "@expo/vector-icons"

import LoginScreen from "../screens/auth/LoginScreenSimple"
import RegisterScreen from "../screens/auth/RegisterScreenSimple"
import OnboardingScreen from "../screens/auth/OnboardingScreenSimple"
import DashboardScreen from "../screens/main/DashboardScreenSimple"
import SearchScreen from "../screens/main/SearchScreenSimple"
import MapScreen from "../screens/main/MapScreenSimple"
import BookmarksScreen from "../screens/main/BookmarksScreenSimple"
import ProfileScreen from "../screens/main/ProfileScreenSimple"
import RestaurantDetailScreen from "../screens/main/RestaurantDetailScreenSimple"
import ReviewScreen from "../screens/main/ReviewScreenSimple"

import { colors } from "../theme/theme"
import { useAppContext } from "../contexts/AppContext"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string

          switch (route.name) {
            case "Dashboard":
              iconName = "home"
              break
            case "Search":
              iconName = "search"
              break
            case "Map":
              iconName = "map"
              break
            case "Bookmarks":
              iconName = "bookmark"
              break
            case "Profile":
              iconName = "person"
              break
            default:
              iconName = "home"
          }

          return <MaterialIcons name={iconName as any} size={size} color={color} />
        },
        tabBarActiveTintColor: colors.primaryOrange,
        tabBarInactiveTintColor: colors.gray[500],
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default function Navigation() {
  const { isAuthenticated } = useAppContext()

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? "MainTabs" : "Login"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={{ headerShown: true, title: "Restaurant Details" }}
      />
      <Stack.Screen name="Review" component={ReviewScreen} options={{ headerShown: true, title: "Write Review" }} />
    </Stack.Navigator>
  )
}
