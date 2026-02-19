import React, { useState } from 'react'
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  FileText, 
  ClipboardCheck, 
  MapPin, 
  Phone, 
  Mail,
  Calendar,
  Search,
  ArrowRight
} from 'lucide-react'

const AdminApprovals = () => {
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
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

  const handleAction = (id, newStatus) => {
    setRequests(requests.map(r => 
      r.id === id ? { ...r, status: newStatus } : r
    ))
    setShowDetailsModal(false)
  }

  const pendingCount = requests.filter(r => r.status === 'Awaiting Review').length

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header with Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#2D2D49] tracking-tight">Compliance <span className="text-brand-600">Queue</span></h1>
          <p className="text-gray-500 font-medium mt-1">Verification required for {pendingCount} new submissions.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-amber-50 border border-amber-100 px-6 py-3 rounded-2xl flex items-center gap-3">
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-700 font-bold text-sm">{pendingCount} Pending</span>
          </div>
        </div>
      </div>

      {/* Grid of Pending Requests */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {requests.filter(r => r.status === 'Awaiting Review').map((request) => (
          <div key={request.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-brand-900/5 overflow-hidden group hover:border-brand-200 transition-all duration-300">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest ${
                  request.type.includes('Pharmacy') ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {request.type}
                </div>
                <div className="flex items-center gap-2 text-gray-400 font-bold text-xs">
                  <Calendar size={14} /> {request.submissionDate}
                </div>
              </div>

              <h3 className="text-2xl font-black text-[#2D2D49] mb-4 group-hover:text-brand-600 transition-colors">
                {request.pharmacyName || request.medicineName}
              </h3>

              <div className="space-y-3 mb-8">
                {request.licenseNumber && (
                  <div className="flex items-center gap-3 text-gray-500 font-medium">
                    <FileText size={18} className="text-brand-500" />
                    License: <span className="text-[#2D2D49] font-bold">{request.licenseNumber}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-gray-500 font-medium">
                  <MapPin size={18} className="text-brand-500" />
                  {request.city || 'Central Database'}
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => { setSelectedRequest(request); setShowDetailsModal(true); }}
                  className="flex-[2] bg-[#2D2D49] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-brand-600 transition-all active:scale-95"
                >
                  <Eye size={18} /> Review Details
                </button>
                <button 
                  onClick={() => handleAction(request.id, 'Approved')}
                  className="flex-1 bg-emerald-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-emerald-200"
                >
                  <CheckCircle size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Audit Log (Approved Items) */}
      <section className="pt-10 border-t border-gray-100">
        <h2 className="text-2xl font-black text-[#2D2D49] mb-6 flex items-center gap-3">
          <ClipboardCheck className="text-emerald-500" /> 
          Verified Today
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {requests.filter(r => r.status === 'Approved').map((request) => (
            <div key={request.id} className="bg-gray-50/50 border border-dashed border-gray-200 rounded-[1.5rem] p-6 flex items-center justify-between">
              <div>
                <p className="font-black text-[#2D2D49]">{request.pharmacyName || request.medicineName}</p>
                <p className="text-xs font-bold text-emerald-600 uppercase mt-1">Activation Complete</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle size={20} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- INSPECTION MODAL --- */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#2D2D49]/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowDetailsModal(false)} />
          
          <div className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 slide-in-from-top-4 duration-300">
            {/* Modal Header */}
            <div className="bg-brand-600 p-10 text-white relative">
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <XCircle size={24} />
              </button>
              <p className="text-brand-100 font-black uppercase tracking-[0.2em] text-xs mb-2">Request Verification</p>
              <h3 className="text-4xl font-black">{selectedRequest.pharmacyName || selectedRequest.medicineName}</h3>
            </div>

            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left Column: Data */}
              <div className="space-y-6">
                <InfoGroup icon={<UserCircle size={20} />} label="Owner/Submitter" value={selectedRequest.ownerName || 'System Admin'} />
                <InfoGroup icon={<Mail size={20} />} label="Official Email" value={selectedRequest.email || 'N/A'} />
                <InfoGroup icon={<Phone size={20} />} label="Direct Line" value={selectedRequest.phone || 'N/A'} />
                <InfoGroup icon={<MapPin size={20} />} label="Physical Location" value={selectedRequest.address || 'N/A'} />
              </div>

              {/* Right Column: Meta & Actions */}
              <div className="bg-gray-50 rounded-[2rem] p-8 space-y-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm">
                  <p className="text-xs font-black text-gray-400 uppercase mb-3">Submission Summary</p>
                  <p className="text-[#2D2D49] font-bold italic leading-relaxed">
                    {selectedRequest.changes || "Initial registration for a new pharmacy entity in the " + selectedRequest.city + " region."}
                  </p>
                </div>

                <div className="pt-4 space-y-3">
                  <button 
                    onClick={() => handleAction(selectedRequest.id, 'Approved')}
                    className="w-full bg-emerald-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-600 shadow-xl shadow-emerald-500/20"
                  >
                    Confirm Approval
                  </button>
                  <button 
                    onClick={() => handleAction(selectedRequest.id, 'Rejected')}
                    className="w-full bg-white text-red-500 border-2 border-red-50 font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-red-50 transition-colors"
                  >
                    Decline Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Utility components
const InfoGroup = ({ icon, label, value }) => (
  <div className="flex gap-4">
    <div className="w-10 h-10 bg-brand-50 text-brand-500 rounded-xl flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{label}</p>
      <p className="text-[#2D2D49] font-bold">{value}</p>
    </div>
  </div>
)

const UserCircle = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
)

export default AdminApprovals