import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
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
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="font-medium transition-colors"
              style={{ color: isActive('/') ? '#2BB673' : '#1A1A1A' }}
              onMouseEnter={(e) => !isActive('/') && (e.target.style.color = '#2BB673')}
              onMouseLeave={(e) => !isActive('/') && (e.target.style.color = isActive('/') ? '#2BB673' : '#1A1A1A')}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className="font-medium transition-colors"
              style={{ color: isActive('/search') ? '#2BB673' : '#1A1A1A' }}
              onMouseEnter={(e) => !isActive('/search') && (e.target.style.color = '#2BB673')}
              onMouseLeave={(e) => !isActive('/search') && (e.target.style.color = isActive('/search') ? '#2BB673' : '#1A1A1A')}
            >
              Search Medicine
            </Link>
            <Link 
              to="/pharmacies" 
              className="font-medium transition-colors"
              style={{ color: isActive('/pharmacies') ? '#2BB673' : '#1A1A1A' }}
              onMouseEnter={(e) => !isActive('/pharmacies') && (e.target.style.color = '#2BB673')}
              onMouseLeave={(e) => !isActive('/pharmacies') && (e.target.style.color = isActive('/pharmacies') ? '#2BB673' : '#1A1A1A')}
            >
              Pharmacies
            </Link>
            <Link 
              to="/about" 
              className="font-medium transition-colors"
              style={{ color: isActive('/about') ? '#2BB673' : '#1A1A1A' }}
              onMouseEnter={(e) => !isActive('/about') && (e.target.style.color = '#2BB673')}
              onMouseLeave={(e) => !isActive('/about') && (e.target.style.color = isActive('/about') ? '#2BB673' : '#1A1A1A')}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="font-medium transition-colors"
              style={{ color: isActive('/contact') ? '#2BB673' : '#1A1A1A' }}
              onMouseEnter={(e) => !isActive('/contact') && (e.target.style.color = '#2BB673')}
              onMouseLeave={(e) => !isActive('/contact') && (e.target.style.color = isActive('/contact') ? '#2BB673' : '#1A1A1A')}
            >
              Contact
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="font-medium transition-colors px-4 py-2"
              style={{ color: '#1A1A1A' }}
              onMouseEnter={(e) => e.target.style.color = '#2BB673'}
              onMouseLeave={(e) => e.target.style.color = '#1A1A1A'}
            >
              Login
            </Link>
            <Link
              to="/register-pharmacy"
              className="text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
              style={{ backgroundColor: '#0B6B6B' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#095555'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#0B6B6B'}
            >
              Register Pharmacy
            </Link>
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
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
            <Link
              to="/"
              className="block px-3 py-2 rounded-md font-medium transition-colors"
              style={{ color: isActive('/') ? '#2BB673' : '#1A1A1A' }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#F6F8FA'; e.target.style.color = '#2BB673'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = isActive('/') ? '#2BB673' : '#1A1A1A'; }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/search"
              className="block px-3 py-2 rounded-md font-medium transition-colors"
              style={{ color: isActive('/search') ? '#2BB673' : '#1A1A1A' }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#F6F8FA'; e.target.style.color = '#2BB673'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = isActive('/search') ? '#2BB673' : '#1A1A1A'; }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Search Medicine
            </Link>
            <Link
              to="/pharmacies"
              className="block px-3 py-2 rounded-md font-medium transition-colors"
              style={{ color: isActive('/pharmacies') ? '#2BB673' : '#1A1A1A' }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#F6F8FA'; e.target.style.color = '#2BB673'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = isActive('/pharmacies') ? '#2BB673' : '#1A1A1A'; }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pharmacies
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md font-medium transition-colors"
              style={{ color: isActive('/about') ? '#2BB673' : '#1A1A1A' }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#F6F8FA'; e.target.style.color = '#2BB673'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = isActive('/about') ? '#2BB673' : '#1A1A1A'; }}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md font-medium transition-colors"
              style={{ color: isActive('/contact') ? '#2BB673' : '#1A1A1A' }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#F6F8FA'; e.target.style.color = '#2BB673'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = isActive('/contact') ? '#2BB673' : '#1A1A1A'; }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2 space-y-2 border-t border-gray-200">
              <Link
                to="/login"
                className="block w-full text-left px-3 py-2 rounded-md font-medium transition-colors"
                style={{ color: '#1A1A1A' }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#F6F8FA'; e.target.style.color = '#2BB673'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#1A1A1A'; }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register-pharmacy"
                className="block w-full text-white font-semibold px-3 py-2 rounded-md transition-colors duration-200 text-center"
                style={{ backgroundColor: '#0B6B6B' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#095555'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#0B6B6B'}
                onClick={() => setMobileMenuOpen(false)}
              >
                Register Pharmacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

