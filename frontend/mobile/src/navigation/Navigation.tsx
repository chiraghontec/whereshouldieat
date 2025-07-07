import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/MaterialIcons"

import LoginScreen from "../screens/auth/LoginScreen"
import RegisterScreen from "../screens/auth/RegisterScreen"
import OnboardingScreen from "../screens/auth/OnboardingScreen"
import DashboardScreen from "../screens/main/DashboardScreen"
import SearchScreen from "../screens/main/SearchScreen"
import MapScreen from "../screens/main/MapScreen"
import BookmarksScreen from "../screens/main/BookmarksScreen"
import ProfileScreen from "../screens/main/ProfileScreen"
import RestaurantDetailScreen from "../screens/main/RestaurantDetailScreen"
import ReviewScreen from "../screens/main/ReviewScreen"

import { colors } from "../theme/theme"
import { useApp } from "../contexts/AppContext"

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

          return <Icon name={iconName} size={size} color={color} />
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
  const { state } = useApp()

  return (
    <Stack.Navigator
      initialRouteName={state.user ? "MainTabs" : "Login"}
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
