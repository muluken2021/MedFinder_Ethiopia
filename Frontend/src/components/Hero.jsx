import React, { useState } from 'react'
import heroimg  from '../assets/heroimg.png'
import { useTheme } from '../context/ThemeContext'  
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const [medicineName, setMedicineName] = useState('')
  const navigate = useNavigate()
  const { theme } = useTheme()  // ✅ access theme colors

  const handleSearch = () => {
    if (medicineName.trim()) {
      navigate(`/search?q=${encodeURIComponent(medicineName)}`)
    } else {
      navigate('/search')
    }
  }
  return (
    
<section
  className="relative overflow-hidden text-white py-10 sm:py-25"
  style={{
    background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
  }}
>
  <div className="p-5 container mx-auto max-w-7xl flex flex-col-reverse md:flex-row justify-between items-center md:items-start">
    {/* Left Content (Text & Search) */}
    <div className="text-center sm:text-start mb-8 md:mb-0 md:w-1/2">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
        Find Your Medicine Fast Anywhere in Ethiopia
      </h1>
      <p
        className="text-xl md:text-2xl mb-8"
        style={{ color: 'rgba(255, 255, 255, 0.9)' }}
      >
        Your trusted partner in finding essential medicines across Ethiopia
      </p>

      {/* Search Bar */}
      <div className="max-w-3xl justify-start mb-8 mx-auto md:mx-0">
        <div className="flex flex-col md:flex-row gap-4 bg-white rounded-lg shadow-2xl p-2">
          <input
            type="text"
            placeholder="Enter medicine name"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            className="flex-1 px-6 py-4 rounded-lg border-none outline-none text-lg"
            style={{ color: '#1A1A1A' }}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 whitespace-nowrap"
            style={{ backgroundColor: theme.primary }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = theme.secondary)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = theme.primary)
            }
          >
            Search Medicine
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <button
          onClick={() => navigate('/register-pharmacy')}
          className="bg-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg"
          style={{ color: theme.primary }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#F6F8FA'
            e.target.style.color = theme.secondary
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'white'
            e.target.style.color = theme.primary
          }}
        >
          Register Pharmacy
        </button>
      </div>
    </div>

    {/* Right Image with tags */}
    <div className="relative md:w-1/2 flex justify-center md:justify-end mb-8 md:mb-0">
      {/* Image */}
      <img
        src={heroimg}
        alt="Smiling Ethiopian woman holding Paracetamol"
        className="max-w-md w-full h-auto select-none pointer-events-none"
        style={{
          border: 'none',
          background: 'transparent',
          objectFit: 'contain',
        }}
      />

      {/* Tags / Descriptions */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Tag 1 */}
        <div className="absolute top-35 left-0 sm:left-20 bg-white/25 backdrop-blur-md px-4 py-2 rounded-2xl text-sm sm:text-md font-semibold text-white shadow-lg max-w-xs">
          💊 Trusted pharmacies
          <span className="font-normal block text-xs sm:text-sm mt-1">
            Trusted pharmacies near you
          </span>
        </div>
        {/* Tag 2 */}
        <div className="absolute bottom-4 sm:bottom-12 right-4 sm:right-6 bg-white/25 backdrop-blur-md px-4 py-2 rounded-2xl text-sm sm:text-lg font-semibold text-white shadow-lg max-w-xs">
          🩺 Affordable pricing & offers
          <span className="font-normal block text-xs sm:text-sm mt-1">
            Best deals for your health
          </span>
        </div>
        {/* Tag 3 */}
        <div className="absolute top-1/2 sm:top-1/3 right-2 sm:right-0 bg-white/25 backdrop-blur-md px-4 py-2 rounded-2xl text-sm sm:text-lg font-semibold text-white shadow-lg max-w-xs">
          🚑 Verified medicines
          <span className="font-normal block text-xs sm:text-sm mt-1">
            Safe & reliable products
          </span>
        </div>
      </div>

      {/* Bottom Blur Fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background: `linear-gradient(to top, ${theme.primary}b0, transparent)`,
          filter: 'blur(30px)',
        }}
      ></div>
    </div>
  </div>
</section>

  )
}

export default Hero
