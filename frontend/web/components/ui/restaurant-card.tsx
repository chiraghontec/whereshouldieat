"use client"
import Image from "next/image"
import Link from "next/link"
import { Heart, MapPin, Gem } from "lucide-react"
import { StarRating } from "./star-rating"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface RestaurantCardProps {
  restaurant: {
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
  }
  isBookmarked?: boolean
  onBookmarkToggle?: (id: string) => void
  className?: string
}

export function RestaurantCard({ restaurant, isBookmarked = false, onBookmarkToggle, className }: RestaurantCardProps) {
  const priceSymbols = "$".repeat(restaurant.priceRange)

  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden",
        className,
      )}
    >
      <div className="relative">
        <Image
          src={restaurant.photos[0] || "/placeholder.svg?height=200&width=300"}
          alt={restaurant.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        {restaurant.isHiddenGem && (
          <div className="absolute top-3 left-3 bg-accent-gold text-dark px-2 py-1 rounded-lg text-sm font-bold flex items-center gap-1">
            <Gem className="w-4 h-4" />
            Hidden Gem
          </div>
        )}
        <button
          onClick={() => onBookmarkToggle?.(restaurant.id)}
          className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <Heart className={cn("w-5 h-5", isBookmarked ? "fill-red-500 text-red-500" : "text-gray-600")} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-dark line-clamp-1">{restaurant.name}</h3>
          <span className="text-primary-orange font-bold">{priceSymbols}</span>
        </div>

        <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>

        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={restaurant.rating} size="sm" />
          <span className="text-sm text-gray-600">
            {restaurant.rating} ({restaurant.reviewCount} reviews)
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{restaurant.distance} miles away</span>
        </div>

        <Link href={`/restaurant/${restaurant.id}`}>
          <Button variant="outline" className="w-full bg-transparent">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  )
}
