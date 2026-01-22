import React from 'react'

const DashboardOverview = () => {
  // Mock data
  const stats = {
    totalPharmacies: 124,
    totalMedicines: 2847,
    registeredUsers: 8934,
    pendingApprovals: 8
  }

  const pharmaciesByCity = [
    { city: 'Addis Ababa', count: 68 },
    { city: 'Dire Dawa', count: 15 },
    { city: 'Bahir Dar', count: 12 },
    { city: 'Mekelle', count: 10 },
    { city: 'Awassa', count: 8 },
    { city: 'Other', count: 11 }
  ]

  const stockStatus = {
    available: 2456,
    outOfStock: 391
  }

  const recentRegistrations = [
    { id: 1, type: 'Pharmacy', name: 'New Health Pharmacy', date: '2024-01-15', status: 'Pending' },
    { id: 2, type: 'Medicine', name: 'Aspirin 100mg', pharmacy: 'Central Pharmacy', date: '2024-01-14', status: 'Approved' },
    { id: 3, type: 'Pharmacy', name: 'City Medical Center', date: '2024-01-13', status: 'Approved' },
    { id: 4, type: 'Medicine', name: 'Paracetamol 500mg', pharmacy: 'MedCare', date: '2024-01-12', status: 'Approved' },
  ]

  const maxCount = Math.max(...pharmaciesByCity.map(c => c.count))

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#2D2D49' }}>
          Welcome, Admin 👋
        </h1>
        <p style={{ color: '#1A1A1A' }}>Here's what's happening on your platform today.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(11, 107, 107, 0.1)' }}>
              <svg className="w-6 h-6" style={{ color: '#0B6B6B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>🏥 Total Pharmacies</h3>
          <p className="text-3xl font-bold" style={{ color: '#2D2D49' }}>{stats.totalPharmacies}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(43, 182, 115, 0.1)' }}>
              <svg className="w-6 h-6" style={{ color: '#2BB673' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>💊 Total Medicines</h3>
          <p className="text-3xl font-bold" style={{ color: '#2D2D49' }}>{stats.totalMedicines}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(11, 107, 107, 0.1)' }}>
              <svg className="w-6 h-6" style={{ color: '#0B6B6B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>👤 Registered Users</h3>
          <p className="text-3xl font-bold" style={{ color: '#2D2D49' }}>{stats.registeredUsers.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
              <svg className="w-6 h-6" style={{ color: '#F59E0B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>⏳ Pending Approvals</h3>
          <p className="text-3xl font-bold" style={{ color: '#2D2D49' }}>{stats.pendingApprovals}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart - Pharmacies by City */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6" style={{ color: '#2D2D49' }}>
            Pharmacies by City
          </h2>
          <div className="space-y-4">
            {pharmaciesByCity.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{item.city}</span>
                  <span className="text-sm font-bold" style={{ color: '#2D2D49' }}>{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="h-4 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(item.count / maxCount) * 100}%`,
                      backgroundColor: '#0B6B6B'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart - Stock Status */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6" style={{ color: '#2D2D49' }}>
            Stock Status Distribution
          </h2>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="32"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  fill="none"
                  stroke="#2BB673"
                  strokeWidth="32"
                  strokeDasharray={`${2 * Math.PI * 80 * (stockStatus.available / (stockStatus.available + stockStatus.outOfStock))} ${2 * Math.PI * 80}`}
                  strokeLinecap="round"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="32"
                  strokeDasharray={`${2 * Math.PI * 80 * (stockStatus.outOfStock / (stockStatus.available + stockStatus.outOfStock))} ${2 * Math.PI * 80}`}
                  strokeDashoffset={`-${2 * Math.PI * 80 * (stockStatus.available / (stockStatus.available + stockStatus.outOfStock))}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold" style={{ color: '#2D2D49' }}>{stockStatus.available + stockStatus.outOfStock}</p>
                  <p className="text-sm" style={{ color: '#1A1A1A' }}>Total</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#2BB673' }}></div>
              <span className="text-sm" style={{ color: '#1A1A1A' }}>Available ({stockStatus.available})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#EF4444' }}></div>
              <span className="text-sm" style={{ color: '#1A1A1A' }}>Out of Stock ({stockStatus.outOfStock})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Registrations Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b" style={{ borderColor: '#E5E7EB' }}>
          <h2 className="text-xl font-bold" style={{ color: '#2D2D49' }}>Recent Registrations & Updates</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#F6F8FA' }}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Pharmacy</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: '#E5E7EB' }}>
              {recentRegistrations.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{item.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm" style={{ color: '#1A1A1A' }}>{item.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm" style={{ color: '#1A1A1A' }}>{item.pharmacy || '-'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm" style={{ color: '#1A1A1A' }}>{item.date}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={
                        item.status === 'Approved'
                          ? { backgroundColor: 'rgba(43, 182, 115, 0.1)', color: '#2BB673' }
                          : { backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }
                      }
                    >
                      {item.status}
                    </span>
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

export default DashboardOverview



