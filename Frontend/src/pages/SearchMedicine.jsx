import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Filter, Navigation, Zap, AlertCircle, ShoppingBag, BadgeCheck, DollarSign, ArrowRight } from "lucide-react";
import { useSearchParams } from 'react-router-dom';
import { medicines } from '../data/medicines';

const SearchMedicine = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [medicineName, setMedicineName] = useState(searchParams.get('q') || '');
  const [city, setCity] = useState('');
  const [availability, setAvailability] = useState('');
  const [priceRange, setPriceRange] = useState('');

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) setMedicineName(query);
  }, [searchParams]);

  const handleSearch = () => {
    setSearchParams({ q: medicineName });
  };

  const filteredResults = useMemo(() => {
    return medicines.filter((m) => {
      const matchesName = !medicineName || m.name.toLowerCase().includes(medicineName.toLowerCase());
      const matchesCity = !city || m.city === city;
      
      let matchesAvailability = true;
      if (availability === 'available') matchesAvailability = m.available;
      if (availability === 'out-of-stock') matchesAvailability = !m.available;

      let matchesPrice = true;
      if (priceRange) {
        const [min, max] = priceRange.split('-');
        const p = Number(m.price);
        matchesPrice = max ? (p >= Number(min) && p <= Number(max)) : (p >= Number(min));
      }

      return matchesName && matchesCity && matchesAvailability && matchesPrice;
    });
  }, [medicineName, city, availability, priceRange]);

  const openInMaps = (pharmacy) => {
    const query = encodeURIComponent(`${pharmacy.pharmacyName}, ${pharmacy.city}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 🔹 HERO SEARCH HUB */}
      <section className="bg-brand-700 border-b border-gray-100 pt-30 pb-20 px-6 lg:px-24 ">
        <div className="container  text-start">
          
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-100 tracking-tight mb-8">
            Find Your Medication
          </h1>

          <div className="bg-white rounded-3xl p-4 shadow-xl shadow-brand-900/5 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-2xl px-5 py-4 border  border-brand-200 focus-within:bg-white transition-all">
                <Search className="text-gray-400" size={22} />
                <input
                  type="text"
                  placeholder="Enter medicine name (e.g. Insulin, Amoxicillin)..."
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 font-medium"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-10 py-4 rounded-2xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition-all flex items-center justify-center gap-2  shadow-brand-200 active:scale-95"
              >
                Search Medicine
              </button>
            </div>

            {/* Sub-Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-gray-50 border-none rounded-xl pl-11 pr-4 py-3 text-sm text-gray-600 font-medium outline-none hover:bg-gray-100 transition-colors appearance-none cursor-pointer"
                >
                  <option value="">All Regions</option>
                  <option value="addis-ababa">Addis Ababa</option>
                  <option value="dire-dawa">Dire Dawa</option>
                </select>
              </div>

              <div className="relative">
                <ShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full bg-gray-50 border-none rounded-xl pl-11 pr-4 py-3 text-sm text-gray-600 font-medium outline-none hover:bg-gray-100 transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Stock Status</option>
                  <option value="available">In Stock Only</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>

              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full bg-gray-50 border-none rounded-xl pl-11 pr-4 py-3 text-sm text-gray-600 font-medium outline-none hover:bg-gray-100 transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Price Range</option>
                  <option value="0-200">Under 200 ETB</option>
                  <option value="200-500">200 - 500 ETB</option>
                  <option value="1000+">1000+ ETB</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 RESULTS GRID */}
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">Verified Results</h2>
            <span className="bg-brand-50 text-brand-600 px-3 py-1 rounded-full text-xs font-bold"></span>
          </div>
          {medicineName && <span className="text-gray-400 text-sm font-medium">Search: "{medicineName}"</span>}
        </div>

        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResults.map((item) => (
              <div
                key={item.id}
                className="group bg-white border  rounded-[2.5rem] p-8 border-brand-200 hover:shadow-2xl hover:shadow-brand-500/5 transition-all duration-300 relative"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight border ${
                    item.available 
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
                      : 'bg-red-50 border-red-100 text-red-400'
                  }`}>
                    {item.available ? <BadgeCheck size={12} /> : <AlertCircle size={12} />}
                    {item.available ? 'In Stock' : 'Out of Stock'}
                  </div>
                  <div className="flex items-center text-gray-900 font-bold text-xl">
                    <span className="text-sm text-gray-400 mr-1 font-medium">ETB</span> {item.price}
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <HospitalIcon />
                    <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">{item.pharmacyName}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-brand-600 transition-colors leading-tight">
                    {item.name}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-gray-500 text-sm leading-snug">
                      <MapPin size={16} className="shrink-0 text-gray-300 mt-0.5" />
                      <span>{item.address}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openInMaps(item)}
                  className="cursor-pointer w-full py-4 rounded-xl bg-brand-500 text-white font-bold text-xs hover:bg-brand-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-100"
                >
                  <Navigation size={14} />
                  NAVIGATE TO LOCATION
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                <AlertCircle size={32} className="text-gray-300" />
            </div>
            <h3 className="text-gray-900 text-xl font-bold mb-2">No matching medications found</h3>
            <p className="text-gray-500 text-center max-w-xs">Try broadening your search or checking different pharmacy regions.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Internal Helper Component
const HospitalIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-500">
        <path d="M18 2h-3a3 3 0 0 0-3 3v2a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v16h18V5a3 3 0 0 0-3-3Z"/><path d="M12 22v-4"/><path d="M8 22v-4"/><path d="M16 22v-4"/><path d="M10 9h4"/><path d="M12 7v4"/>
    </svg>
);

export default SearchMedicine;