import React, { useState } from 'react';
import { fallbackPharmacies } from '../data/pharmacyData.js';
import { assets } from '../assets/assets.js';
import { SearchCode, MapPin, Phone, ExternalLink, Navigation, LocateFixed } from 'lucide-react';

const FindPharmacy = () => {
  const [city, setCity] = useState('');
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleFindNearby = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const detectedCity = data.address.city || data.address.town || data.address.village || '';
          const detectedStreet = data.address.road || '';

          setCity(detectedCity);

          let results = [];
          if (detectedStreet) {
            results = fallbackPharmacies.filter(
              (p) =>
                p.address.toLowerCase().includes(detectedStreet.toLowerCase()) &&
                p.city.toLowerCase() === detectedCity.toLowerCase()
            );
          }
          if (results.length === 0 && detectedCity) {
            results = fallbackPharmacies.filter(
              (p) => p.city.toLowerCase() === detectedCity.toLowerCase()
            );
          }
          setFilteredPharmacies(results);
        } catch (error) {
          alert('Error detecting location. Try again.');
        } finally {
          setLoading(false);
        }
      },
      () => {
        alert('Location access denied.');
        setLoading(false);
      }
    );
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredPharmacies.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPharmacies.length / itemsPerPage);

  return (
    <section className="py-16 bg-white">
      <div className="container px-6 lg:px-10">
        <div className=" p-8 md:p-16 borde verflow-hidden relative">
          
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-100/30 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            {/* Left Content */}
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100/50 text-brand-600 text-xs font-bold uppercase tracking-wider">
                <LocateFixed size={14} /> Location Services
              </div>
              <h2 className="text-gray-900 text-3xl md:text-5xl font-semibold tracking-tight">
                Find Pharmacies <span className="text-brand-500">Near You</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
                Instantly locate verified pharmaceutical institutions in your area. 
                Our network provides real-time availability and contact information.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleFindNearby}
                  disabled={loading}
                  className="cursor-pointer flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-brand-500 text-white font-bold shadow-xl  hover:scale-[1.02] transition-all disabled:opacity-70"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Navigation size={20} />
                  )}
                  {loading ? 'Detecting Location...' : 'Find Near Me'}
                </button>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-2xl max-w-sm">
                <div className="p-3 bg-brand-50 text-brand-500 rounded-xl">
                    <SearchCode size={24} />
                </div>
                <div>
                    <p className="text-gray-900 font-bold text-sm">National Directory</p>
                    <p className="text-gray-500 text-xs font-medium">1,200+ Verified locations in Ethiopia</p>
                </div>
              </div>
            </div>

            {/* Right Image/Illustration */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <img src={assets.location} className="w-full max-w-xl relative z-10" alt="Location map" />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 hidden md:block border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p className="text-gray-900 font-bold text-sm">Smart Mapping</p>
                            <p className="text-gray-400 text-xs">Precise turn-by-turn guidance</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* RESULTS AREA */}
          <div className={`mt-16 transition-all duration-500 ${filteredPharmacies.length > 0 ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px flex-1 bg-gray-200"></div>
                <h3 className="text-gray-400 font-bold text-sm uppercase tracking-widest">Results in {city}</h3>
                <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentItems.map((p) => (
                <div key={p.id} className="group bg-white p-6 rounded-3xl border border-gray-200 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/5 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{p.name}</h3>
                    <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-tighter">Verified</span>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <p className="text-gray-500 text-sm flex items-center gap-2"><MapPin size={14} className="text-gray-300" /> {p.address}</p>
                    <p className="text-gray-500 text-sm flex items-center gap-2"><Phone size={14} className="text-gray-300" /> {p.phone}</p>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${p.name}, ${p.city}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-50 text-gray-600 text-sm font-bold hover:bg-brand-600 hover:text-white transition-all"
                  >
                    Open in Maps <ExternalLink size={14} />
                  </a>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-12 gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-3 rounded-xl border border-gray-200 hover:bg-white disabled:opacity-30 transition-all"
                >
                  <ArrowLeft size={18} />
                </button>
                <div className="px-6 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 font-bold text-sm">
                  Page {currentPage} of {totalPages}
                </div>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-xl border border-gray-200 hover:bg-white disabled:opacity-30 transition-all"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>

          {city && !loading && filteredPharmacies.length === 0 && (
            <div className="text-center py-12">
               <p className="text-gray-400 font-medium">No pharmacies found in <span className="text-gray-900 font-bold">{city}</span>. Try a nearby city.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Helper components for icons used in pagination
const ArrowLeft = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;
const ArrowRight = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;

export default FindPharmacy;