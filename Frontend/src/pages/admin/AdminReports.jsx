import React from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Map, 
  Medal, 
  Search, 
  ArrowUpRight, 
  Star 
} from 'lucide-react'

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
  const maxSearches = mostSearched[0].searches

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* Header with Export Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#2D2D49] tracking-tight">Performance <span className="text-emerald-500">Insights</span></h1>
          <p className="text-gray-500 font-medium mt-1">Detailed analysis of platform growth and consumer behavior.</p>
        </div>
        <button className="bg-white border-2 border-gray-100 text-[#2D2D49] font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
          <ArrowUpRight size={18} className="text-emerald-500" />
          Export PDF Report
        </button>
      </div>

      {/* Primary Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Growth Chart - Take up 7/12 columns */}
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] shadow-xl shadow-brand-900/5 border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                <BarChart3 size={24} />
              </div>
              <h2 className="text-2xl font-black text-[#2D2D49]">Pharmacy Growth</h2>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Growth Rate</span>
              <p className="text-emerald-500 font-black">+24%</p>
            </div>
          </div>
          
          <div className="flex items-end justify-between h-48 gap-2 px-2">
            {monthlySignups.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div 
                  className="w-full max-w-[40px] bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-xl transition-all duration-700 group-hover:brightness-110 relative"
                  style={{ height: `${(item.pharmacies / maxPharmacy) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#2D2D49] text-white text-[10px] font-bold py-1 px-2 rounded">
                    {item.pharmacies}
                  </div>
                </div>
                <span className="mt-4 text-xs font-bold text-gray-400 uppercase">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Most Searched - Take up 5/12 columns */}
        <div className="lg:col-span-5 bg-[#2D2D49] rounded-[2.5rem] shadow-xl p-8 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-white/10 text-emerald-400 rounded-2xl">
              <Search size={24} />
            </div>
            <h2 className="text-2xl font-black">Top Searches</h2>
          </div>
          
          <div className="space-y-5">
            {mostSearched.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-300">{item.name}</span>
                  <span className="font-black text-emerald-400">{item.searches.toLocaleString()}</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                    style={{ width: `${(item.searches / maxSearches) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geographic & Leaderboard Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* City Activity - Using the 1st column */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-brand-900/5 border border-gray-100 p-8">
          <h2 className="text-xl font-black text-[#2D2D49] mb-8 flex items-center gap-2">
            <Map size={20} className="text-violet-500" /> Regional Pulse
          </h2>
          <div className="space-y-6">
            {activeCities.slice(0, 4).map((item, index) => (
              <div key={index} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 font-black">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-bold text-[#2D2D49]">{item.city}</p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{item.activity}% Volume</p>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-emerald-500 animate-pulse' : 'bg-gray-200'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Top Pharmacies - Spans 2 columns on large screens */}
        <div className="xl:col-span-2 bg-white rounded-[2.5rem] shadow-xl shadow-brand-900/5 border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-xl font-black text-[#2D2D49] flex items-center gap-2">
              <Medal size={20} className="text-amber-500" /> Leading Partners
            </h2>
            <TrendingUp size={20} className="text-gray-300" />
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {topPharmacies.slice(0, 4).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-5 rounded-3xl bg-gray-50/50 hover:bg-white hover:shadow-lg hover:shadow-brand-900/5 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-white rounded-2xl border-2 border-gray-100 flex items-center justify-center text-xl font-black text-[#2D2D49]">
                      {item.name[0]}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-amber-400 text-white p-1 rounded-lg">
                      <Star size={10} fill="currentColor" />
                    </div>
                  </div>
                  <div>
                    <p className="font-black text-[#2D2D49] text-sm">{item.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                       <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md uppercase">
                         {item.orders} Orders
                       </span>
                       <span className="text-[10px] font-black text-gray-400">
                         {item.rating} Rating
                       </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminReports