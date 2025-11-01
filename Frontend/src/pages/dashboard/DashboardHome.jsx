import React from 'react'

const DashboardHome = () => {
  // Mock data
  const pharmacyName = 'Central Pharmacy'
  const stats = {
    totalMedicines: 156,
    inStock: 132,
    outOfStock: 24,
    pendingApprovals: 3
  }

  const inStockPercentage = Math.round((stats.inStock / stats.totalMedicines) * 100)
  const outOfStockPercentage = Math.round((stats.outOfStock / stats.totalMedicines) * 100)

  const summaryCards = [
    {
      title: 'Total Medicines',
      value: stats.totalMedicines,
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      color: '#0B6B6B',
      bgColor: 'rgba(11, 107, 107, 0.1)'
    },
    {
      title: 'In Stock',
      value: stats.inStock,
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      color: '#2BB673',
      bgColor: 'rgba(43, 182, 115, 0.1)'
    },
    {
      title: 'Out of Stock',
      value: stats.outOfStock,
      icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
      color: '#EF4444',
      bgColor: 'rgba(239, 68, 68, 0.1)'
    },
    {
      title: 'Pending Approvals',
      value: stats.pendingApprovals,
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.1)'
    }
  ]

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#2D2D49' }}>
          Welcome back, {pharmacyName}!
        </h1>
        <p style={{ color: '#1A1A1A' }}>Here's an overview of your pharmacy dashboard.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: card.bgColor }}>
                <svg className="w-6 h-6" style={{ color: card.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium mb-1" style={{ color: '#1A1A1A' }}>{card.title}</h3>
            <p className="text-3xl font-bold" style={{ color: '#2D2D49' }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6" style={{ color: '#2D2D49' }}>
            Stock Summary
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: '#1A1A1A' }}>In Stock</span>
                <span className="text-sm font-bold" style={{ color: '#2BB673' }}>{stats.inStock} ({inStockPercentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="h-4 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${inStockPercentage}%`,
                    backgroundColor: '#2BB673'
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: '#1A1A1A' }}>Out of Stock</span>
                <span className="text-sm font-bold" style={{ color: '#EF4444' }}>{stats.outOfStock} ({outOfStockPercentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="h-4 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${outOfStockPercentage}%`,
                    backgroundColor: '#EF4444'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart Representation */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6" style={{ color: '#2D2D49' }}>
            Stock Distribution
          </h2>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="transform -rotate-90 w-48 h-48">
                {/* Background circle */}
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="32"
                />
                {/* In Stock arc */}
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  fill="none"
                  stroke="#2BB673"
                  strokeWidth="32"
                  strokeDasharray={`${2 * Math.PI * 80 * (inStockPercentage / 100)} ${2 * Math.PI * 80}`}
                  strokeLinecap="round"
                />
                {/* Out of Stock arc */}
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="32"
                  strokeDasharray={`${2 * Math.PI * 80 * (outOfStockPercentage / 100)} ${2 * Math.PI * 80}`}
                  strokeDashoffset={`-${2 * Math.PI * 80 * (inStockPercentage / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold" style={{ color: '#2D2D49' }}>{stats.totalMedicines}</p>
                  <p className="text-sm" style={{ color: '#1A1A1A' }}>Total</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#2BB673' }}></div>
              <span className="text-sm" style={{ color: '#1A1A1A' }}>In Stock ({inStockPercentage}%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#EF4444' }}></div>
              <span className="text-sm" style={{ color: '#1A1A1A' }}>Out of Stock ({outOfStockPercentage}%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome

