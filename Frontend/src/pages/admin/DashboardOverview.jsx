import React from 'react'
import { 
  Building2, 
  Pill, 
  Users, 
  Clock, 
  TrendingUp, 
  Map, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react'

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
  const totalStock = stockStatus.available + stockStatus.outOfStock
  const availablePercentage = (stockStatus.available / totalStock) * 100

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#2D2D49] tracking-tight">
            Admin <span className="text-brand-600">Console</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Real-time analytics for the MedFinder platform.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-brand-50 px-4 py-2 rounded-2xl text-brand-700 font-bold text-sm">
          <TrendingUp size={18} />
          Platform activity is up 12% this week
        </div>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Pharmacies" 
          value={stats.totalPharmacies} 
          icon={<Building2 size={24}/>} 
          color="brand" 
        />
        <StatCard 
          label="Total Medicines" 
          value={stats.totalMedicines} 
          icon={<Pill size={24}/>} 
          color="green" 
        />
        <StatCard 
          label="Registered Users" 
          value={stats.registeredUsers.toLocaleString()} 
          icon={<Users size={24}/>} 
          color="indigo" 
        />
        <StatCard 
          label="Pending Approvals" 
          value={stats.pendingApprovals} 
          icon={<Clock size={24}/>} 
          color="amber" 
          pulse 
        />
      </div>

      {/* Analytics Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Geographic Distribution */}
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] shadow-xl shadow-brand-900/5 border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-brand-50 rounded-2xl text-brand-600">
              <Map size={24} />
            </div>
            <h2 className="text-2xl font-black text-[#2D2D49]">Regional Density</h2>
          </div>
          
          <div className="space-y-6">
            {pharmaciesByCity.map((item, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-[#2D2D49]">{item.city}</span>
                  <span className="text-sm font-black text-brand-600 bg-brand-50 px-3 py-1 rounded-lg">
                    {item.count} Units
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 to-indigo-500 rounded-full transition-all duration-1000 group-hover:brightness-110"
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Stock Status */}
        <div className="lg:col-span-5 bg-white rounded-[2.5rem] shadow-xl shadow-brand-900/5 border border-gray-100 p-8 flex flex-col">
          <h2 className="text-2xl font-black text-[#2D2D49] mb-8 text-center">Stock Health</h2>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-56 h-56">
              {/* SVG Donut Chart */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="112" cy="112" r="90"
                  fill="none" stroke="#F1F5F9" strokeWidth="24"
                />
                <circle
                  cx="112" cy="112" r="90"
                  fill="none" stroke="#2BB673" strokeWidth="24"
                  strokeDasharray={`${2 * Math.PI * 90}`}
                  strokeDashoffset={`${2 * Math.PI * 90 * (1 - stockStatus.available / totalStock)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-[#2D2D49]">{Math.round(availablePercentage)}%</span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">In Stock</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mt-10">
              <div className="p-4 rounded-3xl bg-green-50 border border-green-100 text-center">
                <p className="text-xs font-bold text-green-600 uppercase mb-1">Available</p>
                <p className="text-xl font-black text-green-700">{stockStatus.available}</p>
              </div>
              <div className="p-4 rounded-3xl bg-red-50 border border-red-100 text-center">
                <p className="text-xs font-bold text-red-600 uppercase mb-1">Out of Stock</p>
                <p className="text-xl font-black text-red-700">{stockStatus.outOfStock}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Table */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-brand-900/5 border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-xl font-black text-[#2D2D49]">Recent Registrations</h2>
          <button className="text-sm font-bold text-brand-600 hover:underline">View All Activity</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Entry Type</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Entity Name</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Pharmacy Group</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentRegistrations.map((item) => (
                <tr key={item.id} className="hover:bg-brand-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                      item.type === 'Pharmacy' ? 'bg-indigo-100 text-indigo-700' : 'bg-brand-100 text-brand-700'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-bold text-[#2D2D49]">{item.name}</td>
                  <td className="px-8 py-5 text-gray-500 font-medium">{item.pharmacy || '—'}</td>
                  <td className="px-8 py-5 text-gray-400 font-bold text-sm">{item.date}</td>
                  <td className="px-8 py-5">
                    <div className={`flex items-center gap-2 font-black text-sm ${
                      item.status === 'Approved' ? 'text-green-500' : 'text-amber-500'
                    }`}>
                      {item.status === 'Approved' ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>}
                      {item.status}
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

// Sub-component for Stats
const StatCard = ({ label, value, icon, color, pulse = false }) => {
  const colors = {
    brand: 'bg-brand-50 text-brand-600',
    green: 'bg-green-50 text-green-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    amber: 'bg-amber-50 text-amber-600'
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl shadow-brand-900/5 border border-gray-100 hover:scale-[1.02] transition-transform cursor-default">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl ${colors[color]} ${pulse ? 'animate-pulse' : ''}`}>
          {icon}
        </div>
      </div>
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl font-black text-[#2D2D49]">{value}</p>
    </div>
  )
}

export default DashboardOverview