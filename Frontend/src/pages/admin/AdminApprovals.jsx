import React, { useState } from 'react'

const AdminApprovals = () => {
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  // Mock pending requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      type: 'Pharmacy Registration',
      pharmacyName: 'New Health Pharmacy',
      licenseNumber: 'PH-LIC-005',
      submissionDate: '2024-01-14',
      city: 'Mekelle',
      status: 'Awaiting Review',
      ownerName: 'Dr. Alemayehu Bekele',
      email: 'info@newhealth.et',
      phone: '+251 34 333 4444',
      address: 'Main Street, Mekelle, Ethiopia'
    },
    {
      id: 2,
      type: 'Pharmacy Registration',
      pharmacyName: 'City Medical Center',
      licenseNumber: 'PH-LIC-006',
      submissionDate: '2024-01-13',
      city: 'Addis Ababa',
      status: 'Awaiting Review',
      ownerName: 'Sara Tsegaye',
      email: 'contact@citymed.et',
      phone: '+251 11 555 6666',
      address: 'Bole Road, Addis Ababa, Ethiopia'
    },
    {
      id: 3,
      type: 'Medicine Update',
      medicineName: 'Aspirin 100mg',
      pharmacyName: 'Central Pharmacy',
      submissionDate: '2024-01-12',
      status: 'Awaiting Review',
      changes: 'Price updated from 20 ETB to 25 ETB'
    }
  ])

  const handleApprove = (id) => {
    if (window.confirm('Approve this request?')) {
      setRequests(requests.map(r => 
        r.id === id ? { ...r, status: 'Approved' } : r
      ))
    }
  }

  const handleReject = (id) => {
    if (window.confirm('Reject this request?')) {
      setRequests(requests.filter(r => r.id !== id))
    }
  }

  const handleViewDetails = (request) => {
    setSelectedRequest(request)
    setShowDetailsModal(true)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#2D2D49' }}>Approvals & Pending Requests</h1>
        <p style={{ color: '#1A1A1A' }}>Review and approve pharmacy registrations and medicine updates</p>
      </div>

      {/* Pending Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.filter(r => r.status === 'Awaiting Review').map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <span
                className="px-3 py-1 rounded-full text-sm font-semibold"
                style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}
              >
                {request.status}
              </span>
              <span className="text-xs" style={{ color: '#1A1A1A' }}>{request.type}</span>
            </div>

            <h3 className="text-xl font-bold mb-2" style={{ color: '#2D2D49' }}>
              {request.pharmacyName || request.medicineName}
            </h3>

            {request.licenseNumber && (
              <p className="text-sm mb-2" style={{ color: '#1A1A1A' }}>
                License: <span className="font-semibold">{request.licenseNumber}</span>
              </p>
            )}

            <p className="text-sm mb-4" style={{ color: '#1A1A1A' }}>
              Submitted: {request.submissionDate}
            </p>

            <div className="flex space-x-2">
              <button
                onClick={() => handleApprove(request.id)}
                className="flex-1 py-2 px-4 rounded-lg font-semibold transition-colors"
                style={{ 
                  backgroundColor: '#2BB673',
                  color: 'white'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#239e5f'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2BB673'}
              >
                ✅ Approve
              </button>
              <button
                onClick={() => handleReject(request.id)}
                className="flex-1 py-2 px-4 rounded-lg font-semibold border-2 transition-colors"
                style={{ 
                  borderColor: '#EF4444',
                  color: '#EF4444',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                ❌ Reject
              </button>
              <button
                onClick={() => handleViewDetails(request)}
                className="px-4 py-2 rounded-lg font-semibold border-2 transition-colors"
                style={{ 
                  borderColor: '#0B6B6B',
                  color: '#0B6B6B',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(11, 107, 107, 0.1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                title="View Details"
              >
                🔍
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Approved Requests */}
      {requests.filter(r => r.status === 'Approved').length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#2D2D49' }}>Recently Approved</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.filter(r => r.status === 'Approved').map((request) => (
              <div key={request.id} className="bg-white rounded-lg shadow-md p-6 opacity-75">
                <span
                  className="px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block"
                  style={{ backgroundColor: 'rgba(43, 182, 115, 0.1)', color: '#2BB673' }}
                >
                  ✅ Approved
                </span>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#2D2D49' }}>
                  {request.pharmacyName || request.medicineName}
                </h3>
                <p className="text-sm" style={{ color: '#1A1A1A' }}>
                  Approved: {request.submissionDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold" style={{ color: '#2D2D49' }}>Request Details</h3>
              <button
                onClick={() => {
                  setShowDetailsModal(false)
                  setSelectedRequest(null)
                }}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-6 h-6" style={{ color: '#1A1A1A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>Type</p>
                <p className="font-semibold" style={{ color: '#2D2D49' }}>{selectedRequest.type}</p>
              </div>

              {selectedRequest.pharmacyName && (
                <>
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>Pharmacy Name</p>
                    <p className="font-semibold" style={{ color: '#2D2D49' }}>{selectedRequest.pharmacyName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>Owner Name</p>
                    <p className="font-semibold" style={{ color: '#2D2D49' }}>{selectedRequest.ownerName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>License Number</p>
                    <p className="font-semibold" style={{ color: '#2D2D49' }}>{selectedRequest.licenseNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>Email</p>
                    <p className="font-semibold" style={{ color: '#2D2D49' }}>{selectedRequest.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>Phone</p>
                    <p className="font-semibold" style={{ color: '#2D2D49' }}>{selectedRequest.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>Address</p>
                    <p className="font-semibold" style={{ color: '#2D2D49' }}>{selectedRequest.address}</p>
                  </div>
                </>
              )}

              {selectedRequest.medicineName && (
                <>
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>Medicine Name</p>
                    <p className="font-semibold" style={{ color: '#2D2D49' }}>{selectedRequest.medicineName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>Pharmacy</p>
                    <p className="font-semibold" style={{ color: '#2D2D49' }}>{selectedRequest.pharmacyName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>Changes</p>
                    <p className="font-semibold" style={{ color: '#2D2D49' }}>{selectedRequest.changes}</p>
                  </div>
                </>
              )}

              <div>
                <p className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>Submission Date</p>
                <p className="font-semibold" style={{ color: '#2D2D49' }}>{selectedRequest.submissionDate}</p>
              </div>

              <div className="flex space-x-4 pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                <button
                  onClick={() => {
                    handleApprove(selectedRequest.id)
                    setShowDetailsModal(false)
                  }}
                  className="flex-1 py-2 px-4 rounded-lg font-semibold transition-colors"
                  style={{ 
                    backgroundColor: '#2BB673',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#239e5f'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#2BB673'}
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    handleReject(selectedRequest.id)
                    setShowDetailsModal(false)
                  }}
                  className="flex-1 py-2 px-4 rounded-lg font-semibold border-2 transition-colors"
                  style={{ 
                    borderColor: '#EF4444',
                    color: '#EF4444',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminApprovals


