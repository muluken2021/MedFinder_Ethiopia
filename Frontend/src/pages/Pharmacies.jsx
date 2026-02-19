import React, { useState, useEffect } from 'react';
import { Mail, MapPin, PhoneCall, Search, ChevronLeft, ChevronRight, Loader2, Hospital, Inbox, BadgeCheck, Globe } from 'lucide-react';

const Pharmacies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const pharmaciesPerPage = 6;

  useEffect(() => {
    const fetchPharmacies = async () => {
      setLoading(true);
      try {
        // Updated to use a safe check for the fetch
        const response = await fetch('http://localhost:5000/api/pharmacies');
        const data = await response.json();
        setPharmacies(data);
      } catch (error) {
        console.error('Error fetching pharmacies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPharmacies();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCity]);

  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    const matchesSearch =
      pharmacy.pharmacyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pharmacy.address && pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCity = !selectedCity || pharmacy.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  const indexOfLastPharmacy = currentPage * pharmaciesPerPage;
  const indexOfFirstPharmacy = indexOfLastPharmacy - pharmaciesPerPage;
  const currentPharmacies = filteredPharmacies.slice(indexOfFirstPharmacy, indexOfLastPharmacy);
  const totalPages = Math.ceil(filteredPharmacies.length / pharmaciesPerPage) || 1;

  const cities = [...new Set(pharmacies.map((p) => p.city))];

  return (
    <div className="min-h-screen bg-white">
      {/* 🔹 HEADER SECTION */}
      <section className="bg-gray-50 border-b border-gray-100 py-20 px-6">
        <div className="container mx-auto max-w-7xl text-center">
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Verified <span className="text-brand-600">Pharmacy Network</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Access our comprehensive database of registered pharmaceutical providers across Ethiopia.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-6 -mt-10 relative z-10">
        {/* 🔹 SEARCH & FILTER BAR */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-3xl p-3 shadow-xl shadow-brand-900/5 border border-gray-100 flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-2xl px-5 py-4 border border-transparent focus-within:border-brand-200 focus-within:bg-white transition-all">
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 font-medium"
              />
            </div>

            <div className="md:w-64 flex items-center gap-3 bg-gray-50 rounded-2xl px-5 py-4 border border-transparent focus-within:border-brand-200 focus-within:bg-white transition-all">
              <MapPin className="text-gray-400" size={18} />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent flex-1 outline-none text-gray-700 font-medium cursor-pointer appearance-none"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 🔹 CONTENT STATE */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <Loader2 className="animate-spin mb-4 text-brand-600" size={40} />
            <p className="font-bold tracking-widest uppercase text-xs">Accessing Health Records...</p>
          </div>
        ) : filteredPharmacies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
            <Inbox size={64} className="mb-4 opacity-20" />
            <p className="text-xl font-bold text-gray-900">No Providers Found</p>
            <p className="text-sm">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {currentPharmacies.map((pharmacy) => (
                <div
                  key={pharmacy._id}
                  className="group bg-white border border-gray-100 rounded-[2.5rem] p-8 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-500/5 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 rounded-2xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                      <Hospital size={24} />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full">
                      <BadgeCheck size={14} />
                      <span className="text-[10px] font-bold uppercase">Verified</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {pharmacy.pharmacyName}
                  </h3>
                  
                  <div className="h-px w-12 bg-brand-100 mb-6 group-hover:w-full transition-all duration-500"></div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3 text-gray-500 text-sm">
                      <MapPin size={18} className="text-brand-500 shrink-0" />
                      <span className="leading-snug">{pharmacy.address || 'Address not listed'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                      <PhoneCall size={18} className="text-brand-500 shrink-0" />
                      <span className="font-medium">{pharmacy.phone || 'Contact not available'}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <button className="w-full py-3.5 rounded-xl bg-gray-900 text-white font-bold text-xs hover:bg-brand-600 transition-all shadow-lg shadow-gray-200">
                      VIEW INVENTORY
                    </button>
                    <button className="w-full py-3.5 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-all">
                      GET DIRECTIONS
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 🔹 PAGINATION */}
            <div className="flex justify-center items-center gap-4 py-10">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-xl bg-white border border-gray-200 text-gray-400 disabled:opacity-30 hover:bg-brand-50 hover:text-brand-600 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="px-6 py-2 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-900 font-bold text-sm">
                   {currentPage} <span className="text-gray-400 mx-1">/</span> {totalPages}
                </span>
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-3 rounded-xl bg-white border border-gray-200 text-gray-400 disabled:opacity-30 hover:bg-brand-50 hover:text-brand-600 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Pharmacies;