import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const SearchMedicine = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [medicineName, setMedicineName] = useState(searchParams.get('q') || '')
  const [city, setCity] = useState('')
  const [availability, setAvailability] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'map'

  // Mock search results
  const mockResults = [
    {
      id: 1,
      pharmacyName: 'Central Pharmacy',
      address: 'Bole Road, Addis Ababa',
      price: '250 ETB',
      available: true,
      distance: '0.8 km',
      lat: 9.0054,
      lng: 38.7636
    },
    {
      id: 2,
      pharmacyName: 'MedCare Pharmacy',
      address: 'Meskel Square, Addis Ababa',
      price: '280 ETB',
      available: true,
      distance: '1.2 km',
      lat: 9.0121,
      lng: 38.7505
    },
    {
      id: 3,
      pharmacyName: 'Health Plus Pharmacy',
      address: 'Piazza, Addis Ababa',
      price: '230 ETB',
      available: false,
      distance: '2.5 km',
      lat: 9.0240,
      lng: 38.7489
    },
    {
      id: 4,
      pharmacyName: 'City Pharmacy',
      address: 'CMC Road, Addis Ababa',
      price: '260 ETB',
      available: true,
      distance: '1.8 km',
      lat: 9.0167,
      lng: 38.7856
    },
  ]

  const handleSearch = () => {
    // In a real app, this would trigger an API call
    setSearchParams({ q: medicineName })
  }

  const handleGetDirections = (pharmacy) => {
    // In a real app, this would open Google Maps with the pharmacy location
    const url = `https://www.google.com/maps/search/?api=1&query=${pharmacy.lat},${pharmacy.lng}`
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: '#F6F8FA' }}>
      <div className="container mx-auto max-w-7xl">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="Enter medicine name..."
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                className="flex-1 px-6 py-3 rounded-lg border-2 outline-none text-lg"
                style={{ 
                  color: '#1A1A1A',
                  borderColor: '#E5E7EB'
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 whitespace-nowrap"
                style={{ backgroundColor: '#0B6B6B' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#095555'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#0B6B6B'}
              >
                Search
              </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="px-4 py-3 rounded-lg border-2 outline-none"
                style={{ 
                  color: '#1A1A1A',
                  borderColor: '#E5E7EB',
                  backgroundColor: 'white'
                }}
              >
                <option value="">Select City</option>
                <option value="addis-ababa">Addis Ababa</option>
                <option value="dire-dawa">Dire Dawa</option>
                <option value="bahir-dar">Bahir Dar</option>
                <option value="mekelle">Mekelle</option>
                <option value="awassa">Awassa</option>
              </select>

              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="px-4 py-3 rounded-lg border-2 outline-none"
                style={{ 
                  color: '#1A1A1A',
                  borderColor: '#E5E7EB',
                  backgroundColor: 'white'
                }}
              >
                <option value="">Availability</option>
                <option value="available">Available</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-3 rounded-lg border-2 outline-none"
                style={{ 
                  color: '#1A1A1A',
                  borderColor: '#E5E7EB',
                  backgroundColor: 'white'
                }}
              >
                <option value="">Price Range</option>
                <option value="0-200">0 - 200 ETB</option>
                <option value="200-500">200 - 500 ETB</option>
                <option value="500-1000">500 - 1000 ETB</option>
                <option value="1000+">1000+ ETB</option>
              </select>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: '#2D2D49' }}>
            Search Results
          </h2>
          <div className="flex gap-2 bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'text-white' : ''
              }`}
              style={viewMode === 'grid' ? { backgroundColor: '#0B6B6B' } : { color: '#1A1A1A' }}
              onMouseEnter={(e) => viewMode !== 'grid' && (e.target.style.color = '#2BB673')}
              onMouseLeave={(e) => viewMode !== 'grid' && (e.target.style.color = '#1A1A1A')}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === 'map' ? 'text-white' : ''
              }`}
              style={viewMode === 'map' ? { backgroundColor: '#0B6B6B' } : { color: '#1A1A1A' }}
              onMouseEnter={(e) => viewMode !== 'map' && (e.target.style.color = '#2BB673')}
              onMouseLeave={(e) => viewMode !== 'map' && (e.target.style.color = '#1A1A1A')}
            >
              Map View
            </button>
          </div>
        </div>

        {/* Results */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockResults.map((pharmacy) => (
              <div key={pharmacy.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1" style={{ color: '#2D2D49' }}>
                      {pharmacy.pharmacyName}
                    </h3>
                    <p className="text-sm mb-2" style={{ color: '#1A1A1A' }}>
                      📍 {pharmacy.address}
                    </p>
                    <p className="text-sm" style={{ color: '#1A1A1A' }}>
                      📏 {pharmacy.distance} away
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      pharmacy.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                    style={
                      pharmacy.available
                        ? { backgroundColor: 'rgba(43, 182, 115, 0.1)', color: '#2BB673' }
                        : { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }
                    }
                  >
                    {pharmacy.available ? 'Available' : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm" style={{ color: '#1A1A1A' }}>Price:</p>
                    <p className="text-2xl font-bold" style={{ color: '#2D2D49' }}>
                      {pharmacy.price}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleGetDirections(pharmacy)}
                  className="w-full py-2 px-4 rounded-lg font-semibold transition-colors"
                  style={{ 
                    backgroundColor: '#0B6B6B',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#095555'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#0B6B6B'}
                >
                  Get Directions
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-200 rounded-lg shadow-lg overflow-hidden h-[600px] relative">
            {/* Map placeholder */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-center">
                <svg
                  className="w-24 h-24 mx-auto mb-4"
                  style={{ color: '#0B6B6B' }}
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
                  Map View - Pharmacy Locations
                </p>
                <p className="text-sm mt-2" style={{ color: '#1A1A1A' }}>
                  Click "Get Directions" on pharmacy cards to view on Google Maps
                </p>
              </div>
              {/* Map markers */}
              {mockResults.map((pharmacy, idx) => (
                <div
                  key={pharmacy.id}
                  className="absolute rounded-full shadow-lg animate-pulse"
                  style={{
                    backgroundColor: pharmacy.available ? '#2BB673' : '#EF4444',
                    width: '16px',
                    height: '16px',
                    top: `${20 + idx * 15}%`,
                    left: `${30 + idx * 10}%`
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchMedicine

