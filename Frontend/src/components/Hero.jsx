import React, { useState } from 'react';
import heroimg from '../assets/heroimg2.png';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ShieldCheck, Activity } from 'lucide-react';

const Hero = () => {
  const [medicineName, setMedicineName] = useState('');
  const navigate = useNavigate();

  // Modern Healthcare Palette
  const colors = {
    primary: '#2563EB',      // Soft Medical brand
    secondary: '#10B981',    // Success Green
    background: '#F9FAFB',   // Light Gray/White
    textPrimary: '#111827',  // Dark Gray
    textSecondary: '#6B7280',// Medium Gray
    border: '#E5E7EB'        // Light Gray Stroke
  };

  const handleSearch = () => {
    if (medicineName.trim()) {
      navigate(`/search?q=${encodeURIComponent(medicineName)}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center bg-white text-[#111827] -mt-20  pb-16">
      
      {/* Subtle Background Accents - No more heavy auroras */}
      {/* <div className="absolute top-0 right-0 w-[30%] h-[100%] bg-slate-50 skew-x-12 translate-x-20 z-0"></div> */}
     <div className="absolute top-0 right-0 w-2/5 h-full bg-brand-600/5 -skew-x-12 translate-x-20"></div>
      <div className="container mx-auto px-6 lg:px-24 relative z-10 pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Content */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight text-[#111827]">
              Find Essential Medicines 
              <span className="block text-brand-500">
                Across Ethiopia
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-500 max-w-xl mb-10 leading-relaxed">
              Instantly locate available medication across a network of verified 
              pharmacies. Real-time availability and transparent pricing for 
              your peace of mind.
            </p>

            {/* Search Interface - Clean & Functional */}
            <div className="relative max-w-2xl mx-auto lg:mx-0">
              <div className="flex flex-col sm:flex-row items-center gap-3 p-2 bg-white border border-gray-200 rounded-xl shadow-sm focus-within:border-brand-200 focus-within:ring-4 focus-within:ring-brand-50 transition-all">
                <div className="flex items-center flex-1 w-full px-3">
                  <Search className="text-gray-400 mr-3" size={20} />
                  <input
                    type="text"
                    placeholder="Search by medicine name..."
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full py-3 bg-transparent outline-none text-[#111827] text-base placeholder:text-gray-400"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="w-full sm:w-auto px-7 py-3 rounded-lg font-semibold bg-brand-500 hover:bg-brand-600 text-white transition-colors"
                >
                  Search Pharmacy
                </button>
              </div>
              <p className="mt-3 text-xs text-gray-400 flex gap-4 ml-2">
                <span>Commonly searched: Insulin, Amoxicillin, Ventolin</span>
              </p>
            </div>
          </div>

          {/* Right Visual Section */}
          <div className="w-full lg:w-2/5 relative">
            <div className="relative z-10">
              <img
                src={heroimg}
                alt="Healthcare Professional"
                className="w-full h-auto drop-shadow-xl"
              />
            </div>

            {/* Floating Element: Location (Medical Theme) */}
            <div className="absolute top-10 -left-4 z-20 bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3 shadow-lg">
              <div className="bg-brand-100 p-2 rounded-lg">
                <MapPin className="text-brand-600" size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Current Area</p>
                <p className="text-sm font-semibold text-gray-800">Addis Ababa</p>
              </div>
            </div>

            {/* Floating Element: Verification (Success Theme) */}
            <div className="absolute bottom-12 -right-2 z-20 bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3 shadow-lg">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <ShieldCheck className="text-emerald-600" size={20} />
              </div>
              <p className="text-xs font-semibold text-gray-700">Ministry Approved</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;