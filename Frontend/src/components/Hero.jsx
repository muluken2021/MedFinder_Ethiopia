import React, { useState } from 'react'
import heroimg  from '../assets/heroimg2.png'
import { useTheme } from '../context/ThemeContext'  
import { useNavigate } from 'react-router-dom'
import { ChartArea, ChartBar, ChartColumn, ChartLine, Hospital, Pill, ScanSearch, SignalMediumIcon } from 'lucide-react'
import { assets } from '../assets/assets'

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
  className="relative overflow-hidden text-white py-10 sm:pt-35"
  style={{
    background: `linear-gradient(to bottom, ${theme.background}, ${theme.gradient2})`,
  }}
>
  <div className="lg:px-15  px-5 container mx-auto max-w-8xl flex flex-col md:flex-row justify-between items-center md:items-start">
    {/* Left Content (Text & Search) */}
    <div className="text-center sm:text-start mb-8 md:mb-8 md:w-1/2 ">
      <div className='flex gap-3'>
        {/* <img src={assets.location} className="w-10 h-10 " /> */}
        <h1 className=' text-5xl text-bold pb-5' style={{color: theme.primary}} >Find Medicines </h1>
      </div>
      
      <h1 className="text-3xl md:text-5xl mb-10  leading-tight "
      style={{color:theme.dark_text}}
      >
          
        <span className="block opacity-90 font-bold">Anywhere in Ethiopia</span>
      </h1>
      
      <p
        className="text-md md:text-xl my-6"
         style={{color:theme.normal_text}}
      >
        Your trusted partner in finding essential medicines across Ethiopia.Your trusted partner in finding essential medicines across Ethiopia.Your trusted partner in finding essential medicines across Ethiopia
      </p>

      {/* Search Bar */}
      <div className="max-w-3xl justify-start  mx-auto md:mx-0">
        <div className="flex flex-col md:flex-row gap-4 bg-white rounded-lg shadow-lg p-2">
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


      
    </div>

    {/* Right Image with tags */}
    <div className="md:mt-[-100px] relative md:w-1/2 flex justify-center md:justify-end  -mb-12">
      {/* Image */}
      <img
        src={heroimg}
        alt="Smiling Ethiopian woman holding Paracetamol"
        className="max-w-md w-full h-auto select-none pointer-events-none"
        
      />

      {/* Tags / Descriptions */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Circle Chart */}
          <div className="hidden sm:flex py-6 absolute top-0 left-0 sm:left-20 bg-white/20 backdrop-blur-md p-4 rounded-full shadow-lg w-42 h-42 items-center justify-center">
            <svg width="200" height="200" viewBox="0 0 36 36" className="rotate-[-90deg]">
              {/* Background Circle */}
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
              />

              {/* Progress Circle (75%) */}
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#25bc95"
                strokeWidth="3"
                strokeDasharray="75, 100"
                strokeLinecap="round"
              />
            </svg>

            {/* Center Text */}
            <div className="absolute text-center">
              <div className="text-lg font-bold text-gray-700">75%</div>
              <div className="text-xs text-gray-500">Trusted</div>
            </div>
          </div>

        {/* Tag 2 */}
        <div className="absolute bottom-4 sm:bottom-32 right-4 sm:right-60 bg-white/25 backdrop-blur-md p-10 rounded-2xl text-sm sm:text-lg font-semibold text-gray-600 shadow-lg max-w-xs">
          Affordable pricing & offers
          <span className="font-normal block text-xs sm:text-sm mt-1">
            Best deals for your health
          </span>
        </div>

        {/* Mastercard Style Card */}
          <div className="hidden sm:block absolute  bottom-4 sm:bottom-32 right-4 sm:right-60">
          
          </div>

        {/* Tag 3 */}
        <div className=" absolute top-1/2 sm:top-30 right-0 sm:right-0 bg-white/40 backdrop-blur-md p-10 rounded-2xl text-sm sm:text-lg font-semibold text-gray-600 shadow-lg max-w-xs">
           Verified medicines
          <span className="font-normal block text-xs sm:text-sm mt-1">
            Safe & reliable products
          </span>
        </div>
      </div>

     
     
    </div>
    
  </div>
  {/* <div className=" rounded-2xl p-5 lg:mt-[-60px] mx-auto max-w-7xl  relative  grid grid-cols-2 sm:grid-cols-4 gap-5 text-center">
  <div className="lg:flex gap-2 bg-white/70 backdrop-blur-md p-6  shadow-lg hover:shadow-2xl transition">
    <span className="text-4xl"><Pill size={40} color='green'/></span>
    <div className='text-start'>
      <h3 className="text-3xl font-bold text-gray-900 ">12,345</h3>
       <p className="text-gray-700 mt-1">Medicines Available</p>
    </div>
  </div>
   <div className="lg:flex gap-2 bg-white/70 backdrop-blur-md p-6  shadow-lg hover:shadow-2xl transition">
    <span className="text-4xl"><Hospital size={40} color='green'/></span>
    <div className='text-start'>
      <h3 className="text-3xl font-bold text-gray-900 ">12,345</h3>
       <p className="text-gray-700 mt-1">Pharmacies</p>
    </div>
  </div>
   <div className="lg:flex gap-2 bg-white/70 backdrop-blur-md p-6  shadow-lg hover:shadow-2xl transition">
    <span className="text-4xl"><ScanSearch size={40} color='green'/></span>
    <div className='text-start'>
      <h3 className="text-3xl font-bold text-gray-900 ">12,345</h3>
       <p className="text-gray-700 mt-1">Medicine Searches</p>
    </div>
  </div>

  

</div> */}
  
</section>

  )
}

export default Hero
