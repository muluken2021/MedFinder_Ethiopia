import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { 
  LayoutDashboard, 
  Store, 
  Pill, 
  Users, 
  ClipboardCheck, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  ChevronLeft, 
  ChevronRight,
  UserCircle
} from 'lucide-react'

const AdminDashboardLayout = ({ children }) => {
  const { theme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const menuItems = [
    { path: '/admin', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/pharmacies', label: 'Pharmacies', icon: <Store size={20} /> },
    { path: '/admin/medicines', label: 'Inventory', icon: <Pill size={20} /> },
    { path: '/admin/users', label: 'User Management', icon: <Users size={20} /> },
    { path: '/admin/approvals', label: 'Pending Approvals', icon: <ClipboardCheck size={20} /> },
    { path: '/admin/reports', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { path: '/admin/settings', label: 'System Settings', icon: <Settings size={20} /> },
  ]

  const isActive = (path) => {
    return path === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen flex font-sans" style={{ backgroundColor: '#F8FAFC' }}>
      
      {/* --- Sidebar Component --- */}
      <aside 
        className={`fixed left-0 top-0 h-full transition-all duration-500 ease-in-out z-40 flex flex-col shadow-2xl ${sidebarOpen ? 'w-72' : 'w-24'}`}
        style={{ backgroundColor: '#2D2D49' }}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
          {sidebarOpen && (
            <div className="flex items-center gap-3 animate-in fade-in zoom-in duration-500">
              <div className="w-10 h-10 bg-brand-600 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-900/40">
                <Pill className="text-white" size={22} />
              </div>
              <span className="text-white font-black text-xl tracking-tighter">MedFinder</span>
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-xl bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all ${!sidebarOpen && 'mx-auto'}`}
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group relative ${
                isActive(item.path)
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className={`${isActive(item.path) ? 'text-white' : 'group-hover:text-brand-400'} transition-colors`}>
                {item.icon}
              </div>
              {sidebarOpen && <span className="font-bold text-sm tracking-wide">{item.label}</span>}
              {!sidebarOpen && (
                <div className="absolute left-20 bg-[#2D2D49] text-white px-3 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl border border-white/10">
                  {item.label}
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all group"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="font-black text-sm uppercase tracking-widest">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* --- Main Workspace --- */}
      <main className={`flex-1 flex flex-col transition-all duration-500 ${sidebarOpen ? 'ml-72' : 'ml-24'}`}>
        
        {/* Top Floating Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100 px-8 flex items-center justify-between">
          <div className="flex items-center gap-8 flex-1">
            <h2 className="text-lg font-black text-[#2D2D49] hidden lg:block uppercase tracking-wider">
              Admin <span className="text-brand-600">Console</span>
            </h2>

            {/* Global Command/Search */}
            <div className="relative max-w-md w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-600 transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Type 'ctrl + k' to search..."
                className="w-full bg-gray-100/50 border-none rounded-2xl py-2.5 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-500/20 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Notifications */}
            <button className="relative p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-all">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-brand-200 transition-all group"
              >
                <div className="w-9 h-9 bg-[#2D2D49] rounded-xl flex items-center justify-center text-white text-xs font-black shadow-md">
                  AD
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-black text-[#2D2D49] leading-none">Abebe B.</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">Super Admin</p>
                </div>
              </button>
              
              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-2 animate-in slide-in-from-top-2 duration-300">
                  <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-brand-50 rounded-2xl text-gray-700 font-bold text-sm transition-colors">
                    <UserCircle size={18} className="text-brand-500" /> Account Details
                  </Link>
                  <button onClick={() => setShowLogoutModal(true)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-2xl text-red-600 font-bold text-sm transition-colors">
                    <LogOut size={18} /> Exit System
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <section className="p-8 max-w-[1600px] mx-auto w-full">
          {children}
        </section>
      </main>

      {/* --- Logout Modal --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#2D2D49]/40 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)} />
          <div className="relative bg-white rounded-[3rem] shadow-2xl max-w-sm w-full p-10 text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <LogOut size={32} />
            </div>
            <h3 className="text-2xl font-black text-[#2D2D49] mb-2">End Session?</h3>
            <p className="text-gray-500 font-medium mb-8">You will need to re-authenticate to access the admin panel.</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 bg-red-500 text-white rounded-2xl font-black shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all active:scale-95"
              >
                Log Me Out
              </button>
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="w-full py-4 bg-gray-100 text-gray-500 rounded-2xl font-black hover:bg-gray-200 transition-all"
              >
                Stay Logged In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboardLayout