import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Pill, 
  PlusSquare, 
  UserCircle, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Bell,
  Settings,
  Search
} from 'lucide-react'

const DashboardLayout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const pharmacyName = 'Central Pharmacy'

  const menuItems = [
    { path: '/dashboard', label: 'Overview', icon: <LayoutDashboard size={22} /> },
    { path: '/dashboard/medicines', label: 'Inventory', icon: <Pill size={22} /> },
    { path: '/dashboard/add-medicine', label: 'Add Stock', icon: <PlusSquare size={22} /> },
    { path: '/dashboard/profile', label: 'Pharmacy Profile', icon: <UserCircle size={22} /> },
  ]

  const isActive = (path) => {
    return path === '/dashboard' 
      ? location.pathname === '/dashboard' 
      : location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* --- SIDEBAR --- */}
      <aside 
        className={`fixed left-0 top-0 h-full z-40 transition-all duration-500 ease-in-out border-r border-white/10 shadow-2xl ${
          sidebarOpen ? 'w-72' : 'w-24'
        }`}
        style={{ backgroundColor: '#2D2D49' }}
      >
        <div className="flex flex-col h-full">
          {/* Brand Logo Area */}
          <div className="h-24 flex items-center justify-between px-6 border-b border-white/5">
            {sidebarOpen && (
              <div className="flex items-center gap-3 animate-in fade-in duration-500">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/50">
                  <Pill className="text-white" size={24} />
                </div>
                <span className="text-xl font-black text-white tracking-tight">MedFinder</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all mx-auto"
            >
              {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 py-8 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className={`${isActive(item.path) ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
                  {item.icon}
                </div>
                {sidebarOpen && <span className="font-bold tracking-wide">{item.label}</span>}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-white/5 space-y-2">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all group"
            >
              <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
              {sidebarOpen && <span className="font-bold">Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className={`flex-1 transition-all duration-500 ${sidebarOpen ? 'pl-72' : 'pl-24'}`}>
        
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-[#F8FAFC]/80 backdrop-blur-md px-8 py-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm w-96">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Quick search inventory..." 
              className="bg-transparent border-none outline-none text-sm font-medium w-full"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2.5 rounded-xl bg-white border border-gray-100 text-gray-500 hover:text-blue-600 transition-all shadow-sm">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black shadow-inner">
                  {pharmacyName.charAt(0)}
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-black text-[#2D2D49] leading-tight">{pharmacyName}</p>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">Pharmacy Partner</p>
                </div>
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-[1.5rem] shadow-2xl shadow-blue-900/10 border border-gray-50 py-3 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-2 mb-2 border-b border-gray-50">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Account</p>
                  </div>
                  <DropdownLink icon={<UserCircle size={18}/>} label="My Profile" to="/dashboard/profile" />
                  <DropdownLink icon={<Settings size={18}/>} label="System Settings" to="/dashboard/profile" />
                  <hr className="my-2 border-gray-50" />
                  <button 
                    onClick={() => setShowLogoutModal(true)}
                    className="w-full flex items-center gap-3 px-4 py-2 text-red-500 font-bold hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>

      {/* --- LOGOUT MODAL --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-[#2D2D49]/60 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)} />
          <div className="relative bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl text-center">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <LogOut size={40} />
            </div>
            <h3 className="text-2xl font-black text-[#2D2D49] mb-2">Sign Out?</h3>
            <p className="text-gray-500 font-medium mb-8">You will need to login again to manage your inventory.</p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex-1 py-4 bg-red-500 text-white font-black rounded-2xl hover:bg-red-600 transition-all"
              >
                Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-4 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-all"
              >
                Stay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const DropdownLink = ({ icon, label, to }) => (
  <Link to={to} className="flex items-center gap-3 px-4 py-2.5 text-gray-600 font-bold hover:bg-blue-50 hover:text-blue-600 transition-colors">
    {icon} <span>{label}</span>
  </Link>
)

export default DashboardLayout