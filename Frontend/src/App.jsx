import React, { useState } from 'react'

const App = () => {
  const [medicineName, setMedicineName] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Searching for:', medicineName)
  }

  const handleRegister = () => {
    // TODO: Implement pharmacy registration
    console.log('Registering pharmacy')
  }

  const handleLogin = () => {
    // TODO: Implement login functionality
    console.log('Login clicked')
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F6F8FA' }}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg" style={{ backgroundColor: '#0B6B6B' }}>
                <svg
                  className="w-6 h-6 text-white"
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
              <span className="text-xl font-bold" style={{ color: '#2D2D49' }}>MedFinder Ethiopia</span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="font-medium transition-colors" style={{ color: '#1A1A1A' }} onMouseEnter={(e) => e.target.style.color = '#2BB673'} onMouseLeave={(e) => e.target.style.color = '#1A1A1A'}>
                Home
              </a>
              <a href="#search" className="font-medium transition-colors" style={{ color: '#1A1A1A' }} onMouseEnter={(e) => e.target.style.color = '#2BB673'} onMouseLeave={(e) => e.target.style.color = '#1A1A1A'}>
                Search Medicine
              </a>
              <a href="#pharmacies" className="font-medium transition-colors" style={{ color: '#1A1A1A' }} onMouseEnter={(e) => e.target.style.color = '#2BB673'} onMouseLeave={(e) => e.target.style.color = '#1A1A1A'}>
                Pharmacies
              </a>
              <a href="#about" className="font-medium transition-colors" style={{ color: '#1A1A1A' }} onMouseEnter={(e) => e.target.style.color = '#2BB673'} onMouseLeave={(e) => e.target.style.color = '#1A1A1A'}>
                About
              </a>
              <a href="#contact" className="font-medium transition-colors" style={{ color: '#1A1A1A' }} onMouseEnter={(e) => e.target.style.color = '#2BB673'} onMouseLeave={(e) => e.target.style.color = '#1A1A1A'}>
                Contact
              </a>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleLogin}
                className="font-medium transition-colors px-4 py-2"
                style={{ color: '#1A1A1A' }}
                onMouseEnter={(e) => e.target.style.color = '#2BB673'}
                onMouseLeave={(e) => e.target.style.color = '#1A1A1A'}
              >
                Login
              </button>
              <button
                onClick={handleRegister}
                className="text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
                style={{ backgroundColor: '#0B6B6B' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#095555'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#0B6B6B'}
              >
                Register Pharmacy
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 transition-colors"
              style={{ color: '#1A1A1A' }}
              onMouseEnter={(e) => e.target.style.color = '#2BB673'}
              onMouseLeave={(e) => e.target.style.color = '#1A1A1A'}
              onFocus={(e) => e.target.style.outline = `2px solid #0B6B6B`}
              onBlur={(e) => e.target.style.outline = 'none'}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-2 pt-2 pb-4 space-y-1 border-t border-gray-200">
              <a
                href="#home"
                className="block px-3 py-2 rounded-md font-medium transition-colors"
                style={{ color: '#1A1A1A' }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#F6F8FA'; e.target.style.color = '#2BB673'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#1A1A1A'; }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#search"
                className="block px-3 py-2 rounded-md font-medium transition-colors"
                style={{ color: '#1A1A1A' }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#F6F8FA'; e.target.style.color = '#2BB673'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#1A1A1A'; }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Search Medicine
              </a>
              <a
                href="#pharmacies"
                className="block px-3 py-2 rounded-md font-medium transition-colors"
                style={{ color: '#1A1A1A' }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#F6F8FA'; e.target.style.color = '#2BB673'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#1A1A1A'; }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Pharmacies
              </a>
              <a
                href="#about"
                className="block px-3 py-2 rounded-md font-medium transition-colors"
                style={{ color: '#1A1A1A' }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#F6F8FA'; e.target.style.color = '#2BB673'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#1A1A1A'; }}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 rounded-md font-medium transition-colors"
                style={{ color: '#1A1A1A' }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#F6F8FA'; e.target.style.color = '#2BB673'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#1A1A1A'; }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <div className="pt-2 space-y-2 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleLogin()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full text-left px-3 py-2 rounded-md font-medium transition-colors"
                  style={{ color: '#1A1A1A' }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = '#F6F8FA'; e.target.style.color = '#2BB673'; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#1A1A1A'; }}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    handleRegister()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full text-white font-semibold px-3 py-2 rounded-md transition-colors duration-200"
                  style={{ backgroundColor: '#0B6B6B' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#095555'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#0B6B6B'}
                >
                  Register Pharmacy
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white py-20 px-4">
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
          <div id="search" className="max-w-3xl mx-auto mb-8">
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
              onClick={handleRegister}
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
      <section id="pharmacies" className="py-12 px-4" style={{ backgroundColor: '#F6F8FA' }}>
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
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
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
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Search</h3>
              <p className="text-gray-600">
                Quickly find medicines with our powerful search engine that searches across all registered pharmacies
              </p>
            </div>

            {/* Nearby Pharmacies */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
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
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Nearby Pharmacies</h3>
              <p className="text-gray-600">
                Discover pharmacies close to you with real-time location tracking and distance calculations
              </p>
            </div>

            {/* Real-Time Availability */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
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
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-Time Availability</h3>
              <p className="text-gray-600">
                Get instant updates on medicine availability and stock status from pharmacies in real-time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Get in Touch
          </h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-600 mb-8">
              Have questions or need support? We're here to help you find the medicines you need.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
                <p className="text-gray-600">contact@medfinder.et</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
                <p className="text-gray-600">+251 XXX XXX XXX</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-gray-800 text-white py-12 px-4 mt-auto">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-green-400">MedFinder Ethiopia</h3>
              <p className="text-gray-400">
                Your trusted partner in finding essential medicines across Ethiopia. 
                Connecting patients with pharmacies nationwide.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-green-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-green-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#privacy" className="text-gray-400 hover:text-green-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} MedFinder Ethiopia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
