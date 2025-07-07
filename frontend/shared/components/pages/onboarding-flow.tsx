"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Utensils } from "lucide-react"

const STEPS = ["Location Setup", "Taste Preferences", "Favorite Cuisines", "Price Range"]

const CUISINES = [
  "Italian",
  "Thai",
  "Mexican",
  "Indian",
  "Chinese",
  "Japanese",
  "French",
  "Mediterranean",
  "Korean",
  "Vietnamese",
  "American",
  "Greek",
  "Spanish",
  "Lebanese",
  "Ethiopian",
  "Peruvian",
]

const DIETARY_OPTIONS = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Halal",
  "Kosher",
  "Keto",
  "Paleo",
  "Dairy-Free",
  "Nut-Free",
]

const PRICE_LEVELS = [
  { level: 1, symbol: "$", range: "$10-15", description: "Budget-friendly" },
  { level: 2, symbol: "$$", range: "$15-25", description: "Moderate" },
  { level: 3, symbol: "$$$", range: "$25-40", description: "Upscale" },
  { level: 4, symbol: "$$$$", range: "$40+", description: "Fine dining" },
]

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    location: "",
    spiceLevel: 3,
    dietaryPreferences: [] as string[],
    favoriteCuisines: [] as string[],
    priceRange: 2,
  })

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      console.log("Onboarding complete:", formData)
      // Redirect to dashboard
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleDietaryPreference = (preference: string) => {
    setFormData((prev) => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(preference)
        ? prev.dietaryPreferences.filter((p) => p !== preference)
        : [...prev.dietaryPreferences, preference],
    }))
  }

  const toggleCuisine = (cuisine: string) => {
    setFormData((prev) => ({
      ...prev,
      favoriteCuisines: prev.favoriteCuisines.includes(cuisine)
        ? prev.favoriteCuisines.filter((c) => c !== cuisine)
        : [...prev.favoriteCuisines, cuisine],
    }))
  }

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          setFormData((prev) => ({ ...prev, location: "Current Location" }))
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-primary-orange mx-auto mb-4" />
              <h2 className="font-bold text-3xl text-dark mb-2">Where are you located?</h2>
              <p className="text-gray-600">We'll help you find hidden gems nearby</p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="Enter your city or address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
              />

              <Button variant="outline" className="w-full bg-transparent" onClick={useCurrentLocation}>
                <Navigation className="w-5 h-5 mr-2" />
                Use Current Location
              </Button>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌶️</span>
              </div>
              <h2 className="font-bold text-3xl text-dark mb-2">Let's personalize your food discovery</h2>
              <p className="text-gray-600">Tell us about your taste preferences</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-dark mb-4">
                  Spice Level: {["Mild", "Medium", "Spicy", "Hot", "Fire"][formData.spiceLevel - 1]}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.spiceLevel}
                  onChange={(e) => setFormData((prev) => ({ ...prev, spiceLevel: Number.parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Mild</span>
                  <span>Fire</span>
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-dark mb-4">Dietary Preferences</label>
                <div className="grid grid-cols-2 gap-3">
                  {DIETARY_OPTIONS.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleDietaryPreference(option)}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        formData.dietaryPreferences.includes(option)
                          ? "border-primary-orange bg-primary-orange/10 text-primary-orange"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Utensils className="w-16 h-16 text-primary-orange mx-auto mb-4" />
              <h2 className="font-bold text-3xl text-dark mb-2">Pick your favorite cuisines</h2>
              <p className="text-gray-600">Select 3-5 cuisines you love most</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {CUISINES.map((cuisine) => (
                <button
                  key={cuisine}
                  onClick={() => toggleCuisine(cuisine)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formData.favoriteCuisines.includes(cuisine)
                      ? "border-primary-orange bg-primary-orange/10 text-primary-orange"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-gray-600">Selected: {formData.favoriteCuisines.length} cuisines</p>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h2 className="font-bold text-3xl text-dark mb-2">What's your typical spending per meal?</h2>
              <p className="text-gray-600">This helps us recommend restaurants in your budget</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {PRICE_LEVELS.map((price) => (
                <button
                  key={price.level}
                  onClick={() => setFormData((prev) => ({ ...prev, priceRange: price.level }))}
                  className={`p-6 rounded-xl border-2 transition-colors text-left ${
                    formData.priceRange === price.level
                      ? "border-primary-orange bg-primary-orange/10"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="text-2xl font-bold text-primary-orange mb-2">{price.symbol}</div>
                  <div className="font-medium text-dark mb-1">{price.range}</div>
                  <div className="text-sm text-gray-600">{price.description}</div>
                </button>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-neutral-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {STEPS.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(((currentStep + 1) / STEPS.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-orange h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-md p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={currentStep === 0 ? "invisible" : ""}
            >
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 0 && !formData.location) || (currentStep === 2 && formData.favoriteCuisines.length < 3)
              }
            >
              {currentStep === STEPS.length - 1 ? "Complete Setup" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
