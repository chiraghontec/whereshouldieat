export default function Onboarding() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Welcome to WhereShouldIEat! 🍽️
        </h1>
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="font-semibold">Discover Hidden Gems</h3>
            <p className="text-gray-600 text-sm">Find underrated restaurants that locals love</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">⭐</div>
            <h3 className="font-semibold">Share Your Experience</h3>
            <p className="text-gray-600 text-sm">Help others discover great food</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <h3 className="font-semibold">Explore Your Area</h3>
            <p className="text-gray-600 text-sm">Find restaurants near you</p>
          </div>
          <button className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700">
            Get Started
          </button>
        </div>
        <div className="mt-4 text-center">
          <span className="text-green-600">✅ Onboarding page working!</span>
        </div>
      </div>
    </div>
  )
}
