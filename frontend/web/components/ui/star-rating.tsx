"use client"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  interactive?: boolean
  onRatingChange?: (rating: number) => void
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
}: StarRatingProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1
        const isFilled = starValue <= rating
        const isHalfFilled = starValue - 0.5 <= rating && starValue > rating

        return (
          <button
            key={index}
            className={cn(
              "relative",
              interactive && "hover:scale-110 transition-transform cursor-pointer",
              !interactive && "cursor-default",
            )}
            onClick={() => interactive && onRatingChange?.(starValue)}
            disabled={!interactive}
          >
            <Star className={cn(sizes[size], isFilled ? "fill-accent-gold text-accent-gold" : "text-gray-300")} />
            {isHalfFilled && (
              <Star
                className={cn(sizes[size], "absolute top-0 left-0 fill-accent-gold text-accent-gold")}
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
