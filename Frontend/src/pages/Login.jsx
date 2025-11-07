import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import heroimg from '../assets/login.png'

const Login = () => {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'pharmacy'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) setErrors({ ...errors, [name]: '' })
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'

    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const res = await fetch(`http://localhost:5000/api/${formData.userType}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      })
      const data = await res.json()
      if (!res.ok) {
        setErrors({ general: data.message || 'Login failed' })
        return
      }
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', formData.userType)
      localStorage.setItem('userName', data.pharmacyName || data.adminName)

      if (formData.userType === 'pharmacy') navigate('/dashboard')
      else if (formData.userType === 'admin') navigate('/admin')
    } catch (err) {
      console.error(err)
      setErrors({ general: 'Server error. Please try again later.' })
    }
  }

  return (
    <div className="pb-2 flex flex-col md:flex-row bg-gray-50">
      {/* Right: Image - hidden on mobile */}
     <div className="md:w-1/2 hidden md:block relative">
      <img
        src={heroimg}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
    
  </div>
      {/* Left: Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 w-full">
        <div className="max-w-md w-full">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#2D2D49' }}>
              Welcome Back
            </h1>
            <p style={{ color: '#1A1A1A' }}>
              Sign in to your account to continue
            </p>
          </div>

          {/* Login Card */}
          <div className=" py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <p className="text-red-500 text-center mb-2">{errors.general}</p>
              )}

              {/* User Type */}
              <div>
                <label
                  className="block mb-2 font-semibold"
                  style={{ color: '#2D2D49' }}
                >
                  I am a...
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['pharmacy', 'admin'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, userType: type })
                      }
                      className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                        formData.userType === type ? 'text-white' : 'border-2'
                      }`}
                      style={
                        formData.userType === type
                          ? { backgroundColor: '#0B6B6B' }
                          : { borderColor: '#E5E7EB', color: '#1A1A1A', backgroundColor: 'transparent' }
                      }
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 font-semibold"
                  style={{ color: '#2D2D49' }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  style={{
                    color: '#1A1A1A',
                    borderColor: errors.email ? '#EF4444' : '#E5E7EB',
                  }}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-sm mt-1" style={{ color: '#EF4444' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 font-semibold"
                  style={{ color: '#2D2D49' }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pr-12 rounded-lg border-2 outline-none transition-colors ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                    style={{
                      color: '#1A1A1A',
                      borderColor: errors.password ? '#EF4444' : '#E5E7EB',
                    }}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
                    style={{ color: '#1A1A1A' }}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm mt-1" style={{ color: '#EF4444' }}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors"
                style={{ backgroundColor: theme.primary, color: theme.text }}
              >
                Sign In
              </button>
            </form>

            {/* Register Link */}
            <div className="text-center mt-6">
              <p className="text-sm mb-2" style={{ color: '#1A1A1A' }}>
                {formData.userType === 'pharmacy'
                  ? "Don't have a pharmacy account?"
                  : "Don't have an account?"}
              </p>
              {formData.userType === 'pharmacy' ? (
                <Link
                  to="/register-pharmacy"
                  className="font-semibold"
                  style={{ color: theme.primary }}
                >
                  Register Your Pharmacy
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="font-semibold"
                  style={{ color: theme.primary }}
                >
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default Login
