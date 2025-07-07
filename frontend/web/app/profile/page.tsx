export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          User Profile - WhereShouldIEat
        </h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-gray-600">Food Enthusiast</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded">
              <div className="text-2xl font-bold text-orange-600">12</div>
              <div className="text-gray-600">Reviews</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded">
              <div className="text-2xl font-bold text-orange-600">8</div>
              <div className="text-gray-600">Bookmarks</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded">
              <div className="text-2xl font-bold text-orange-600">5</div>
              <div className="text-gray-600">Hidden Gems Found</div>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <span className="text-green-600">✅ Profile page working!</span>
        </div>
      </div>
    </div>
  )
}
