import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'user' // 'user' or 'pharmacy'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // In a real app, this would make an API call to authenticate
    console.log('Login attempt:', formData)
    
    // Simulate successful login
    if (formData.userType === 'pharmacy') {
      navigate('/dashboard')
    } else if (formData.userType === 'admin') {
      navigate('/admin')
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ backgroundColor: '#F6F8FA' }}>
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0B6B6B' }}>
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-2xl font-bold" style={{ color: '#2D2D49' }}>MedFinder Ethiopia</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#2D2D49' }}>Welcome Back</h1>
          <p style={{ color: '#1A1A1A' }}>Sign in to your account to continue</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div>
              <label className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>
                I am a...
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'user' })}
                  className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                    formData.userType === 'user'
                      ? 'text-white'
                      : 'border-2'
                  }`}
                  style={
                    formData.userType === 'user'
                      ? { backgroundColor: '#0B6B6B' }
                      : {
                          borderColor: '#E5E7EB',
                          color: '#1A1A1A',
                          backgroundColor: 'transparent'
                        }
                  }
                  onMouseEnter={(e) => {
                    if (formData.userType !== 'user') {
                      e.target.style.borderColor = '#0B6B6B'
                      e.target.style.color = '#0B6B6B'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formData.userType !== 'user') {
                      e.target.style.borderColor = '#E5E7EB'
                      e.target.style.color = '#1A1A1A'
                    }
                  }}
                >
                  User
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'pharmacy' })}
                  className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                    formData.userType === 'pharmacy'
                      ? 'text-white'
                      : 'border-2'
                  }`}
                  style={
                    formData.userType === 'pharmacy'
                      ? { backgroundColor: '#0B6B6B' }
                      : {
                          borderColor: '#E5E7EB',
                          color: '#1A1A1A',
                          backgroundColor: 'transparent'
                        }
                  }
                  onMouseEnter={(e) => {
                    if (formData.userType !== 'pharmacy') {
                      e.target.style.borderColor = '#0B6B6B'
                      e.target.style.color = '#0B6B6B'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formData.userType !== 'pharmacy') {
                      e.target.style.borderColor = '#E5E7EB'
                      e.target.style.color = '#1A1A1A'
                    }
                  }}
                >
                  Pharmacy
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'admin' })}
                  className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                    formData.userType === 'admin'
                      ? 'text-white'
                      : 'border-2'
                  }`}
                  style={
                    formData.userType === 'admin'
                      ? { backgroundColor: '#0B6B6B' }
                      : {
                          borderColor: '#E5E7EB',
                          color: '#1A1A1A',
                          backgroundColor: 'transparent'
                        }
                  }
                  onMouseEnter={(e) => {
                    if (formData.userType !== 'admin') {
                      e.target.style.borderColor = '#0B6B6B'
                      e.target.style.color = '#0B6B6B'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formData.userType !== 'admin') {
                      e.target.style.borderColor = '#E5E7EB'
                      e.target.style.color = '#1A1A1A'
                    }
                  }}
                >
                  Admin
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>
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
                  borderColor: errors.email ? '#EF4444' : '#E5E7EB'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0B6B6B'
                  if (errors.email) setErrors({ ...errors, email: '' })
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.email ? '#EF4444' : '#E5E7EB'
                }}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-sm mt-1" style={{ color: '#EF4444' }}>{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block mb-2 font-semibold" style={{ color: '#2D2D49' }}>
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
                    borderColor: errors.password ? '#EF4444' : '#E5E7EB'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0B6B6B'
                    if (errors.password) setErrors({ ...errors, password: '' })
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.password ? '#EF4444' : '#E5E7EB'
                  }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
                  style={{ color: '#1A1A1A' }}
                  onMouseEnter={(e) => e.target.style.color = '#0B6B6B'}
                  onMouseLeave={(e) => e.target.style.color = '#1A1A1A'}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm mt-1" style={{ color: '#EF4444' }}>{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded"
                  style={{ accentColor: '#0B6B6B' }}
                />
                <span className="ml-2 text-sm" style={{ color: '#1A1A1A' }}>Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium transition-colors"
                style={{ color: '#0B6B6B' }}
                onMouseEnter={(e) => e.target.style.color = '#095555'}
                onMouseLeave={(e) => e.target.style.color = '#0B6B6B'}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors"
              style={{ 
                backgroundColor: '#0B6B6B',
                color: 'white'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#095555'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#0B6B6B'}
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t" style={{ borderColor: '#E5E7EB' }}></div>
            <span className="px-4 text-sm" style={{ color: '#1A1A1A' }}>or</span>
            <div className="flex-1 border-t" style={{ borderColor: '#E5E7EB' }}></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm mb-2" style={{ color: '#1A1A1A' }}>
              {formData.userType === 'pharmacy' ? "Don't have a pharmacy account?" : "Don't have an account?"}
            </p>
            {formData.userType === 'pharmacy' ? (
              <Link
                to="/register-pharmacy"
                className="font-semibold transition-colors"
                style={{ color: '#0B6B6B' }}
                onMouseEnter={(e) => e.target.style.color = '#095555'}
                onMouseLeave={(e) => e.target.style.color = '#0B6B6B'}
              >
                Register Your Pharmacy
              </Link>
            ) : (
              <Link
                to="/register"
                className="font-semibold transition-colors"
                style={{ color: '#0B6B6B' }}
                onMouseEnter={(e) => e.target.style.color = '#095555'}
                onMouseLeave={(e) => e.target.style.color = '#0B6B6B'}
              >
                Create Account
              </Link>
            )}
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors inline-flex items-center space-x-2"
            style={{ color: '#1A1A1A' }}
            onMouseEnter={(e) => e.target.style.color = '#0B6B6B'}
            onMouseLeave={(e) => e.target.style.color = '#1A1A1A'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login

