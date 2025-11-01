import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const DashboardLayout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  // Mock pharmacy data
  const pharmacyName = 'Central Pharmacy'

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/dashboard/medicines', label: 'Medicines', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
    { path: '/dashboard/add-medicine', label: 'Add Medicine', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
    { path: '/dashboard/profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ]

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    // In a real app, this would clear authentication tokens
    navigate('/')
    setShowLogoutModal(false)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F6F8FA' }}>
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full transition-all duration-300 z-30 ${sidebarOpen ? 'w-64' : 'w-20'}`} style={{ backgroundColor: '#0B6B6B' }}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-white font-bold text-lg">MedFinder</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="cursor-pointer p-2 rounded-lg hover:bg-white text-white hover:text-black hover:bg-opacity-10 transition-colors"
            >
              <svg className="w-5 h-5 hover:text-black " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-white bg-opacity-20 text-black'
                    : 'text-white text-opacity-70 hover:bg-white hover:bg-opacity-10 hover:text-black'
                }`}
                title={!sidebarOpen ? item.label : ''}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-white text-opacity-70 hover:bg-white hover:bg-opacity-10 hover:text-black transition-colors"
              title={!sidebarOpen ? 'Logout' : ''}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Navbar */}
        <nav className="sticky top-0 z-20 bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold" style={{ color: '#2D2D49' }}>
                Pharmacy Dashboard
              </h2>
            </div>

            {/* Profile Section */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0B6B6B', color: 'white' }}>
                  {pharmacyName.charAt(0)}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-semibold" style={{ color: '#2D2D49' }}>{pharmacyName}</p>
                  <p className="text-xs" style={{ color: '#1A1A1A' }}>Pharmacy</p>
                </div>
                <svg className="w-4 h-4" style={{ color: '#1A1A1A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                    style={{ color: '#1A1A1A' }}
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Profile Settings</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false)
                      setShowLogoutModal(true)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                    style={{ color: '#1A1A1A' }}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4" style={{ color: '#2D2D49' }}>
              Confirm Logout
            </h3>
            <p className="mb-6" style={{ color: '#1A1A1A' }}>
              Are you sure you want to log out?
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleLogout}
                className="flex-1 py-2 px-4 rounded-lg font-semibold transition-colors"
                style={{ 
                  backgroundColor: '#0B6B6B',
                  color: 'white'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#095555'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#0B6B6B'}
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2 px-4 rounded-lg font-semibold border-2 transition-colors"
                style={{ 
                  borderColor: '#E5E7EB',
                  color: '#1A1A1A',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#F6F8FA'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {showProfileDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileDropdown(false)}
        ></div>
      )}
    </div>
  )
}

export default DashboardLayout

