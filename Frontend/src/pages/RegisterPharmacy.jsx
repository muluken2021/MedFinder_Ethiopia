import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  Building2, User, Mail, Phone, Lock, MapPin, 
  FileText, Image as ImageIcon, CheckCircle2, 
  ArrowRight, ShieldCheck, Upload, AlertCircle, Loader2
} from 'lucide-react';

const RegisterPharmacy = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    pharmacyName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    city: '',
    address: '',
    licenseNumber: '',
    licenseDocument: null,
    pharmacyImage: null,
    agreeToTerms: false,
    mapVerified: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] || null });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsPending(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if ((key === 'licenseDocument' || key === 'pharmacyImage') && value instanceof File) {
            data.append(key, value);
          } else if (typeof value === 'boolean') {
            data.append(key, value ? 'true' : 'false');
          } else {
            data.append(key, value);
          }
        }
      });

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || 'Server error occurred during registration.');
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsPending(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="max-w-xl w-full bg-white rounded-[3rem] shadow-2xl shadow-brand-900/5 p-12 text-center border border-gray-100">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} className="text-brand-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Received</h2>
          <p className="text-gray-500 mb-10 leading-relaxed font-medium">
            Your pharmacy registration has been submitted for verification. 
            Our medical board will review your license within 24-48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 rounded-2xl font-bold bg-gray-900 text-white hover:bg-gray-800 transition-all flex-1"
            >
              Back to Home
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 rounded-2xl font-bold border-2 border-brand-600 text-brand-600 hover:bg-brand-50 transition-all flex-1"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans ">
      <div className=" ">
        <div className="text-center mb-16 bg-brand-700 py-30 px-6">
         
          <h1 className=" text-4xl md:text-5xl font-bold text-gray-200 mb-4 tracking-tight ">
            Register Your Pharmacy
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto font-medium">
            Join Ethiopia’s leading medicine network. Expand your reach and help 
            thousands of patients find life-saving medications.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="pb-20 px-4 lg:px-20">
          {/* Section 1: Core Account Details */}
          <div className="bg-gray-50 border rounded-2xl border-gray-200 p-4 md:p-12">
            <h3 className="text-lg font-bold text-gray-900 mb-8 flex items-center gap-2">
              Account Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput label="Pharmacy Name" name="pharmacyName" icon={<Building2 size={20} />} value={formData.pharmacyName} onChange={handleChange} placeholder="e.g. Abyssinia Pharmacy" required />
              <FormInput label="Owner's Full Name" name="ownerName" icon={<User size={20} />} value={formData.ownerName} onChange={handleChange} placeholder="Abebe Bikila" required />
              <FormInput label="Email Address" name="email" type="email" icon={<Mail size={20} />} value={formData.email} onChange={handleChange} placeholder="contact@pharmacy.com" required />
              <FormInput label="Phone Number" name="phone" type="tel" icon={<Phone size={20} />} value={formData.phone} onChange={handleChange} placeholder="+251 ..." required />
              <FormInput label="Password" name="password" type="password" icon={<Lock size={20} />} value={formData.password} onChange={handleChange} placeholder="••••••••" required />
              <FormInput label="Confirm Password" name="confirmPassword" type="password" icon={<Lock size={20} />} value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" required />
            </div>
          </div>

          {/* Section 2: Location & Verification */}
          <div className="bg-white rounded-2xl border-gray-200  border p-4 md:p-12">
            <h3 className="text-lg font-bold text-gray-900 mb-8 flex items-center gap-2">
              Pharmacy Location
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">City / Region</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-300 outline-none focus:border-0 focus:ring-2 focus:ring-brand-600/20 transition-all font-medium text-gray-700 appearance-none"
                  >
                    <option value="">Select City</option>
                    <option value="addis-ababa">Addis Ababa</option>
                    <option value="Debre-Birhan">Debre Birhan</option>
                    <option value="dire-dawa">Dire Dawa</option>
                    <option value="bahir-dar">Bahir Dar</option>
                  </select>
                </div>
              </div>

              

            <FormInput label="Full Address" name="address" icon={""} value={formData.address} onChange={handleChange} placeholder="Subcity, Woreda, Specific Building..." required isTextArea />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col justify-end">
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Locate your location</label>
                   <button
                    type="button"
                    onClick={() => {
                      const url = `https://www.google.com/maps/search/${encodeURIComponent(formData.pharmacyName + ' ' + formData.city)}`
                      window.open(url, '_blank')
                    }}
                    className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-brand-50 text-brand-600 font-bold hover:bg-brand-100 transition-all text-sm"
                  >
                    <MapPin size={18} /> Locate on Google Maps
                  </button>
                </div>
              </div>
             
            </div>
          </div>

          {/* Section 3: Legal Compliance */}
          <div className="bg-white  border rounded-2xl border-gray-200 p-4 md:p-12">
            <h3 className="text-lg font-bold text-gray-900 mb-8 flex items-center gap-2">
              Regulatory Documents
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormInput label="License Number" name="licenseNumber" icon={<FileText size={20} />} value={formData.licenseNumber} onChange={handleChange} placeholder="EPRA/000/000" required />
              
              <div className="space-y-4">
                 <label className="block text-sm font-bold text-gray-700 ml-1">License Document (PDF/JPG)</label>
                 <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="text-xs text-gray-500 font-bold">{formData.licenseDocument ? formData.licenseDocument.name : "Click to upload license"}</p>
                    </div>
                    <input type="file" name="licenseDocument" className="hidden" onChange={handleChange} accept=".pdf,.jpg,.jpeg,.png" required />
                 </label>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold flex items-center gap-3">
              <AlertCircle size={20} /> {error}
            </div>
          )}

          {/* Finalize */}
          <div className="flex flex-col items-center gap-6 pt-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                name="agreeToTerms" 
                checked={formData.agreeToTerms} 
                onChange={handleChange} 
                required 
                className="w-5 h-5 rounded-md border-gray-300 text-brand-600 focus:ring-brand-600"
              />
              <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                I agree to the <span className="text-brand-600 underline">Terms of Service</span> and medical data privacy policies.
              </span>
            </label>

            <button
              type="submit"
              disabled={isPending}
              className="cursor-pointer w-full md:w-auto px-16 py-5 rounded-2xl bg-brand-600 text-white font-black text-lg hover:bg-brand-700 transition-all flex items-center justify-center gap-3 disabled:opacity-70 active:scale-95"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" /> Processing Application...
                </>
              ) : (
                <>
                  Register Pharmacy <ArrowRight size={22} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Component
const FormInput = ({ label, name, icon, value, onChange, placeholder, type = "text", required = false, isTextArea = false }) => (
  <div className="space-y-2">
    <label className="block text-sm font-bold text-gray-700 ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-600 transition-colors">
        {icon}
      </div>
      {isTextArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-300 outline-none focus:border-0 focus:ring-2 focus:ring-brand-600/20 transition-all font-medium text-gray-900 placeholder:text-gray-400 min-h-[120px]"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-300 outline-none focus:border-0 focus:ring-2 focus:ring-brand-600/20 transition-all font-medium text-gray-900 placeholder:text-gray-400"
        />
      )}
    </div>
  </div>
);

export default RegisterPharmacy;