export default function RestaurantPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Restaurant Details - WhereShouldIEat
        </h1>
        <p className="text-gray-600 mb-6">Restaurant ID: {params.id}</p>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="h-64 bg-gray-300 flex items-center justify-center">
            <span className="text-6xl">🍽️</span>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">Sample Restaurant</h2>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 text-lg">⭐⭐⭐⭐⭐</span>
              <span className="ml-2 text-gray-600">4.8 (127 reviews)</span>
            </div>
            <p className="text-gray-700 mb-4">
              A hidden gem serving authentic cuisine with locally sourced ingredients. 
              This restaurant offers an intimate dining experience with exceptional service.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">Cuisine Type</h3>
                <p className="text-gray-600">Mediterranean</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Price Range</h3>
                <p className="text-gray-600">$$</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <span className="text-green-600">✅ Restaurant detail page working!</span>
        </div>
      </div>
    </div>
  )
}
