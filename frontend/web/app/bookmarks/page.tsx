"use client"

import { RestaurantCard } from "../../components/ui/restaurant-card"

const bookmarkedRestaurants = [
  {
    id: "1",
    name: "Hidden Gem Bistro",
    cuisine: "Italian",
    priceRange: 3,
    rating: 4.8,
    reviewCount: 23,
    distance: 0.5,
    isHiddenGem: true,
    photos: ["/placeholder.svg?height=200&width=300"],
    address: "789 Elm St"
  },
  {
    id: "2",
    name: "Local Flavor",
    cuisine: "Farm-to-table",
    priceRange: 2,
    rating: 4.9,
    reviewCount: 15,
    distance: 1.1,
    isHiddenGem: true,
    photos: ["/placeholder.svg?height=200&width=300"],
    address: "321 Pine Ave"
  }
]

export default function Bookmarks() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Saved Restaurants - WhereShouldIEat
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookmarkedRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              isBookmarked={true}
              onBookmarkToggle={(id) => console.log('Bookmark removed for', id)}
            />
          ))}
        </div>
        <div className="mt-6 text-center">
          <span className="text-green-600">✅ Bookmarks page working!</span>
        </div>
      </div>
    </div>
  )
}
