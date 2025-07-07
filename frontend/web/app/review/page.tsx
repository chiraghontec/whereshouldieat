export default function Review() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Write a Review - WhereShouldIEat
        </h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Restaurant Name
              </label>
              <input 
                type="text" 
                placeholder="Enter restaurant name" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex space-x-1">
                {[1,2,3,4,5].map(star => (
                  <span key={star} className="text-2xl text-yellow-400 cursor-pointer">⭐</span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea 
                rows={4}
                placeholder="Share your experience..." 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700">
              Submit Review
            </button>
          </div>
        </div>
        <div className="mt-6 text-center">
          <span className="text-green-600">✅ Review page working!</span>
        </div>
      </div>
    </div>
  )
}
