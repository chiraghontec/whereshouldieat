"use client"

import { RestaurantCard } from "../../components/ui/restaurant-card"

const sampleRestaurants = [
  {
    id: "1",
    name: "Sample Restaurant 1",
    cuisine: "Italian",
    priceRange: 2,
    rating: 4.5,
    reviewCount: 23,
    distance: 0.8,
    isHiddenGem: true,
    photos: ["/placeholder.svg?height=200&width=300"],
    address: "123 Main St"
  },
  {
    id: "2", 
    name: "Sample Restaurant 2",
    cuisine: "Mexican",
    priceRange: 1,
    rating: 4.8,
    reviewCount: 45,
    distance: 1.2,
    isHiddenGem: false,
    photos: ["/placeholder.svg?height=200&width=300"],
    address: "456 Oak Ave"
  }
]

export default function Search() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Search Restaurants - WhereShouldIEat
        </h1>
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="Search for restaurants, dishes, or cuisine..." 
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
            />
            <button className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700">
              Search
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              isBookmarked={false}
              onBookmarkToggle={(id) => console.log('Bookmark toggled for', id)}
            />
          ))}
        </div>
        <div className="mt-6 text-center">
          <span className="text-green-600">✅ Search page working!</span>
        </div>
      </div>
    </div>
  )
}
