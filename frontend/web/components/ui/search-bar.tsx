"use client"

import type React from "react"
import { useState } from "react"
import { Search, Filter, MapPin } from "lucide-react"
import { Button } from "./button"

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  onFilterClick?: () => void
  location?: string
  onLocationChange?: () => void
}

export function SearchBar({
  placeholder = "Search restaurants or dishes...",
  onSearch,
  onFilterClick,
  location,
  onLocationChange,
}: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {location && (
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600">{location}</span>
          <button onClick={onLocationChange} className="text-sm text-primary-orange hover:underline">
            (Change)
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
          />
        </div>

        <Button type="submit" size="lg">
          Search
        </Button>

        {onFilterClick && (
          <Button type="button" variant="outline" size="lg" onClick={onFilterClick}>
            <Filter className="w-5 h-5" />
          </Button>
        )}
      </form>
    </div>
  )
}
