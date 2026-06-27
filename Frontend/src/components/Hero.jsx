import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phone from './Phone.jsx';
import { Search, MapPin, ShieldCheck, Pill, Store, Activity, ArrowRight, Star } from 'lucide-react';



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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <section className="relative min-h-screen px-10  flex flex-col justify-center overflow-hidden pt-24 pb-16">
      {/* Soft background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-50 opacity-60 blur-[120px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      {/* <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-200 opacity-50 blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" /> */}

      <div className="container mx-auto px-6 lg:px-24 bg-brand-500 rounded-2xl py-10  w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left Column ── */}
          <div className="space-y-8 reveal">

            {/* Headline */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-brand-100 leading-[1.1] tracking-tight">
                Find the Medicine<br />
                <span className="text-brand-100 relative">
                  You Need
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 6C50 2 100 1 150 3C200 5 250 6 298 4" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </span>
                , Right Now.
              </h1>
              <p className="mt-6 text-gray-500 text-md leading-relaxed max-w-lg">
                Search across a network of verified pharmacies in Ethiopia. Real-time stock,
                exact locations, and fair prices — all in one place.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-2 p-2 bg-white rounded-2xl shadow-lg border border-gray-200 max-w-xl transition-shadow focus-within:shadow-xl focus-within:border-blue-200">
              <div className="flex items-center flex-1 px-3 gap-3">
                <Search className="text-gray-400 flex-shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="Search medicine (e.g., Amoxicillin, Paracetamol)..."
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full py-3 bg-transparent outline-none text-gray-800 text-sm placeholder:text-gray-400"
                />
              </div>
              <button
                onClick={handleSearch}
                className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Search
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">Popular:</span>
              {['Amoxicillin', 'Paracetamol', 'Metformin', 'Ibuprofen'].map((term) => (
                <button
                  key={term}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
                  className="px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-slate-100 border border-gray-200 text-xs text-gray-600 font-medium transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>

           
          </div>

          {/* ── Right Column — Phone Mockup ── */}
          <div className="max-h-[400px] relative flex justify-center items-center reveal">
            {/* Decorative ring */}
            <div className="absolute w-[340px] h-[340px] rounded-full border-2 border-dashed border-slate-200 animate-spin-slow pointer-events-none" style={{ animationDuration: '20s', animation: 'none' }} />
            <div className="absolute w-[420px] h-[420px] rounded-full bg-blue-50/60 blur-3xl pointer-events-none" />

            <Phone>
              <div className="bg-white p-4 pt-9 flex flex-col gap-3 text-[10px]">
                {/* App Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-ink/50 text-base">←</span>
                    <span className="text-gray-800 font-bold text-xs">Med Finder</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>

                {/* Alert Box */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-slate-400 text-[9px]">Nearest match found</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-white font-bold text-sm leading-tight">Amoxicillin 500mg</p>
                  <div className="mt-1.5 text-[9px] text-slate-400 flex items-center gap-1">
                    <MapPin size={9} className="text-blue-400" />
                    <span>Care Pharmacy · 0.4 km away</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={8} className="fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-slate-400 text-[8px] ml-1">4.9</span>
                  </div>
                </div>

                {/* Nearby List */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-800 font-bold text-[11px]">Nearby Pharmacies</span>
                    <span className="text-blue-500 text-[9px] font-semibold cursor-pointer">See all</span>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { name: 'Metro Health', dist: '1.2 km', price: 'ETB 145', stock: 'In Stock', color: 'text-emerald-600 bg-emerald-50' },
                      { name: 'City Pharma', dist: '2.5 km', price: 'ETB 130', stock: 'Low Stock', color: 'text-amber-600 bg-amber-50' },
                      { name: 'Bethel Pharma', dist: '3.1 km', price: 'ETB 160', stock: 'In Stock', color: 'text-emerald-600 bg-emerald-50' },
                    ].map((p, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl p-2 border border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-slate-900 grid place-items-center text-white flex-shrink-0">
                            <Store size={11} />
                          </div>
                          <div>
                            <p className="text-gray-800 font-semibold text-[9px]">{p.name}</p>
                            <p className="text-gray-400 text-[8px]">{p.dist}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[9px] text-gray-800">{p.price}</p>
                          <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${p.color}`}>{p.stock}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { icon: <Pill size={11} className="text-blue-600" />, label: 'Rx Meds', bg: 'bg-blue-50' },
                    { icon: <Activity size={11} className="text-rose-500" />, label: 'OTC', bg: 'bg-rose-50' },
                    { icon: <Store size={11} className="text-amber-500" />, label: 'Wellness', bg: 'bg-amber-50' },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 bg-white rounded-xl p-2 border border-gray-100">
                      <div className={`w-6 h-6 ${item.bg} rounded-lg flex items-center justify-center`}>{item.icon}</div>
                      <span className="text-[7.5px] text-gray-700 font-semibold">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto bg-slate-900 rounded-xl p-2.5 text-center">
                  <span className="text-white font-semibold text-[9px]">Browse All Pharmacies →</span>
                </div>
              </div>
            </Phone>

            {/* Floating trust badges */}
            <div className="absolute -left-4 top-1/4 bg-white rounded-2xl shadow-lg border border-gray-100 p-3 hidden lg:flex items-center gap-2.5">
              <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={16} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-gray-800 font-bold text-xs">Verified</p>
                <p className="text-gray-400 text-[10px]">MOH Certified</p>
              </div>
            </div>

            <div className="absolute -right-4 bottom-1/4 bg-white rounded-2xl shadow-lg border border-gray-100 p-3 hidden lg:flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-gray-800 font-bold text-xs">Live Location</p>
                <p className="text-gray-400 text-[10px]">GPS Enabled</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
