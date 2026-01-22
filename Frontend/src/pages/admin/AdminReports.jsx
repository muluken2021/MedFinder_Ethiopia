import React from 'react'

const AdminReports = () => {
  // Mock data
  const monthlySignups = [
    { month: 'Jan', pharmacies: 12, users: 450 },
    { month: 'Feb', pharmacies: 18, users: 580 },
    { month: 'Mar', pharmacies: 25, users: 720 },
    { month: 'Apr', pharmacies: 22, users: 680 },
    { month: 'May', pharmacies: 30, users: 890 },
    { month: 'Jun', pharmacies: 28, users: 850 }
  ]

  const mostSearched = [
    { name: 'Paracetamol 500mg', searches: 1250 },
    { name: 'Amoxicillin 500mg', searches: 980 },
    { name: 'Ibuprofen 400mg', searches: 750 },
    { name: 'Metformin 500mg', searches: 620 },
    { name: 'Aspirin 100mg', searches: 580 }
  ]

  const activeCities = [
    { city: 'Addis Ababa', activity: 85 },
    { city: 'Dire Dawa', activity: 12 },
    { city: 'Bahir Dar', activity: 10 },
    { city: 'Mekelle', activity: 8 },
    { city: 'Awassa', activity: 6 }
  ]

  const topPharmacies = [
    { name: 'Central Pharmacy', orders: 1250, rating: 4.8 },
    { name: 'MedCare Pharmacy', orders: 980, rating: 4.7 },
    { name: 'Health Plus', orders: 750, rating: 4.6 },
    { name: 'City Pharmacy', orders: 620, rating: 4.5 },
    { name: 'New Health Pharmacy', orders: 580, rating: 4.4 }
  ]

  const maxPharmacy = Math.max(...monthlySignups.map(m => m.pharmacies))
  const maxUser = Math.max(...monthlySignups.map(m => m.users))

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#2D2D49' }}>Reports & Analytics</h1>
        <p style={{ color: '#1A1A1A' }}>Platform insights and performance metrics</p>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Sign-ups Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6" style={{ color: '#2D2D49' }}>
            Monthly Pharmacy Sign-ups
          </h2>
          <div className="space-y-4">
            {monthlySignups.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{item.month}</span>
                  <span className="text-sm font-bold" style={{ color: '#2D2D49' }}>{item.pharmacies}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="h-4 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(item.pharmacies / maxPharmacy) * 100}%`,
                      backgroundColor: '#0B6B6B'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Searched Medicines */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6" style={{ color: '#2D2D49' }}>
            Most Searched Medicines
          </h2>
          <div className="space-y-4">
            {mostSearched.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{item.name}</span>
                  <span className="text-sm font-bold" style={{ color: '#2D2D49' }}>{item.searches.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(item.searches / mostSearched[0].searches) * 100}%`,
                      backgroundColor: '#2BB673'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Most Active Cities */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-6" style={{ color: '#2D2D49' }}>
          Most Active Cities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {activeCities.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(11, 107, 107, 0.1)' }}>
                <span className="text-2xl font-bold" style={{ color: '#0B6B6B' }}>{item.activity}</span>
              </div>
              <p className="text-sm font-semibold" style={{ color: '#2D2D49' }}>{item.city}</p>
              <p className="text-xs" style={{ color: '#1A1A1A' }}>{item.activity}% activity</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Medicines */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6" style={{ color: '#2D2D49' }}>
            Top 5 Medicines
          </h2>
          <div className="space-y-3">
            {mostSearched.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#F6F8FA' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(11, 107, 107, 0.1)' }}>
                    <span className="text-sm font-bold" style={{ color: '#0B6B6B' }}>{index + 1}</span>
                  </div>
                  <span className="font-medium" style={{ color: '#2D2D49' }}>{item.name}</span>
                </div>
                <span className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{item.searches.toLocaleString()} searches</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Pharmacies */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6" style={{ color: '#2D2D49' }}>
            Top 5 Pharmacies
          </h2>
          <div className="space-y-3">
            {topPharmacies.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#F6F8FA' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(43, 182, 115, 0.1)' }}>
                    <span className="text-sm font-bold" style={{ color: '#2BB673' }}>{index + 1}</span>
                  </div>
                  <div>
                    <span className="font-medium block" style={{ color: '#2D2D49' }}>{item.name}</span>
                    <span className="text-xs" style={{ color: '#1A1A1A' }}>⭐ {item.rating}</span>
                  </div>
                </div>
                <span className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{item.orders} orders</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminReports



