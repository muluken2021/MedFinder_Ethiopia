import React, { useState } from 'react';
import heroimg from '../assets/heroimg2.png';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ShieldCheck, Quote, Star } from 'lucide-react';

const Hero = () => {
  const [medicineName, setMedicineName] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (medicineName.trim()) {
      navigate(`/search?q=${encodeURIComponent(medicineName)}`);
    } else {
      navigate('/search');
    }
  };

  return (
    /* 1. Added relative and overflow-hidden to contain the wave */
    <section className="relative overflow-hidden min-h-[85vh] flex items-center bg-brand-700 text-[#111827]   ">

      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-2/5 h-full bg-white/5 -skew-x-12 translate-x-20 z-0"></div>

      <div className="my-25 container px-6 lg:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Content */}
          <div className="w-full lg:w-3/5 text-center mt-10 lg:-mt-10 lg:text-left">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight tracking-tight text-white">
             Find Available Medicines <br/>Near You in Seconds
            </h1>

            <p className="text-base md:text-md text-teal-50 max-w-xl mb-10 leading-relaxed">
              Instantly locate available medication across a network of verified 
              pharmacies. Real-time availability and transparent pricing for 
              your peace of mind.
            </p>

            {/* Search Interface */}
            <div className="relative max-w-2xl mx-auto lg:mx-0">
              <div className="flex flex-col sm:flex-row items-center gap-3 p-2 bg-white rounded-xl shadow-2xl transition-all">
                <div className="flex items-center flex-1 w-full px-3">
                  <Search className="text-gray-400 mr-3" size={20} />
                  <input
                    type="text"
                    placeholder="Search by medicine name..."
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                    className="w-full py-3 bg-transparent outline-none text-gray-800 text-base"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="w-full sm:w-auto px-7 py-3 rounded-lg font-semibold bg-brand-500 hover:bg-brand-600 text-white transition-colors"
                >
                  Search Pharmacy
                </button>
              </div>
            </div>
          </div>

          {/* Right Visual Section */}
          <div className="w-full lg:w-2/5 relative">
            <div className="relative z-10">
              <img
                src={heroimg}
                alt="Healthcare Professional"
                className="w-full h-auto drop-shadow-2xl mix-blend-luminosity brightness-110"
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute top-60 right-[10px] md:top-80 md:right-10 z-20 bg-white/100 backdrop-blur-md shadow-2xl rounded-2xl p-3 md:pr-15 border border-sky-100 scale-75 md:scale-100 origin-right">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-sky-50 flex items-center justify-center text-[10px] font-bold text-sky-600">
                  2400+
                </div>
              </div>
              <p className="text-sky-600 font-bold text-sm mt-2">Happy Customers</p>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={12} className="text-yellow-400 fill-current" />
                ))}
                <span className="text-slate-400 text-[10px] ml-1">(4.7 Stars)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* The Wave Effect */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
          <svg className="relative block w-full h-[150px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V46.29C80.7,71.4,200.23,78.93,321.39,56.44Z" fill="#FFFFFF"></path>
          </svg>
        </div>
    </section>
  );
};

export default Hero;