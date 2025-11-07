import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LocationPicker from '../components/LocationPicker'
import { useTheme } from '../context/ThemeContext'

const RegisterPharmacy = () => {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mapChecked, setMapChecked] = useState(false);

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
    mapVerified : false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0] || null
      })
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send the data to a backend API
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-16 px-4" style={{ backgroundColor: theme.background }}>
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${theme.primary}15` }}>
              <svg className="w-12 h-12" style={{ color: theme.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#2D2D49' }}>
              Your pharmacy registration has been submitted for review.
            </h2>
            <p className="text-lg mb-8" style={{ color: '#1A1A1A' }}>
              You'll receive an email once approved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 rounded-lg font-semibold transition-colors"
                style={{ 
                  backgroundColor: theme.primary,
                  color: theme.text
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = theme.secondary}
                onMouseLeave={(e) => e.target.style.backgroundColor = theme.primary}
              >
                Back to Home
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3 rounded-lg font-semibold transition-colors border-2"
                style={{ 
                  borderColor: theme.primary,
                  color: theme.primary,
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = `${theme.primary}15`; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; }}
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: theme.background }}>
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#2D2D49' }}>
            🩺 Register Your Pharmacy
          </h1>
          <p className="text-xl" style={{ color: '#1A1A1A' }}>
            Join MedFinder Ethiopia and make your medicines searchable to millions of users.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Pharmacy Name */}
                <div>
                  <label htmlFor="pharmacyName" className="block mb-2 font-semibold flex items-center" style={{ color: '#2D2D49' }}>
                    <svg className="w-5 h-5 mr-2" style={{ color: theme.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    Pharmacy Name
                  </label>
                  <input
                    type="text"
                    id="pharmacyName"
                    name="pharmacyName"
                    value={formData.pharmacyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                    style={{ 
                      color: '#1A1A1A',
                      borderColor: '#E5E7EB'
                    }}
                    onFocus={(e) => e.target.style.borderColor = theme.primary}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                    placeholder="Enter your pharmacy name"
                  />
                </div>

                {/* Owner's Full Name */}
                <div>
                  <label htmlFor="ownerName" className="block mb-2 font-semibold flex items-center" style={{ color: '#2D2D49' }}>
                    <svg className="w-5 h-5 mr-2" style={{ color: theme.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Owner's Full Name
                  </label>
                  <input
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                    style={{ 
                      color: '#1A1A1A',
                      borderColor: '#E5E7EB'
                    }}
                    onFocus={(e) => e.target.style.borderColor = theme.primary}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                    placeholder="Enter owner's full name"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block mb-2 font-semibold flex items-center" style={{ color: '#2D2D49' }}>
                    <svg className="w-5 h-5 mr-2" style={{ color: theme.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                    style={{ 
                      color: '#1A1A1A',
                      borderColor: '#E5E7EB'
                    }}
                    onFocus={(e) => e.target.style.borderColor = theme.primary}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block mb-2 font-semibold flex items-center" style={{ color: '#2D2D49' }}>
                    <svg className="w-5 h-5 mr-2" style={{ color: theme.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                    style={{ 
                      color: '#1A1A1A',
                      borderColor: '#E5E7EB'
                    }}
                    onFocus={(e) => e.target.style.borderColor = theme.primary}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                    placeholder="+251 XXX XXX XXX"
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block mb-2 font-semibold flex items-center" style={{ color: '#2D2D49' }}>
                    <svg className="w-5 h-5 mr-2" style={{ color: theme.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                    style={{ 
                      color: '#1A1A1A',
                      borderColor: '#E5E7EB'
                    }}
                    onFocus={(e) => e.target.style.borderColor = theme.primary}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                    placeholder="Enter password"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block mb-2 font-semibold flex items-center" style={{ color: '#2D2D49' }}>
                    <svg className="w-5 h-5 mr-2" style={{ color: theme.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                    style={{ 
                      color: '#1A1A1A',
                      borderColor: '#E5E7EB'
                    }}
                    onFocus={(e) => e.target.style.borderColor = theme.primary}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                    placeholder="Confirm password"
                  />
                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-sm mt-1" style={{ color: '#EF4444' }}>Passwords do not match</p>
                  )}
                </div>

                {/* City / Location */}
                <div>
                  <label htmlFor="city" className="block mb-2 font-semibold flex items-center" style={{ color: '#2D2D49' }}>
                    <svg className="w-5 h-5 mr-2" style={{ color: theme.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    City / Location
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                    style={{ 
                      color: '#1A1A1A',
                      borderColor: '#E5E7EB',
                      backgroundColor: 'white'
                    }}
                    onFocus={(e) => e.target.style.borderColor = theme.primary}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  >
                    <option value="">Select City</option>
                    <option value="addis-ababa">Addis Ababa</option>
                     <option value="Debre-Birhan">Debre Birhan</option>
                    <option value="dire-dawa">Dire Dawa</option>
                    <option value="bahir-dar">Bahir Dar</option>
                    <option value="mekelle">Mekelle</option>
                    <option value="awassa">Awassa</option>
                    <option value="gondar">Gondar</option>
                    <option value="harar">Harar</option>
                    <option value="jimma">Jimma</option>
                    <option value="other">Other</option>
                  </select>
                </div>

          {/* Pharmacy Location Verification */}
<div>
  <label className="block mb-2 font-semibold flex items-center" style={{ color: '#2D2D49' }}>
    <svg className="w-5 h-5 mr-2" style={{ color: '#0B6B6B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    Verify Your Pharmacy Location
  </label>

  <div className="flex flex-col gap-3">
    {/* Pharmacy Name */}
    <input
      type="text"
      name="pharmacyName"
      value={formData.pharmacyName}
      onChange={handleChange}
      placeholder="Enter Pharmacy Name"
      className="w-full px-4 py-3 rounded-lg border-2 outline-none"
      style={{ borderColor: '#E5E7EB', color: '#1A1A1A' }}
      required
    />

   
    
    {/* Check Map Button */}
    <button
      type="button"
      onClick={() => {
        if (!formData.pharmacyName || !formData.city) {
          alert("Please enter Pharmacy Name and select City first!");
          return;
        }
        const query = encodeURIComponent(`${formData.pharmacyName} ${formData.city}`);
        window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
      }}
      className="px-4 py-3 rounded-lg font-semibold text-white"
      style={{ backgroundColor: theme.primary }}
      onMouseEnter={(e) => e.target.style.backgroundColor = theme.secondary}
      onMouseLeave={(e) => e.target.style.backgroundColor = theme.primary}
    >
      Check on Map
    </button>

    {/* Checkbox */}
    <div className="flex items-center gap-2 mt-2">
      <input
        type="checkbox"
        name="mapVerified"
        checked={formData.mapVerified}
        onChange={handleChange}
        required
        className="w-5 h-5"
        style={{ accentColor: theme.primary }}
      />
      <label style={{ color: '#1A1A1A' }}>
        I have checked my pharmacy location on Google Maps
      </label>
    </div>
  </div>
</div>



                {/* License Number */}
                <div>
                  <label htmlFor="licenseNumber" className="block mb-2 font-semibold flex items-center" style={{ color: '#2D2D49' }}>
                    <svg className="w-5 h-5 mr-2" style={{ color: theme.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    License Number
                  </label>
                  <input
                    type="text"
                    id="licenseNumber"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                    style={{ 
                      color: '#1A1A1A',
                      borderColor: '#E5E7EB'
                    }}
                    onFocus={(e) => e.target.style.borderColor = theme.primary}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                    placeholder="Enter pharmacy license number"
                  />
                </div>

                {/* Upload Pharmacy License Document */}
                <div>
                  <label htmlFor="licenseDocument" className="block mb-2 font-semibold flex items-center" style={{ color: '#2D2D49' }}>
                    <svg className="w-5 h-5 mr-2" style={{ color: theme.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload Pharmacy License Document
                  </label>
                  <input
                    type="file"
                    id="licenseDocument"
                    name="licenseDocument"
                    onChange={handleChange}
                    required
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                    style={{ 
                      color: '#1A1A1A',
                      borderColor: '#E5E7EB'
                    }}
                  />
                  <p className="text-sm mt-1" style={{ color: '#1A1A1A' }}>
                    Accepted formats: PDF, JPG, PNG (Max size: 5MB)
                  </p>
                  {formData.licenseDocument && (
                    <p className="text-sm mt-1" style={{ color: theme.primary }}>
                      Selected: {formData.licenseDocument.name}
                    </p>
                  )}
                </div>

                {/* Upload Pharmacy Image or Logo */}
                <div>
                  <label htmlFor="pharmacyImage" className="block mb-2 font-semibold flex items-center" style={{ color: '#2D2D49' }}>
                    <svg className="w-5 h-5 mr-2" style={{ color: theme.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Upload Pharmacy Image or Logo (Optional)
                  </label>
                  <input
                    type="file"
                    id="pharmacyImage"
                    name="pharmacyImage"
                    onChange={handleChange}
                    accept=".jpg,.jpeg,.png"
                    className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors"
                    style={{ 
                      color: '#1A1A1A',
                      borderColor: '#E5E7EB'
                    }}
                  />
                  <p className="text-sm mt-1" style={{ color: '#1A1A1A' }}>
                    Accepted formats: JPG, PNG (Max size: 2MB)
                  </p>
                  {formData.pharmacyImage && (
                    <p className="text-sm mt-1" style={{ color: theme.primary }}>
                      Selected: {formData.pharmacyImage.name}
                    </p>
                  )}
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    className="mt-1 mr-3 w-5 h-5"
                    style={{ accentColor: theme.primary }}
                  />
                  <label htmlFor="agreeToTerms" className="flex-1" style={{ color: '#1A1A1A' }}>
                    I agree to the <a href="#terms" className="underline" style={{ color: theme.primary }}>Terms & Conditions</a> and confirm my pharmacy is licensed.
                  </label>
                </div>

                {/* Pharmacy Location */}
                  <div>
                    <label className="block mb-2 font-semibold flex items-center" style={{ color: '#2D2D49' }}>
                      <svg className="w-5 h-5 mr-2" style={{ color: theme.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Select Your Pharmacy Location on Map
                    </label>
                    <LocationPicker onLocationSelect={(location) => setFormData({ ...formData, lat: location.lat, lng: location.lng })} />

                    {formData.lat && formData.lng && (
                    <p className="text-sm mt-2" style={{ color: theme.primary }}>
                      Selected Location: Lat {formData.lat.toFixed(5)}, Lng {formData.lng.toFixed(5)}
                    </p>
                    )}
                  </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors"
                  style={{ 
                    backgroundColor: '#0B6B6B',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#095555'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#0B6B6B'}
                >
                  Register Pharmacy
                </button>
              </form>
            </div>
          </div>

          {/* Right Side Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-8 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: `${theme.primary}15` }}>
                  <svg className="w-20 h-20" style={{ color: theme.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#2D2D49' }}>
                  Join Our Network
                </h3>
                <p className="leading-relaxed" style={{ color: '#1A1A1A' }}>
                  MedFinder Ethiopia connects your pharmacy to thousands of patients looking for medicines near them.
                </p>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1" style={{ backgroundColor: `${theme.primary}15` }}>
                    <svg className="w-4 h-4" style={{ color: theme.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm flex-1" style={{ color: '#1A1A1A' }}>Increase your pharmacy visibility</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1" style={{ backgroundColor: `${theme.primary}15` }}>
                    <svg className="w-4 h-4" style={{ color: theme.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm flex-1" style={{ color: '#1A1A1A' }}>Reach more customers in your area</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1" style={{ backgroundColor: `${theme.primary}15` }}>
                    <svg className="w-4 h-4" style={{ color: theme.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm flex-1" style={{ color: '#1A1A1A' }}>Free registration and easy management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPharmacy


