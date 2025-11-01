import React, { useState } from 'react'

const AdminSettings = () => {
  const [showSuccess, setShowSuccess] = useState(false)
  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin User',
    email: 'admin@medfinder.et'
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [siteSettings, setSiteSettings] = useState({
    contactEmail: 'contact@medfinder.et',
    maintenanceMode: false,
    autoApprovePharmacies: false
  })

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handlePasswordUpdate = (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!')
      return
    }
    alert('Password updated successfully!')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleSiteSettingsChange = (name, value) => {
    setSiteSettings({
      ...siteSettings,
      [name]: value
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#2D2D49' }}>Settings</h1>
        <p style={{ color: '#1A1A1A' }}>Manage admin profile and site settings</p>
      </div>

      {showSuccess && (
        <div className="mb-6 p-4 rounded-lg flex items-center space-x-3" style={{ backgroundColor: 'rgba(43, 182, 115, 0.1)', borderLeft: '4px solid #2BB673' }}>
          <svg className="w-6 h-6 flex-shrink-0" style={{ color: '#2BB673' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="font-semibold" style={{ color: '#2BB673' }}>Settings updated successfully!</p>
        </div>
      )}

      {/* Admin Profile */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#2D2D49' }}>Admin Profile</h2>
        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>Name</label>
            <input
              type="text"
              value={adminProfile.name}
              onChange={(e) => setAdminProfile({ ...adminProfile, name: e.target.value })}
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
            <label className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>Email</label>
            <input
              type="email"
              value={adminProfile.email}
              onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
              style={{ 
                color: '#1A1A1A',
                borderColor: '#E5E7EB'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0B6B6B'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg font-semibold transition-colors"
            style={{ 
              backgroundColor: '#0B6B6B',
              color: 'white'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#095555'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#0B6B6B'}
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Password Change */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#2D2D49' }}>Change Password</h2>
        <form onSubmit={handlePasswordUpdate} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>Current Password</label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
              style={{ 
                color: '#1A1A1A',
                borderColor: '#E5E7EB'
              }}
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>New Password</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
              style={{ 
                color: '#1A1A1A',
                borderColor: '#E5E7EB'
              }}
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>Confirm New Password</label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
              style={{ 
                color: '#1A1A1A',
                borderColor: '#E5E7EB'
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg font-semibold transition-colors"
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

      {/* Site Settings */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#2D2D49' }}>Site Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>Contact Email</label>
            <input
              type="email"
              value={siteSettings.contactEmail}
              onChange={(e) => handleSiteSettingsChange('contactEmail', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
              style={{ 
                color: '#1A1A1A',
                borderColor: '#E5E7EB'
              }}
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>About Text</label>
            <textarea
              rows="4"
              className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors resize-none"
              style={{ 
                color: '#1A1A1A',
                borderColor: '#E5E7EB'
              }}
              placeholder="Enter site description..."
            ></textarea>
          </div>

          <div>
            <label className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>Upload Site Logo</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-3 rounded-lg border-2 outline-none"
              style={{ 
                color: '#1A1A1A',
                borderColor: '#E5E7EB'
              }}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#F6F8FA' }}>
              <div>
                <label className="font-semibold block mb-1" style={{ color: '#2D2D49' }}>Maintenance Mode</label>
                <p className="text-sm" style={{ color: '#1A1A1A' }}>Put the site in maintenance mode</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={siteSettings.maintenanceMode}
                  onChange={(e) => handleSiteSettingsChange('maintenanceMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 rounded-full peer peer-focus:outline-none transition-colors" style={{ backgroundColor: siteSettings.maintenanceMode ? '#2BB673' : '#E5E7EB' }}>
                  <div className={`w-5 h-5 rounded-full transition-transform ${siteSettings.maintenanceMode ? 'translate-x-5' : 'translate-x-0'} bg-white mt-0.5 ml-0.5`}></div>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#F6F8FA' }}>
              <div>
                <label className="font-semibold block mb-1" style={{ color: '#2D2D49' }}>Approve Pharmacies Automatically</label>
                <p className="text-sm" style={{ color: '#1A1A1A' }}>Auto-approve new pharmacy registrations</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={siteSettings.autoApprovePharmacies}
                  onChange={(e) => handleSiteSettingsChange('autoApprovePharmacies', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 rounded-full peer peer-focus:outline-none transition-colors" style={{ backgroundColor: siteSettings.autoApprovePharmacies ? '#2BB673' : '#E5E7EB' }}>
                  <div className={`w-5 h-5 rounded-full transition-transform ${siteSettings.autoApprovePharmacies ? 'translate-x-5' : 'translate-x-0'} bg-white mt-0.5 ml-0.5`}></div>
                </div>
              </label>
            </div>
          </div>

          <button
            onClick={() => {
              setShowSuccess(true)
              setTimeout(() => setShowSuccess(false), 3000)
            }}
            className="w-full py-3 px-6 rounded-lg font-semibold transition-colors"
            style={{ 
              backgroundColor: '#0B6B6B',
              color: 'white'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#095555'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#0B6B6B'}
          >
            Save Site Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings

