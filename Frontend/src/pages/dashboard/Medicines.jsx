import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Medicines = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('')

  // Mock medicines data
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Paracetamol 500mg', category: 'Pain Relief', quantity: 250, price: 25, status: 'available', expiryDate: '2025-12-31' },
    { id: 2, name: 'Amoxicillin 500mg', category: 'Antibiotic', quantity: 0, price: 180, status: 'out-of-stock', expiryDate: '2025-08-15' },
    { id: 3, name: 'Ibuprofen 400mg', category: 'Pain Relief', quantity: 150, price: 45, status: 'available', expiryDate: '2026-03-20' },
    { id: 4, name: 'Metformin 500mg', category: 'Diabetes', quantity: 80, price: 120, status: 'available', expiryDate: '2025-11-10' },
    { id: 5, name: 'Atenolol 50mg', category: 'Cardiovascular', quantity: 0, price: 95, status: 'out-of-stock', expiryDate: '2025-07-05' },
    { id: 6, name: 'Omeprazole 20mg', category: 'Digestive', quantity: 200, price: 85, status: 'available', expiryDate: '2026-01-25' },
  ])

  const categories = [...new Set(medicines.map(m => m.category))]

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !categoryFilter || medicine.category === categoryFilter
    const matchesAvailability = !availabilityFilter || medicine.status === availabilityFilter
    return matchesSearch && matchesCategory && matchesAvailability
  })

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      setMedicines(medicines.filter(m => m.id !== id))
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#2D2D49' }}>Medicines Management</h1>
          <p style={{ color: '#1A1A1A' }}>Manage your pharmacy's medicine inventory</p>
        </div>
        <Link
          to="/dashboard/add-medicine"
          className="mt-4 md:mt-0 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
          style={{ 
            backgroundColor: '#2BB673',
            color: 'white'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#239e5f'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2BB673'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Medicine</span>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#2D2D49' }}>
              Search medicine by name...
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicine by name..."
              className="w-full px-4 py-2 rounded-lg border-2 outline-none transition-colors"
              style={{ 
                color: '#1A1A1A',
                borderColor: '#E5E7EB'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0B6B6B'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#2D2D49' }}>
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 outline-none transition-colors"
              style={{ 
                color: '#1A1A1A',
                borderColor: '#E5E7EB',
                backgroundColor: 'white'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0B6B6B'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Availability Filter */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#2D2D49' }}>
              Availability
            </label>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 outline-none transition-colors"
              style={{ 
                color: '#1A1A1A',
                borderColor: '#E5E7EB',
                backgroundColor: 'white'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0B6B6B'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            >
              <option value="">All</option>
              <option value="available">Available</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Medicines Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#F6F8FA' }}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>
                  Medicine Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>
                  Quantity
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: '#E5E7EB' }}>
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium" style={{ color: '#2D2D49' }}>{medicine.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span style={{ color: '#1A1A1A' }}>{medicine.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span style={{ color: '#1A1A1A' }}>{medicine.quantity}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span style={{ color: '#1A1A1A' }}>{medicine.price} ETB</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={
                        medicine.status === 'available'
                          ? { backgroundColor: 'rgba(43, 182, 115, 0.1)', color: '#2BB673' }
                          : { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }
                      }
                    >
                      {medicine.status === 'available' ? '🟢 Available' : '🔴 Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: '#0B6B6B' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(11, 107, 107, 0.1)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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

        {/* Pagination */}
        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: '#1A1A1A' }}>No medicines found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Medicines


