import { useState } from 'react'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Packages from './pages/Packages'
import Bookings from './pages/Bookings'
import Payments from './pages/Payments'
import Reviews from './pages/Reviews'
import Enquiries from './pages/Enquiries'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'auth':
        return <Auth />
      case 'packages':
        return <Packages />
      case 'bookings':
        return <Bookings />
      case 'payments':
        return <Payments />
      case 'reviews':
        return <Reviews />
      case 'enquiries':
        return <Enquiries />
      default:
        return <Home />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center flex-wrap gap-4">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-2xl font-bold hover:opacity-80 transition"
          >
            🌍 TravelMaster
          </button>

          <div className="flex gap-2 flex-wrap justify-center">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === 'home' ? 'bg-white text-blue-600' : 'hover:bg-blue-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('packages')}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === 'packages' ? 'bg-white text-blue-600' : 'hover:bg-blue-700'
              }`}
            >
              📦 Packages
            </button>
            <button
              onClick={() => setCurrentPage('bookings')}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === 'bookings' ? 'bg-white text-blue-600' : 'hover:bg-blue-700'
              }`}
            >
              📋 Bookings
            </button>
            <button
              onClick={() => setCurrentPage('payments')}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === 'payments' ? 'bg-white text-blue-600' : 'hover:bg-blue-700'
              }`}
            >
              💳 Payments
            </button>
            <button
              onClick={() => setCurrentPage('reviews')}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === 'reviews' ? 'bg-white text-blue-600' : 'hover:bg-blue-700'
              }`}
            >
              ⭐ Reviews
            </button>
            <button
              onClick={() => setCurrentPage('enquiries')}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === 'enquiries' ? 'bg-white text-blue-600' : 'hover:bg-blue-700'
              }`}
            >
              💬 Enquiries
            </button>
            <button
              onClick={() => setCurrentPage('auth')}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === 'auth' ? 'bg-white text-blue-600' : 'hover:bg-blue-700'
              }`}
            >
              🔐 Auth
            </button>
          </div>

          {user && (
            <div className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded">
              👤 {user.name}
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <div>
        {renderPage()}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-12">
        <p className="text-sm">🌄 TravelMaster API Backend Demo | Full-Stack Travel Booking Platform</p>
        <p className="text-xs text-gray-400 mt-2">Backend: localhost:5000 | Frontend: localhost:5173</p>
      </footer>
    </div>
  )
}

export default App