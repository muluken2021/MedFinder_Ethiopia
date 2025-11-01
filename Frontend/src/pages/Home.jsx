import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [medicineName, setMedicineName] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (medicineName.trim()) {
      navigate(`/search?q=${encodeURIComponent(medicineName)}`)
    } else {
      navigate('/search')
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Medicine Fast — Anywhere in Ethiopia
            </h1>
            <p className="text-xl md:text-2xl mb-8" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Your trusted partner in finding essential medicines across Ethiopia
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4 bg-white rounded-lg shadow-2xl p-2">
              <input
                type="text"
                placeholder="Enter medicine name"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                className="flex-1 px-6 py-4 rounded-lg border-none outline-none text-lg"
                style={{ color: '#1A1A1A' }}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 whitespace-nowrap"
                style={{ backgroundColor: '#0B6B6B' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#095555'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#0B6B6B'}
              >
                Search Medicine
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register-pharmacy')}
              className="bg-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg"
              style={{ color: '#0B6B6B' }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#F6F8FA'; e.target.style.color = '#095555'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#0B6B6B'; }}
            >
              Register Pharmacy
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-64 h-64 bg-green-500 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-green-400 opacity-10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Map Preview Section */}
      <section className="py-12 px-4" style={{ backgroundColor: '#F6F8FA' }}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#2D2D49' }}>
            Find Pharmacies Near You
          </h2>
          <div className="bg-gray-200 rounded-lg shadow-lg overflow-hidden h-96 relative">
            {/* Map placeholder */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-center">
                <svg
                  className="w-24 h-24 mx-auto text-blue-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-lg font-medium" style={{ color: '#1A1A1A' }}>
                  Interactive Map - Nearby Pharmacies
                </p>
                <p className="text-sm mt-2" style={{ color: '#1A1A1A' }}>
                  Location services will show pharmacies in your area
                </p>
              </div>
              
              {/* Mock pharmacy markers */}
              <div className="absolute top-20 left-20 w-4 h-4 rounded-full shadow-lg animate-pulse" style={{ backgroundColor: '#2BB673' }}></div>
              <div className="absolute top-32 right-32 w-4 h-4 rounded-full shadow-lg animate-pulse" style={{ backgroundColor: '#2BB673' }}></div>
              <div className="absolute bottom-24 left-1/3 w-4 h-4 rounded-full shadow-lg animate-pulse" style={{ backgroundColor: '#2BB673' }}></div>
              <div className="absolute bottom-32 right-1/4 w-4 h-4 rounded-full shadow-lg animate-pulse" style={{ backgroundColor: '#2BB673' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4" style={{ backgroundColor: '#F6F8FA' }}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#2D2D49' }}>
            Why Choose MedFinder?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fast Search */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(43, 182, 115, 0.1)' }}>
                <svg
                  className="w-8 h-8"
                  style={{ color: '#2BB673' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#2D2D49' }}>Fast Search</h3>
              <p style={{ color: '#1A1A1A' }}>
                Quickly find medicines with our powerful search engine that searches across all registered pharmacies
              </p>
            </div>

            {/* Nearby Pharmacies */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(43, 182, 115, 0.1)' }}>
                <svg
                  className="w-8 h-8"
                  style={{ color: '#2BB673' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#2D2D49' }}>Nearby Pharmacies</h3>
              <p style={{ color: '#1A1A1A' }}>
                Discover pharmacies close to you with real-time location tracking and distance calculations
              </p>
            </div>

            {/* Real-Time Availability */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(43, 182, 115, 0.1)' }}>
                <svg
                  className="w-8 h-8"
                  style={{ color: '#2BB673' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#2D2D49' }}>Real-Time Availability</h3>
              <p style={{ color: '#1A1A1A' }}>
                Get instant updates on medicine availability and stock status from pharmacies in real-time
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home

