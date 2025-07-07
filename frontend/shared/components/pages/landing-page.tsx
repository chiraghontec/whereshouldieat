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
              <Utensils className="w-8 h-8 text-primary-orange mr-2" />
              <span className="text-2xl font-bold text-dark">WhereShouldIEat</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary-orange">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-primary-orange">
                How It Works
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-primary-orange">
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
      <section className="bg-gradient-to-br from-neutral-light to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-bold text-3xl md:text-5xl text-dark mb-6 leading-tight">
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
                  <Star className="w-4 h-4 fill-accent-gold text-accent-gold" />
                  <span>4.8/5 rating</span>
                </div>
                <span>Featured in TechCrunch</span>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Food collage"
                width={600}
                height={500}
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-3xl md:text-4xl text-dark mb-4">Why WhereShouldIEat Finds Better Restaurants</h2>
            <p className="font-normal text-lg text-gray-600 max-w-3xl mx-auto">
              Our unique algorithm doesn't just show you popular places. We find the hidden gems that locals love but
              tourists miss.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-orange/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary-orange" />
              </div>
              <h3 className="font-bold text-xl mb-3">🔍 Hidden Gem Algorithm</h3>
              <p className="text-gray-600">
                Find restaurants with high ratings but low review counts - the true local favorites that haven't been
                discovered by the masses yet.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-secondary-green" />
              </div>
              <h3 className="font-bold text-xl mb-3">🍜 Dish-Level Search</h3>
              <p className="text-gray-600">
                Search for specific dishes like 'best ramen' not just cuisine types. Find exactly what you're craving.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-accent-gold" />
              </div>
              <h3 className="font-bold text-xl mb-3">🥗 Dietary Intelligence</h3>
              <p className="text-gray-600">
                Filter by vegan, gluten-free, keto with menu-level accuracy. No more calling restaurants to ask about
                ingredients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-neutral-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-3xl md:text-4xl text-dark mb-4">How It Works</h2>
            <p className="font-normal text-lg text-gray-600">
              Three simple steps to discover your next favorite restaurant
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-orange text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-bold text-xl mb-3">🎯 Tell Us Your Taste</h3>
              <p className="text-gray-600">
                Share your preferences, dietary needs, and favorite cuisines so we can personalize your recommendations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary-orange text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-bold text-xl mb-3">🔍 Discover Hidden Gems</h3>
              <p className="text-gray-600">
                Our algorithm finds restaurants with amazing food but fewer reviews - the local favorites you've been
                missing.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary-orange text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-bold text-xl mb-3">🍽️ Eat Amazing Food</h3>
              <p className="text-gray-600">
                Enjoy incredible meals at places you never would have found otherwise. Share your discoveries with
                fellow foodies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-3xl md:text-4xl text-dark mb-4">What Food Lovers Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-neutral-light p-6 rounded-xl">
              <StarRating rating={5} className="mb-4" />
              <p className="text-gray-600 mb-4">
                "WhereShouldIEat helped me discover this incredible Thai place that's been in my neighborhood for years. Best
                pad thai I've ever had!"
              </p>
              <div className="flex items-center">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Sarah Chen"
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
                <div>
                  <p className="font-bold text-dark">Sarah Chen</p>
                  <p className="text-sm text-gray-600">San Francisco, CA</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-light p-6 rounded-xl">
              <StarRating rating={5} className="mb-4" />
              <p className="text-gray-600 mb-4">
                "As someone with celiac disease, finding truly gluten-free restaurants was impossible. WhereShouldIEat's
                dietary filters are a game-changer."
              </p>
              <div className="flex items-center">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Mike Rodriguez"
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
                <div>
                  <p className="font-bold text-dark">Mike Rodriguez</p>
                  <p className="text-sm text-gray-600">Austin, TX</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-light p-6 rounded-xl">
              <StarRating rating={5} className="mb-4" />
              <p className="text-gray-600 mb-4">
                "I've found 12 new favorite restaurants in the past month. WhereShouldIEat knows my taste better than I do!"
              </p>
              <div className="flex items-center">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Emily Johnson"
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
                <div>
                  <p className="font-bold text-dark">Emily Johnson</p>
                  <p className="text-sm text-gray-600">New York, NY</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-neutral-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-3xl md:text-4xl text-dark mb-4">Simple, Transparent Pricing</h2>
            <p className="font-normal text-lg text-gray-600">
              Start free, upgrade when you're ready to discover even more hidden gems
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="font-bold text-2xl text-dark mb-2">Explorer</h3>
              <p className="text-gray-600 mb-4">Perfect for casual food discovery</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-dark">Free</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-secondary-green mr-3" />
                  <span>5 hidden gem discoveries per month</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-secondary-green mr-3" />
                  <span>Basic dietary filters</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-secondary-green mr-3" />
                  <span>Restaurant reviews and photos</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-secondary-green mr-3" />
                  <span>Save favorite restaurants</span>
                </li>
              </ul>
              <Link href="/register">
                <Button variant="outline" className="w-full bg-transparent">
                  Start Free Trial
                </Button>
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border-2 border-primary-orange relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-orange text-white px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="font-bold text-2xl text-dark mb-2">Food Enthusiast</h3>
              <p className="text-gray-600 mb-4">For serious food discoverers</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-dark">$9.99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-secondary-green mr-3" />
                  <span>Unlimited hidden gem discoveries</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-secondary-green mr-3" />
                  <span>Advanced dietary intelligence</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-secondary-green mr-3" />
                  <span>Dish-level search</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-secondary-green mr-3" />
                  <span>Priority customer support</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-secondary-green mr-3" />
                  <span>Early access to new features</span>
                </li>
              </ul>
              <Link href="/register">
                <Button className="w-full">Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Utensils className="w-8 h-8 text-primary-orange mr-2" />
                <span className="text-2xl font-bold">WhereShouldIEat</span>
              </div>
              <p className="text-gray-400">Discover hidden culinary gems your taste buds have been searching for.</p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WhereShouldIEat. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
