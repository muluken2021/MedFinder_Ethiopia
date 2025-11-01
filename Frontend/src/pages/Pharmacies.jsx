import React, { useState } from 'react'

const Pharmacies = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  // Mock pharmacy data
  const mockPharmacies = [
    {
      id: 1,
      name: 'Central Pharmacy',
      address: 'Bole Road, Addis Ababa, Ethiopia',
      phone: '+251 11 123 4567',
      email: 'info@centralpharmacy.et',
      city: 'Addis Ababa',
      logo: null
    },
    {
      id: 2,
      name: 'MedCare Pharmacy',
      address: 'Meskel Square, Addis Ababa, Ethiopia',
      phone: '+251 11 234 5678',
      email: 'contact@medcare.et',
      city: 'Addis Ababa',
      logo: null
    },
    {
      id: 3,
      name: 'Health Plus Pharmacy',
      address: 'Piazza, Addis Ababa, Ethiopia',
      phone: '+251 11 345 6789',
      email: 'info@healthplus.et',
      city: 'Addis Ababa',
      logo: null
    },
    {
      id: 4,
      name: 'City Pharmacy',
      address: 'CMC Road, Addis Ababa, Ethiopia',
      phone: '+251 11 456 7890',
      email: 'contact@citypharmacy.et',
      city: 'Addis Ababa',
      logo: null
    },
    {
      id: 5,
      name: 'Dire Dawa Medical Center',
      address: 'Main Street, Dire Dawa, Ethiopia',
      phone: '+251 25 111 2222',
      email: 'info@ddmc.et',
      city: 'Dire Dawa',
      logo: null
    },
    {
      id: 6,
      name: 'Bahir Dar Pharmacy',
      address: 'Lake Tana Road, Bahir Dar, Ethiopia',
      phone: '+251 58 222 3333',
      email: 'info@bahirdarpharmacy.et',
      city: 'Bahir Dar',
      logo: null
    },
  ]

  const filteredPharmacies = mockPharmacies.filter((pharmacy) => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCity = !selectedCity || pharmacy.city === selectedCity
    return matchesSearch && matchesCity
  })

  const cities = [...new Set(mockPharmacies.map(p => p.city))]

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: '#F6F8FA' }}>
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#2D2D49' }}>
          Registered Pharmacies
        </h1>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search by name or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-3 rounded-lg border-2 outline-none"
              style={{ 
                color: '#1A1A1A',
                borderColor: '#E5E7EB'
              }}
            />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-3 rounded-lg border-2 outline-none"
              style={{ 
                color: '#1A1A1A',
                borderColor: '#E5E7EB',
                backgroundColor: 'white'
              }}
            >
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Pharmacies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredPharmacies.map((pharmacy) => (
            <div key={pharmacy.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              {/* Logo placeholder */}
              <div className="w-20 h-20 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(11, 107, 107, 0.1)' }}>
                <svg
                  className="w-12 h-12"
                  style={{ color: '#0B6B6B' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-semibold mb-2" style={{ color: '#2D2D49' }}>
                {pharmacy.name}
              </h3>

              <div className="space-y-2 mb-4">
                <p className="text-sm flex items-start" style={{ color: '#1A1A1A' }}>
                  <span className="mr-2">📍</span>
                  <span>{pharmacy.address}</span>
                </p>
                <p className="text-sm flex items-center" style={{ color: '#1A1A1A' }}>
                  <span className="mr-2">📞</span>
                  <span>{pharmacy.phone}</span>
                </p>
                <p className="text-sm flex items-center" style={{ color: '#1A1A1A' }}>
                  <span className="mr-2">✉️</span>
                  <span>{pharmacy.email}</span>
                </p>
              </div>

              <button
                className="w-full py-2 px-4 rounded-lg font-semibold transition-colors"
                style={{ 
                  backgroundColor: '#0B6B6B',
                  color: 'white'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#095555'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#0B6B6B'}
              >
                View Medicines
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          <button
            className="px-4 py-2 rounded-lg border-2 font-medium transition-colors"
            style={{ 
              borderColor: '#E5E7EB',
              color: '#1A1A1A'
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = '#0B6B6B'; e.target.style.color = '#0B6B6B'; }}
            onMouseLeave={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.color = '#1A1A1A'; }}
          >
            Previous
          </button>
          <span className="px-4 py-2" style={{ color: '#1A1A1A' }}>Page 1 of 1</span>
          <button
            className="px-4 py-2 rounded-lg border-2 font-medium transition-colors"
            style={{ 
              borderColor: '#E5E7EB',
              color: '#1A1A1A'
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = '#0B6B6B'; e.target.style.color = '#0B6B6B'; }}
            onMouseLeave={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.color = '#1A1A1A'; }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pharmacies

