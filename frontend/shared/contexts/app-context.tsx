"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  location: string
  preferences: {
    spiceLevel: number
    dietaryRestrictions: string[]
    favoriteCuisines: string[]
    priceRange: number
  }
}

interface Restaurant {
  id: string
  name: string
  cuisine: string
  priceRange: number
  rating: number
  reviewCount: number
  distance: number
  isHiddenGem: boolean
  photos: string[]
  address: string
  phone: string
  menuItems: Array<{
    name: string
    description: string
    price: number
    dietaryTags: string[]
  }>
  reviews: Array<{
    id: string
    user: string
    rating: number
    content: string
    whyUnderrated: string
    photos: string[]
    date: string
  }>
}

interface AppState {
  user: User | null
  restaurants: Restaurant[]
  bookmarks: string[]
  searchQuery: string
  filters: {
    cuisine: string[]
    priceRange: number[]
    distance: number
    rating: number
    hiddenGemsOnly: boolean
    dietaryOptions: string[]
  }
  isAuthenticated: boolean
}

type AppAction =
  | { type: "SET_USER"; payload: User }
  | { type: "LOGOUT" }
  | { type: "SET_RESTAURANTS"; payload: Restaurant[] }
  | { type: "ADD_BOOKMARK"; payload: string }
  | { type: "REMOVE_BOOKMARK"; payload: string }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_FILTERS"; payload: Partial<AppState["filters"]> }

const initialState: AppState = {
  user: null,
  restaurants: [],
  bookmarks: [],
  searchQuery: "",
  filters: {
    cuisine: [],
    priceRange: [1, 4],
    distance: 10,
    rating: 0,
    hiddenGemsOnly: false,
    dietaryOptions: [],
  },
  isAuthenticated: false,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, isAuthenticated: true }
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false }
    case "SET_RESTAURANTS":
      return { ...state, restaurants: action.payload }
    case "ADD_BOOKMARK":
      return { ...state, bookmarks: [...state.bookmarks, action.payload] }
    case "REMOVE_BOOKMARK":
      return { ...state, bookmarks: state.bookmarks.filter((id) => id !== action.payload) }
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload }
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } }
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
