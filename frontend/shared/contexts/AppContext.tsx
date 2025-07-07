"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

export interface Restaurant {
  id: string
  name: string
  cuisine: string
  rating: number
  priceRange: "$" | "$$" | "$$$" | "$$$$"
  image: string
  address: string
  latitude: number
  longitude: number
  isBookmarked: boolean
  distance?: number
  reviews: Review[]
  openingHours: string
  phone: string
  website?: string
}

export interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
  images?: string[]
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  preferences: {
    cuisines: string[]
    dietaryRestrictions: string[]
    priceRange: string[]
  }
}

interface AppState {
  user: User | null
  restaurants: Restaurant[]
  bookmarks: string[]
  searchQuery: string
  filters: {
    cuisine: string[]
    priceRange: string[]
    rating: number
    distance: number
    dietary: string[]
  }
  isLoading: boolean
}

type AppAction =
  | { type: "SET_USER"; payload: User }
  | { type: "SET_RESTAURANTS"; payload: Restaurant[] }
  | { type: "TOGGLE_BOOKMARK"; payload: string }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_FILTERS"; payload: Partial<AppState["filters"]> }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "ADD_REVIEW"; payload: { restaurantId: string; review: Review } }

const initialState: AppState = {
  user: null,
  restaurants: [
    {
      id: "1",
      name: "Bella Vista",
      cuisine: "Italian",
      rating: 4.5,
      priceRange: "$$$",
      image: "/placeholder.jpg",
      address: "123 Main St, San Francisco, CA",
      latitude: 37.7749,
      longitude: -122.4194,
      isBookmarked: false,
      reviews: [],
      openingHours: "11:00 AM - 10:00 PM",
      phone: "(555) 123-4567",
      website: "https://bellavista.com",
    },
    {
      id: "2",
      name: "Sakura Sushi",
      cuisine: "Japanese",
      rating: 4.8,
      priceRange: "$$$$",
      image: "/placeholder.jpg",
      address: "456 Oak Ave, San Francisco, CA",
      latitude: 37.7849,
      longitude: -122.4094,
      isBookmarked: true,
      reviews: [],
      openingHours: "5:00 PM - 11:00 PM",
      phone: "(555) 987-6543",
    },
    {
      id: "3",
      name: "Taco Libre",
      cuisine: "Mexican",
      rating: 4.2,
      priceRange: "$$",
      image: "/placeholder.jpg",
      address: "789 Pine St, San Francisco, CA",
      latitude: 37.7649,
      longitude: -122.4294,
      isBookmarked: false,
      reviews: [],
      openingHours: "10:00 AM - 9:00 PM",
      phone: "(555) 456-7890",
    },
  ],
  bookmarks: ["2"],
  searchQuery: "",
  filters: {
    cuisine: [],
    priceRange: [],
    rating: 0,
    distance: 10,
    dietary: [],
  },
  isLoading: false,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }
    case "SET_RESTAURANTS":
      return { ...state, restaurants: action.payload }
    case "TOGGLE_BOOKMARK":
      const restaurantId = action.payload
      const isCurrentlyBookmarked = state.bookmarks.includes(restaurantId)
      const newBookmarks = isCurrentlyBookmarked
        ? state.bookmarks.filter((id) => id !== restaurantId)
        : [...state.bookmarks, restaurantId]

      return {
        ...state,
        bookmarks: newBookmarks,
        restaurants: state.restaurants.map((restaurant) =>
          restaurant.id === restaurantId ? { ...restaurant, isBookmarked: !isCurrentlyBookmarked } : restaurant,
        ),
      }
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload }
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "ADD_REVIEW":
      return {
        ...state,
        restaurants: state.restaurants.map((restaurant) =>
          restaurant.id === action.payload.restaurantId
            ? { ...restaurant, reviews: [...restaurant.reviews, action.payload.review] }
            : restaurant,
        ),
      }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
