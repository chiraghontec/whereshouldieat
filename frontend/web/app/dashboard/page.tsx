export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Your Food Discovery Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's new in your culinary journey.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Restaurants Discovered</h3>
            <div className="text-3xl font-bold text-orange-600">23</div>
            <p className="text-gray-600 text-sm">+3 this week</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reviews Written</h3>
            <div className="text-3xl font-bold text-orange-600">12</div>
            <p className="text-gray-600 text-sm">+1 this week</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hidden Gems Found</h3>
            <div className="text-3xl font-bold text-orange-600">7</div>
            <p className="text-gray-600 text-sm">+2 this week</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Discoveries</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <h4 className="font-medium">Hidden Gem Bistro</h4>
                  <p className="text-sm text-gray-600">Italian • $$</p>
                </div>
                <span className="text-orange-600">★ 4.8</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <h4 className="font-medium">Local Flavor</h4>
                  <p className="text-sm text-gray-600">Farm-to-table • $$$</p>
                </div>
                <span className="text-orange-600">★ 4.9</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Personalized Recommendations</h2>
            <div className="space-y-3">
              <div className="p-3 bg-orange-50 rounded">
                <h4 className="font-medium">Spice Garden</h4>
                <p className="text-sm text-gray-600">Based on your love for Thai food</p>
              </div>
              <div className="p-3 bg-orange-50 rounded">
                <h4 className="font-medium">The Corner Café</h4>
                <p className="text-sm text-gray-600">Perfect for your brunch preferences</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <span className="text-green-600">✅ Dashboard page working!</span>
        </div>
      </div>
    </div>
  )
}
