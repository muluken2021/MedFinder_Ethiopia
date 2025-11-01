import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddMedicine = () => {
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    expiryDate: '',
    status: 'available'
  })

  const categories = [
    'Pain Relief',
    'Antibiotic',
    'Diabetes',
    'Cardiovascular',
    'Digestive',
    'Respiratory',
    'Vitamins',
    'Other'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send data to backend
    console.log('Medicine added:', formData)
    setShowSuccess(true)
    
    // Reset form after 2 seconds and redirect
    setTimeout(() => {
      setShowSuccess(false)
      navigate('/dashboard/medicines')
    }, 2000)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#2D2D49' }}>Add New Medicine</h1>
        <p style={{ color: '#1A1A1A' }}>Add a new medicine to your pharmacy inventory</p>
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <div className="mb-6 p-4 rounded-lg flex items-center space-x-3" style={{ backgroundColor: 'rgba(43, 182, 115, 0.1)', borderLeft: '4px solid #2BB673' }}>
          <svg className="w-6 h-6 flex-shrink-0" style={{ color: '#2BB673' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-semibold" style={{ color: '#2BB673' }}>Success!</p>
            <p className="text-sm" style={{ color: '#1A1A1A' }}>Medicine added successfully. Redirecting...</p>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Medicine Name */}
          <div>
            <label htmlFor="name" className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>
              Medicine Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
              style={{ 
                color: '#1A1A1A',
                borderColor: '#E5E7EB'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0B6B6B'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              placeholder="e.g., Paracetamol 500mg"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
              style={{ 
                color: '#1A1A1A',
                borderColor: '#E5E7EB',
                backgroundColor: 'white'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0B6B6B'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price and Quantity Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price */}
            <div>
              <label htmlFor="price" className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>
                Price (ETB) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                style={{ 
                  color: '#1A1A1A',
                  borderColor: '#E5E7EB'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0B6B6B'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                placeholder="0.00"
              />
            </div>

            {/* Quantity */}
            <div>
              <label htmlFor="quantity" className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                style={{ 
                  color: '#1A1A1A',
                  borderColor: '#E5E7EB'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0B6B6B'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                placeholder="0"
              />
            </div>
          </div>

          {/* Expiry Date and Status Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Expiry Date */}
            <div>
              <label htmlFor="expiryDate" className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                style={{ 
                  color: '#1A1A1A',
                  borderColor: '#E5E7EB'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0B6B6B'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>

            {/* Availability Status */}
            <div>
              <label htmlFor="status" className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>
                Availability Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                style={{ 
                  color: '#1A1A1A',
                  borderColor: '#E5E7EB',
                  backgroundColor: 'white'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0B6B6B'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              >
                <option value="available">Available</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 py-3 px-6 rounded-lg font-semibold transition-colors"
              style={{ 
                backgroundColor: '#2BB673',
                color: 'white'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#239e5f'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2BB673'}
            >
              Save Medicine
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard/medicines')}
              className="px-6 py-3 rounded-lg font-semibold border-2 transition-colors"
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
        </form>
      </div>
    </div>
  )
}

export default AddMedicine

