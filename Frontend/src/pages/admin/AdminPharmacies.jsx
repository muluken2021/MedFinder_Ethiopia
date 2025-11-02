import React, { useState } from 'react'

const AdminPharmacies = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedPharmacy, setSelectedPharmacy] = useState(null)
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [pharmacyToApprove, setPharmacyToApprove] = useState(null)

  // Mock pharmacies data
  const [pharmacies, setPharmacies] = useState([
    { id: 1, name: 'Central Pharmacy', city: 'Addis Ababa', email: 'info@central.et', phone: '+251 11 123 4567', status: 'approved', licenseNumber: 'PH-LIC-001', medicinesCount: 156, registrationDate: '2024-01-10' },
    { id: 2, name: 'MedCare Pharmacy', city: 'Addis Ababa', email: 'contact@medcare.et', phone: '+251 11 234 5678', status: 'pending', licenseNumber: 'PH-LIC-002', medicinesCount: 0, registrationDate: '2024-01-15' },
    { id: 3, name: 'Health Plus', city: 'Dire Dawa', email: 'info@healthplus.et', phone: '+251 25 111 2222', status: 'approved', licenseNumber: 'PH-LIC-003', medicinesCount: 89, registrationDate: '2024-01-05' },
    { id: 4, name: 'City Pharmacy', city: 'Bahir Dar', email: 'contact@city.et', phone: '+251 58 222 3333', status: 'blocked', licenseNumber: 'PH-LIC-004', medicinesCount: 45, registrationDate: '2024-01-01' },
    { id: 5, name: 'New Health Pharmacy', city: 'Mekelle', email: 'info@newhealth.et', phone: '+251 34 333 4444', status: 'pending', licenseNumber: 'PH-LIC-005', medicinesCount: 0, registrationDate: '2024-01-14' },
  ])

  const filteredPharmacies = pharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pharmacy.city.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !statusFilter || pharmacy.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleApprove = (pharmacy) => {
    setPharmacyToApprove(pharmacy)
    setShowApprovalModal(true)
  }

  const confirmApprove = () => {
    setPharmacies(pharmacies.map(p => 
      p.id === pharmacyToApprove.id ? { ...p, status: 'approved' } : p
    ))
    setShowApprovalModal(false)
    setPharmacyToApprove(null)
  }

  const handleBlock = (id) => {
    if (window.confirm('Are you sure you want to block this pharmacy?')) {
      setPharmacies(pharmacies.map(p => 
        p.id === id ? { ...p, status: 'blocked' } : p
      ))
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this pharmacy? This action cannot be undone.')) {
      setPharmacies(pharmacies.filter(p => p.id !== id))
      if (selectedPharmacy?.id === id) setSelectedPharmacy(null)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#2D2D49' }}>Pharmacies Management</h1>
        <p style={{ color: '#1A1A1A' }}>Manage and approve pharmacy registrations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Table Section */}
        <div className="lg:col-span-2">
          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#2D2D49' }}>
                  Search by pharmacy name or city...
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by pharmacy name or city..."
                  className="w-full px-4 py-2 rounded-lg border-2 outline-none transition-colors"
                  style={{ 
                    color: '#1A1A1A',
                    borderColor: '#E5E7EB'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0B6B6B'}
                  onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#2D2D49' }}>
                  Status Filter
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
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
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pharmacies Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{ backgroundColor: '#F6F8FA' }}>
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Pharmacy Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>City</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: '#E5E7EB' }}>
                  {filteredPharmacies.map((pharmacy) => (
                    <tr 
                      key={pharmacy.id} 
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${selectedPharmacy?.id === pharmacy.id ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedPharmacy(pharmacy)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium" style={{ color: '#2D2D49' }}>{pharmacy.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span style={{ color: '#1A1A1A' }}>{pharmacy.city}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span style={{ color: '#1A1A1A' }}>{pharmacy.email}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span style={{ color: '#1A1A1A' }}>{pharmacy.phone}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="px-3 py-1 rounded-full text-sm font-semibold"
                          style={
                            pharmacy.status === 'approved'
                              ? { backgroundColor: 'rgba(43, 182, 115, 0.1)', color: '#2BB673' }
                              : pharmacy.status === 'pending'
                              ? { backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }
                              : { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }
                          }
                        >
                          {pharmacy.status.charAt(0).toUpperCase() + pharmacy.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedPharmacy(pharmacy)}
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
                          {pharmacy.status === 'pending' && (
                            <button
                              onClick={() => handleApprove(pharmacy)}
                              className="p-2 rounded-lg transition-colors"
                              style={{ color: '#2BB673' }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(43, 182, 115, 0.1)'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                              title="Approve"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                          )}
                          <button
                            onClick={() => handleBlock(pharmacy.id)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: '#EF4444' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            title="Block"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(pharmacy.id)}
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

        {/* Pharmacy Details Sidebar */}
        {selectedPharmacy && (
          <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold" style={{ color: '#2D2D49' }}>Pharmacy Details</h2>
              <button
                onClick={() => setSelectedPharmacy(null)}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-5 h-5" style={{ color: '#1A1A1A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>Pharmacy Name</p>
                <p className="font-semibold" style={{ color: '#2D2D49' }}>{selectedPharmacy.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>License Number</p>
                <p className="font-semibold" style={{ color: '#2D2D49' }}>{selectedPharmacy.licenseNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>Medicines Count</p>
                <p className="font-semibold" style={{ color: '#2D2D49' }}>{selectedPharmacy.medicinesCount}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>Registration Date</p>
                <p className="font-semibold" style={{ color: '#2D2D49' }}>{selectedPharmacy.registrationDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>Status</p>
                <span
                  className="px-3 py-1 rounded-full text-sm font-semibold inline-block"
                  style={
                    selectedPharmacy.status === 'approved'
                      ? { backgroundColor: 'rgba(43, 182, 115, 0.1)', color: '#2BB673' }
                      : selectedPharmacy.status === 'pending'
                      ? { backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }
                      : { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }
                  }
                >
                  {selectedPharmacy.status.charAt(0).toUpperCase() + selectedPharmacy.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Approval Confirmation Modal */}
      {showApprovalModal && pharmacyToApprove && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4" style={{ color: '#2D2D49' }}>
              Approve Pharmacy Registration
            </h3>
            <p className="mb-2" style={{ color: '#1A1A1A' }}>
              Are you sure you want to approve <strong>{pharmacyToApprove.name}</strong>?
            </p>
            <p className="text-sm mb-6" style={{ color: '#1A1A1A' }}>
              License: {pharmacyToApprove.licenseNumber}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={confirmApprove}
                className="flex-1 py-2 px-4 rounded-lg font-semibold transition-colors"
                style={{ 
                  backgroundColor: '#2BB673',
                  color: 'white'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#239e5f'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2BB673'}
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setShowApprovalModal(false)
                  setPharmacyToApprove(null)
                }}
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
    </div>
  )
}

export default AdminPharmacies


