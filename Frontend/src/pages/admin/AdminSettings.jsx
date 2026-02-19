import React, { useState } from 'react'
import { 
  User, 
  Lock, 
  Settings, 
  Bell, 
  Mail, 
  ShieldAlert, 
  CheckCircle,
  CloudUpload,
  Save,
  Info
} from 'lucide-react'

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

  const triggerSuccess = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    // API Call Logic Here
    triggerSuccess()
  }

  const handlePasswordUpdate = (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!')
      return
    }
    triggerSuccess()
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleSiteSettingsChange = (name, value) => {
    setSiteSettings({ ...siteSettings, [name]: value })
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* Dynamic Toast Notification */}
      <div className={`fixed top-10 right-10 z-[100] flex items-center gap-3 px-6 py-4 rounded-[2rem] bg-white shadow-2xl shadow-emerald-200/50 text-emerald-600 border border-emerald-50 transition-all duration-500 ${showSuccess ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
          <CheckCircle size={18} />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-sm uppercase tracking-wider leading-none">Success</span>
          <span className="text-xs font-bold text-emerald-800/60 mt-0.5">Cloud Sync Complete</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-5xl font-black text-[#2D2D49] tracking-tighter">System <span className="text-brand-600">Config</span></h1>
          <p className="text-gray-400 font-bold mt-2 uppercase text-xs tracking-[0.2em]">Environment: Production V2.4</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pt-4">
        
        {/* Navigation Column */}
        <div className="lg:col-span-1 space-y-3">
          <SettingsTab icon={<User size={18} />} label="Personal Profile" active />
          <SettingsTab icon={<Lock size={18} />} label="Security & Keys" />
          <SettingsTab icon={<Settings size={18} />} label="Platform Rules" />
          <SettingsTab icon={<Bell size={18} />} label="Email Triggers" />
          
          <div className="mt-12 p-8 bg-[#2D2D49] rounded-[2.5rem] text-white overflow-hidden relative group">
            <Info className="absolute -right-4 -top-4 w-24 h-24 text-white/5 rotate-12 transition-transform group-hover:rotate-45" />
            <span className="font-black text-[10px] uppercase tracking-widest text-brand-400">Pro-Tip</span>
            <p className="text-xs font-medium mt-3 leading-relaxed text-white/70">
              Maintenance mode will redirect all traffic to a static landing page while you perform database migrations.
            </p>
          </div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-3 space-y-12">
          
          {/* Identity Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-1.5 h-8 bg-brand-600 rounded-full" />
              <h2 className="text-2xl font-black text-[#2D2D49]">Identity Settings</h2>
            </div>

            <div className="bg-white rounded-[3rem] shadow-xl shadow-brand-900/5 border border-gray-100 p-10">
              <form onSubmit={handleProfileUpdate} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputGroup label="Display Name" value={adminProfile.name} onChange={(v) => setAdminProfile({...adminProfile, name: v})} icon={<User size={18}/>} />
                  <InputGroup label="Email Access" value={adminProfile.email} onChange={(v) => setAdminProfile({...adminProfile, email: v})} icon={<Mail size={18}/>} />
                </div>
                <button type="submit" className="group flex items-center gap-3 bg-[#2D2D49] text-white font-black px-10 py-4 rounded-2xl hover:bg-brand-600 transition-all active:scale-95 shadow-xl shadow-brand-900/20">
                  <Save size={18} className="group-hover:rotate-12 transition-transform" /> Save Profile
                </button>
              </form>
            </div>
          </section>

          {/* Operational Rules */}
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-1.5 h-8 bg-emerald-500 rounded-full" />
              <h2 className="text-2xl font-black text-[#2D2D49]">Operational Rules</h2>
            </div>

            <div className="bg-white rounded-[3rem] shadow-xl shadow-brand-900/5 border border-gray-100 p-10 space-y-6">
              <ToggleItem 
                label="Maintenance Mode" 
                description="Disable the public pharmacy search engine."
                icon={<ShieldAlert size={20} className="text-amber-500" />}
                checked={siteSettings.maintenanceMode}
                onChange={(v) => handleSiteSettingsChange('maintenanceMode', v)}
              />
              <ToggleItem 
                label="Trust New Entities" 
                description="Automatically verify and list new pharmacies."
                icon={<CheckCircle size={20} className="text-brand-500" />}
                checked={siteSettings.autoApprovePharmacies}
                onChange={(v) => handleSiteSettingsChange('autoApprovePharmacies', v)}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

// Sub-components
const SettingsTab = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all cursor-pointer group ${active ? 'bg-white text-brand-600 shadow-xl shadow-brand-600/5 border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}>
    <div className={`${active ? 'text-brand-600' : 'text-gray-400 group-hover:text-gray-600'}`}>{icon}</div>
    <span className="text-sm">{label}</span>
  </div>
)

const InputGroup = ({ label, value, onChange, type = "text", icon }) => (
  <div className="space-y-3">
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-500 transition-colors">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] outline-none focus:bg-white focus:border-brand-500 transition-all font-bold text-[#2D2D49]"
      />
    </div>
  </div>
)

const ToggleItem = ({ label, description, checked, onChange, icon }) => (
  <div className="flex items-center justify-between p-8 rounded-[2rem] bg-gray-50/50 border border-gray-100 hover:border-brand-200 transition-all">
    <div className="flex items-center gap-6">
      <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-gray-100">
        {icon}
      </div>
      <div>
        <p className="font-black text-[#2D2D49] text-lg leading-tight">{label}</p>
        <p className="text-xs text-gray-400 font-bold mt-1 tracking-tight">{description}</p>
      </div>
    </div>
    <button 
      onClick={() => onChange(!checked)}
      className={`w-16 h-9 rounded-full transition-all duration-500 relative ${checked ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30' : 'bg-gray-200'}`}
    >
      <div className={`absolute top-1.5 w-6 h-6 bg-white rounded-full transition-all duration-500 shadow-md ${checked ? 'left-8.5' : 'left-1.5'}`} />
    </button>
  </div>
)

export default AdminSettings