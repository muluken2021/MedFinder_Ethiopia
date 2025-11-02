import React, { useState } from 'react'

const AdminMedicines = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('')
  const [cityFilter, setCityFilter] = useState('')

  // Mock medicines data
  const medicines = [
    { id: 1, name: 'Paracetamol 500mg', pharmacy: 'Central Pharmacy', category: 'Pain Relief', price: 25, availability: 'Available', city: 'Addis Ababa' },
    { id: 2, name: 'Amoxicillin 500mg', pharmacy: 'MedCare', category: 'Antibiotic', price: 180, availability: 'Out of Stock', city: 'Addis Ababa' },
    { id: 3, name: 'Ibuprofen 400mg', pharmacy: 'Health Plus', category: 'Pain Relief', price: 45, availability: 'Available', city: 'Dire Dawa' },
    { id: 4, name: 'Metformin 500mg', pharmacy: 'City Pharmacy', category: 'Diabetes', price: 120, availability: 'Available', city: 'Bahir Dar' },
  ]

  const categories = [...new Set(medicines.map(m => m.category))]
  const cities = [...new Set(medicines.map(m => m.city))]

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !categoryFilter || medicine.category === categoryFilter
    const matchesAvailability = !availabilityFilter || medicine.availability === availabilityFilter
    const matchesCity = !cityFilter || medicine.city === cityFilter
    return matchesSearch && matchesCategory && matchesAvailability && matchesCity
  })

  const handleExport = (format) => {
    // In a real app, this would export data
    alert(`Exporting medicine data as ${format.toUpperCase()}...`)
  }

  const handleFlag = (id) => {
    if (window.confirm('Flag this medicine for review?')) {
      alert('Medicine flagged successfully')
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      alert('Medicine deleted')
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#2D2D49' }}>Medicines Management</h1>
          <p style={{ color: '#1A1A1A' }}>Monitor and manage all medicines across pharmacies</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            onClick={() => handleExport('csv')}
            className="px-4 py-2 rounded-lg font-semibold border-2 transition-colors"
            style={{ 
              borderColor: '#0B6B6B',
              color: '#0B6B6B',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(11, 107, 107, 0.1)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Export CSV
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="px-4 py-2 rounded-lg font-semibold border-2 transition-colors"
            style={{ 
              borderColor: '#0B6B6B',
              color: '#0B6B6B',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(11, 107, 107, 0.1)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medicine name..."
            className="px-4 py-2 rounded-lg border-2 outline-none transition-colors"
            style={{ 
              color: '#1A1A1A',
              borderColor: '#E5E7EB'
            }}
            onFocus={(e) => e.target.style.borderColor = '#0B6B6B'}
            onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 outline-none transition-colors"
            style={{ 
              color: '#1A1A1A',
              borderColor: '#E5E7EB',
              backgroundColor: 'white'
            }}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 outline-none transition-colors"
            style={{ 
              color: '#1A1A1A',
              borderColor: '#E5E7EB',
              backgroundColor: 'white'
            }}
          >
            <option value="">All Availability</option>
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 outline-none transition-colors"
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

      {/* Medicines Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#F6F8FA' }}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Medicine Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Pharmacy</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Availability</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: '#E5E7EB' }}>
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium" style={{ color: '#2D2D49' }}>{medicine.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span style={{ color: '#1A1A1A' }}>{medicine.pharmacy}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span style={{ color: '#1A1A1A' }}>{medicine.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span style={{ color: '#1A1A1A' }}>{medicine.price} ETB</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={
                        medicine.availability === 'Available'
                          ? { backgroundColor: 'rgba(43, 182, 115, 0.1)', color: '#2BB673' }
                          : { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }
                      }
                    >
                      {medicine.availability}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: '#0B6B6B' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(11, 107, 107, 0.1)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        title="View"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleFlag(medicine.id)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: '#F59E0B' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(245, 158, 11, 0.1)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        title="Flag"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(medicine.id)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: '#EF4444' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminMedicines


