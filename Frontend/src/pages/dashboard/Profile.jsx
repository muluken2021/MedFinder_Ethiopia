import React, { useState } from 'react'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: 'Central Pharmacy',
    email: 'info@centralpharmacy.et',
    phone: '+251 11 123 4567',
    city: 'Addis Ababa',
    address: 'Bole Road, Addis Ababa, Ethiopia',
    licenseNumber: 'PH-LIC-2024-001'
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would update the profile
    console.log('Profile updated:', formData)
    setIsEditing(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!')
      return
    }
    // In a real app, this would update the password
    console.log('Password updated')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    alert('Password updated successfully!')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#2D2D49' }}>Pharmacy Profile</h1>
        <p style={{ color: '#1A1A1A' }}>Manage your pharmacy information and settings</p>
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <div className="mb-6 p-4 rounded-lg flex items-center space-x-3" style={{ backgroundColor: 'rgba(43, 182, 115, 0.1)', borderLeft: '4px solid #2BB673' }}>
          <svg className="w-6 h-6 flex-shrink-0" style={{ color: '#2BB673' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="font-semibold" style={{ color: '#2BB673' }}>Profile updated successfully!</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: '#2D2D49' }}>Pharmacy Details</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-lg font-semibold transition-colors"
                  style={{ 
                    backgroundColor: '#0B6B6B',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#095555'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#0B6B6B'}
                >
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>Pharmacy Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                    style={{ 
                      color: '#1A1A1A',
                      borderColor: '#E5E7EB'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0B6B6B'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                    style={{ 
                      color: '#1A1A1A',
                      borderColor: '#E5E7EB'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0B6B6B'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                    style={{ 
                      color: '#1A1A1A',
                      borderColor: '#E5E7EB'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0B6B6B'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                    style={{ 
                      color: '#1A1A1A',
                      borderColor: '#E5E7EB'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0B6B6B'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors resize-none"
                    style={{ 
                      color: '#1A1A1A',
                      borderColor: '#E5E7EB'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0B6B6B'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  ></textarea>
                </div>

                <div>
                  <label className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>License Number</label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                    style={{ 
                      color: '#1A1A1A',
                      borderColor: '#E5E7EB'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0B6B6B'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 rounded-lg font-semibold transition-colors"
                    style={{ 
                      backgroundColor: '#0B6B6B',
                      color: 'white'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#095555'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#0B6B6B'}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
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
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>Pharmacy Name</p>
                    <p className="font-semibold" style={{ color: '#2D2D49' }}>{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>Email</p>
                    <p className="font-semibold" style={{ color: '#2D2D49' }}>{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>Phone</p>
                    <p className="font-semibold" style={{ color: '#2D2D49' }}>{formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>City</p>
                    <p className="font-semibold" style={{ color: '#2D2D49' }}>{formData.city}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>Address</p>
                  <p className="font-semibold" style={{ color: '#2D2D49' }}>{formData.address}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>License Number</p>
                  <p className="font-semibold" style={{ color: '#2D2D49' }}>{formData.licenseNumber}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Password Update */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold mb-4" style={{ color: '#2D2D49' }}>Update Password</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#2D2D49' }}>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 rounded-lg border-2 outline-none"
                  style={{ 
                    color: '#1A1A1A',
                    borderColor: '#E5E7EB'
                  }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#2D2D49' }}>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 rounded-lg border-2 outline-none"
                  style={{ 
                    color: '#1A1A1A',
                    borderColor: '#E5E7EB'
                  }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#2D2D49' }}>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 rounded-lg border-2 outline-none"
                  style={{ 
                    color: '#1A1A1A',
                    borderColor: '#E5E7EB'
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-lg font-semibold transition-colors"
                style={{ 
                  backgroundColor: '#0B6B6B',
                  color: 'white'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#095555'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#0B6B6B'}
              >
                Update Password
              </button>
            </form>
          </div>

          {/* Logo Upload */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4" style={{ color: '#2D2D49' }}>Pharmacy Logo</h3>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(11, 107, 107, 0.1)' }}>
                <svg className="w-16 h-16" style={{ color: '#0B6B6B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm"
              />
              <p className="text-xs mt-2" style={{ color: '#1A1A1A' }}>Recommended: 200x200px</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

