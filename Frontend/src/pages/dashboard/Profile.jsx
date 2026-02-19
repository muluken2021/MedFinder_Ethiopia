import React, { useState } from 'react'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Lock, 
  Camera, 
  CheckCircle, 
  ShieldCheck,
  Edit2,
  X
} from 'lucide-react'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    name: 'Central Pharmacy',
    email: 'info@centralpharmacy.et',
    phone: '+251 11 123 4567',
    city: 'Addis Ababa',
    address: 'Bole Road, Addis Ababa, Ethiopia',
    licenseNumber: 'PH-LIC-2024-001'
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsEditing(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pt-8">
          <div>
            <h1 className="text-4xl font-extrabold text-[#2D2D49] tracking-tight">
              Pharmacy <span className="text-blue-600">Profile</span>
            </h1>
            <p className="text-gray-500 font-medium mt-1">Verify and manage your establishment's public credentials.</p>
          </div>
          
          {showSuccess && (
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-2xl border border-green-100 animate-in fade-in slide-in-from-top-4">
              <CheckCircle size={20} />
              <span className="font-bold">Settings Updated Successfully</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Info Card */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                      <ShieldCheck size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-[#2D2D49]">Verified Credentials</h2>
                  </div>
                  
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${
                      isEditing 
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                      : 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:scale-105'
                    }`}
                  >
                    {isEditing ? <><X size={18} /> Cancel</> : <><Edit2 size={18} /> Edit Profile</>}
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileField 
                      icon={<User size={18}/>} 
                      label="Pharmacy Name" 
                      name="name" 
                      value={formData.name} 
                      isEditing={isEditing} 
                      onChange={handleChange} 
                    />
                    <ProfileField 
                      icon={<Mail size={18}/>} 
                      label="Email Address" 
                      name="email" 
                      value={formData.email} 
                      isEditing={isEditing} 
                      onChange={handleChange} 
                    />
                    <ProfileField 
                      icon={<Phone size={18}/>} 
                      label="Contact Number" 
                      name="phone" 
                      value={formData.phone} 
                      isEditing={isEditing} 
                      onChange={handleChange} 
                    />
                    <ProfileField 
                      icon={<Award size={18}/>} 
                      label="License Number" 
                      name="licenseNumber" 
                      value={formData.licenseNumber} 
                      isEditing={isEditing} 
                      onChange={handleChange} 
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <ProfileField 
                      icon={<MapPin size={18}/>} 
                      label="City / Region" 
                      name="city" 
                      value={formData.city} 
                      isEditing={isEditing} 
                      onChange={handleChange} 
                    />
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-black text-gray-400 uppercase tracking-widest ml-1">
                        <MapPin size={14} /> Official Address
                      </label>
                      {isEditing ? (
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          rows="3"
                          className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white outline-none transition-all font-bold resize-none"
                        />
                      ) : (
                        <div className="px-5 py-4 rounded-2xl bg-gray-50/50 font-bold text-[#2D2D49]">{formData.address}</div>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-[#2BB673] text-white font-black shadow-lg shadow-green-100 hover:scale-[1.01] active:scale-95 transition-all mt-4"
                    >
                      Save Professional Changes
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Logo Upload Section */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 border border-gray-100 text-center">
              <h3 className="text-lg font-black text-[#2D2D49] mb-6">Pharmacy Identity</h3>
              <div className="relative inline-block group">
                <div className="w-32 h-32 mx-auto rounded-[2rem] bg-blue-50 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden transition-transform group-hover:scale-105">
                  <User size={48} className="text-blue-600" />
                </div>
                <label className="absolute -bottom-2 -right-2 p-3 bg-white rounded-xl shadow-md border border-gray-100 text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white transition-all">
                  <Camera size={20} />
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>
              <p className="text-xs font-bold text-gray-400 mt-6 uppercase tracking-tighter">Click icon to update brand logo</p>
            </div>

            {/* Password Update Card */}
            <div className="bg-[#2D2D49] rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6 text-blue-400">
                  <Lock size={20} />
                  <h3 className="font-black uppercase tracking-widest text-sm text-white">Security Settings</h3>
                </div>
                
                <div className="space-y-4">
                  <SidebarInput placeholder="Current Password" type="password" name="currentPassword" />
                  <SidebarInput placeholder="New Password" type="password" name="newPassword" />
                  <SidebarInput placeholder="Confirm New Password" type="password" name="confirmPassword" />
                  
                  <button className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all mt-2">
                    Update Security
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 text-white/5 rotate-12">
                <Lock size={150} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// Sub-components for cleaner code
const ProfileField = ({ label, icon, isEditing, value, onChange, name, type = "text" }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-black text-gray-400 uppercase tracking-widest ml-1">
      {icon} {label}
    </label>
    {isEditing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white outline-none transition-all font-bold text-[#1A1A1A]"
      />
    ) : (
      <div className="px-5 py-4 rounded-2xl bg-gray-50/50 font-bold text-[#2D2D49] truncate">
        {value}
      </div>
    )}
  </div>
)

const SidebarInput = (props) => (
  <input
    {...props}
    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:bg-white/20 focus:border-blue-400 outline-none text-white placeholder:text-white/30 font-medium transition-all"
  />
)

export default Profile