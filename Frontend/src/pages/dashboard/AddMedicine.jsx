import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusCircle, Calendar, Tag, Package, CreditCard, ChevronLeft, AlertCircle } from 'lucide-react'

const AddMedicine = () => {
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    expiryDate: '',
    status: 'available'
  })

  const categories = [
    'Pain Relief', 'Antibiotic', 'Diabetes', 'Cardiovascular', 
    'Digestive', 'Respiratory', 'Vitamins', 'Other'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg("")
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:5000/api/medicines/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity)
        })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to add medicine")

      setShowSuccess(true)
      setTimeout(() => navigate("/dashboard/medicines"), 2000)
    } catch (err) {
      setErrorMsg(err.message || "Network error. Try again!")
    } finally {
      setIsSubmitting(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation & Header */}
        <button 
          onClick={() => navigate('/dashboard/medicines')}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-semibold mb-6 transition-colors"
        >
          <ChevronLeft size={20} /> Back to Inventory
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-[#2D2D49] tracking-tight">
              Register <span className="text-blue-600">Stock</span>
            </h1>
            <p className="text-gray-500 font-medium mt-1">Update your pharmacy's digital shelf for patients.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form Entry */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-gray-100 p-8 md:p-10">
              {errorMsg && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-2xl flex items-center gap-3 text-red-700 font-medium">
                  <AlertCircle size={20} /> {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <section>
                  <h3 className="text-sm font-black uppercase tracking-widest text-blue-600 mb-6 flex items-center gap-2">
                    <Package size={16} /> Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <FormInput 
                        label="Medicine Name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="e.g., Metformin 500mg" 
                      />
                    </div>
                    <FormSelect 
                      label="Category" 
                      name="category" 
                      value={formData.category} 
                      options={categories} 
                      onChange={handleChange} 
                    />
                    <FormInput 
                      label="Price (ETB)" 
                      name="price" 
                      type="number" 
                      value={formData.price} 
                      onChange={handleChange} 
                      placeholder="0.00" 
                    />
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-black uppercase tracking-widest text-blue-600 mb-6 flex items-center gap-2">
                    <Calendar size={16} /> Supply & Expiry
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput 
                      label="Stock Quantity" 
                      name="quantity" 
                      type="number" 
                      value={formData.quantity} 
                      onChange={handleChange} 
                      placeholder="Total units" 
                    />
                    <FormInput 
                      label="Expiry Date" 
                      name="expiryDate" 
                      type="date" 
                      min={today}
                      value={formData.expiryDate} 
                      onChange={handleChange} 
                    />
                  </div>
                </section>

                <div className="flex items-center gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || showSuccess}
                    className="flex-1 py-4 px-8 rounded-2xl font-bold text-white shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                    style={{ backgroundColor: '#2BB673' }}
                  >
                    {isSubmitting ? "Adding to System..." : showSuccess ? "Success!" : "Confirm & Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right: Live Preview Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-200 overflow-hidden relative">
                <div className="relative z-10">
                  <h3 className="font-bold text-blue-100 uppercase tracking-widest text-xs mb-4">Live Inventory Preview</h3>
                  <div className="text-2xl font-black mb-1">{formData.name || "Medicine Name"}</div>
                  <div className="text-blue-100 font-medium mb-6">{formData.category || "General Category"}</div>
                  
                  <div className="space-y-4">
                    <PreviewRow icon={<CreditCard size={18}/>} label="Price" value={`${formData.price || '0'} ETB`} />
                    <PreviewRow icon={<Package size={18}/>} label="Stock" value={`${formData.quantity || '0'} Units`} />
                    <PreviewRow icon={<Calendar size={18}/>} label="Expires" value={formData.expiryDate || 'Not set'} />
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-10">
                  <PlusCircle size={200} />
                </div>
              </div>
              
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  <span className="text-blue-600 font-bold">Pro-tip:</span> Ensure you double-check the expiry date. System alerts will be sent to patients if stock is near expiry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Custom Styled Components
const FormInput = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-bold text-[#2D2D49] ml-1">{label}</label>
    <input
      {...props}
      required
      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent outline-none focus:border-blue-600/20 focus:bg-white transition-all font-medium text-[#1A1A1A] placeholder:text-gray-300"
    />
  </div>
)

const FormSelect = ({ label, options, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-bold text-[#2D2D49] ml-1">{label}</label>
    <select
      {...props}
      required
      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent outline-none focus:border-blue-600/20 focus:bg-white transition-all font-medium text-[#1A1A1A] appearance-none"
    >
      <option value="">Choose category</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
)

const PreviewRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between border-b border-white/10 pb-3">
    <div className="flex items-center gap-2 text-sm text-blue-100">
      {icon} <span>{label}</span>
    </div>
    <div className="font-bold">{value}</div>
  </div>
)

export default AddMedicine