"use client"

import { useState } from "react"
import { SearchBar } from "@/components/ui/search-bar"
import { RestaurantCard } from "@/components/ui/restaurant-card"
import { Button } from "@/components/ui/button"
import { Bell, User, Grid, List, MapPin, Filter } from "lucide-react"
import Link from "next/link"

// Sample data
const SAMPLE_RESTAURANTS = [
  {
    id: "1",
    name: "Nonna's Hidden Kitchen",
    cuisine: "Italian",
    priceRange: 2,
    rating: 4.5,
    reviewCount: 23,
    distance: 0.8,
    isHiddenGem: true,
    photos: ["/placeholder.svg?height=200&width=300"],
    address: "1247 Grant Ave, San Francisco, CA",
  },
  {
    id: "2",
    name: "Spice Garden",
    cuisine: "Thai",
    priceRange: 1,
    rating: 4.7,
    reviewCount: 156,
    distance: 1.2,
    isHiddenGem: false,
    photos: ["/placeholder.svg?height=200&width=300"],
    address: "892 Mission St, San Francisco, CA",
  },
  {
    id: "3",
    name: "The Quiet Corner",
    cuisine: "French",
    priceRange: 3,
    rating: 4.8,
    reviewCount: 34,
    distance: 2.1,
    isHiddenGem: true,
    photos: ["/placeholder.svg?height=200&width=300"],
    address: "456 Valencia St, San Francisco, CA",
  },
]

const QUICK_FILTERS = ["Hidden Gems", "Open Now", "Under $20", "Vegan", "Gluten-Free", "Date Night"]

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeFilters, setActiveFilters] = useState<string[]>(["Hidden Gems"])
  const [distance, setDistance] = useState(5)

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-dark">FoodieFind</span>
            </Link>

            <div className="flex-1 max-w-2xl mx-8">
              <SearchBar
                placeholder="Search restaurants or dishes..."
                location="📍 San Francisco, CA"
                onLocationChange={() => console.log("Change location")}
              />
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Filter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Link href="/profile">
                <Button variant="ghost" size="sm">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3 mb-4">
            {QUICK_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilters.includes(filter)
                    ? "bg-primary-orange text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Distance Slider */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-dark">Distance</label>
              <span className="text-sm text-gray-600">Within {distance} miles</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              value={distance}
              onChange={(e) => setDistance(Number.parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 mi</span>
              <span>25 mi</span>
            </div>
          </div>
        </div>

        {/* View Toggle and Results Count */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-dark mb-1">Restaurants Near You</h1>
            <p className="text-gray-600">{SAMPLE_RESTAURANTS.length} restaurants found</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${
                viewMode === "grid" ? "bg-primary-orange text-white" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${
                viewMode === "list" ? "bg-primary-orange text-white" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            <Link href="/map">
              <Button variant="outline" size="sm">
                <MapPin className="w-4 h-4 mr-2" />
                Map View
              </Button>
            </Link>
          </div>
        </div>

        {/* Restaurant Results */}
        <div
          className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
        >
          {SAMPLE_RESTAURANTS.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              isBookmarked={false}
              onBookmarkToggle={(id) => console.log("Toggle bookmark:", id)}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Restaurants
          </Button>
        </div>
      </div>
    </div>
  )
}
