"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/ui/star-rating"
import { Search, Utensils, Target, Check, Play, Star } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Utensils className="w-8 h-8 text-orange-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">WhereShouldIEat</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-orange-600">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-orange-600">
                How It Works
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-orange-600">
                Pricing
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-bold text-3xl md:text-5xl text-gray-900 mb-6 leading-tight">
                Discover Hidden Culinary Gems Your Taste Buds Have Been Searching For
              </h1>
              <p className="font-normal text-base md:text-lg text-gray-600 mb-8">
                Stop wasting money on disappointing restaurants. WhereShouldIEat reveals the underrated local favorites that
                food enthusiasts actually love.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Find Hidden Gems Near Me
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  <Play className="w-5 h-5 mr-2" />
                  Watch 2-Min Demo
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <span>10,000+ hidden gems discovered</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8/5 rating</span>
                </div>
                <span>Featured in TechCrunch</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🍽️</div>
                  <p className="text-gray-600">Discover amazing restaurants</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-4">Why WhereShouldIEat Finds Better Restaurants</h2>
            <p className="font-normal text-lg text-gray-600 max-w-3xl mx-auto">
              Our unique algorithm doesn't just show you popular places. We find the hidden gems that locals love but
              tourists miss.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-xl text-gray-900 mb-2">Smart Discovery</h3>
              <p className="text-gray-600">
                Our AI analyzes reviews, social signals, and local dining patterns to find restaurants that deserve more
                attention.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-xl text-gray-900 mb-2">Perfect Matches</h3>
              <p className="text-gray-600">
                Get personalized recommendations based on your taste preferences, dietary needs, and dining style.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-xl text-gray-900 mb-2">Verified Quality</h3>
              <p className="text-gray-600">
                Every recommendation is backed by real diner experiences and our proprietary quality scoring system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bold text-3xl md:text-4xl text-white mb-4">
            Ready to Stop Wasting Money on Bad Restaurants?
          </h2>
          <p className="font-normal text-lg text-orange-100 mb-8">
            Join thousands of food lovers who've discovered their new favorite spots with WhereShouldIEat.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-50">
              Start Discovering Hidden Gems
            </Button>
          </Link>
          <div className="mt-6 text-center">
            <span className="text-green-600">✅ Landing page working!</span>
          </div>
        </div>
      </section>
    </div>
  )
}
