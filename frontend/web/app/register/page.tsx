export default function Register() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Join WhereShouldIEat</h1>
          <p className="text-gray-600">Discover amazing hidden restaurants</p>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="Create a password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700"
          >
            Create Account
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <a href="/login" className="text-orange-600 hover:text-orange-700">Sign in</a>
        </div>
        
        <div className="mt-6 text-center">
          <span className="text-green-600">✅ Register page working!</span>
        </div>
      </div>
    </div>
  )
}
