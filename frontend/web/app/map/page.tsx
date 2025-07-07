export default function Map() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Restaurant Map - WhereShouldIEat
        </h1>
        <div className="bg-white rounded-lg shadow h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <h2 className="text-xl font-semibold text-gray-700">Interactive Map</h2>
            <p className="text-gray-600">Discover restaurants near you</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <span className="text-green-600">✅ Map page working!</span>
        </div>
      </div>
    </div>
  )
}
