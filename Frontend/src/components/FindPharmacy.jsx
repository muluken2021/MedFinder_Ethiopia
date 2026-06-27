import React, { useState } from 'react';
import { fallbackPharmacies } from '../data/pharmacyData.js';
import { assets } from '../assets/assets.js';
import { Navigation, MapPin, Phone, ExternalLink, Search, LocateFixed, Loader2 } from 'lucide-react';

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
        } catch {
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
    <section className="py-24 bg-white">
      <div className=" mx-auto  px-6 lg:px-30">

       
          <div className="bg-brand-50 rounded-2xl p-15 space-y-8 text-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-4">
                Location Services
              </p>
              <h2 className="text-4xl font-bold text-brand-500 leading-tight tracking-tight mb-4">
                Pharmacies near you,<br />
                <span className="text-brand-400">instantly located</span>
              </h2>
              <p className="text-brand-400 text-lg leading-relaxed max-w-xl mx-auto">
                Allow one-click location access and we'll surface verified pharmacies
                near you with real-time stock and contact details.
              </p>
            </div>

            <button
              onClick={handleFindNearby}
              disabled={loading}
              className="cursor-pointer inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-brand-500 text-white font-bold text-sm hover:bg-brand-50 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-brand-500/10"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Navigation size={20} />
              )}
              {loading ? 'Detecting Location…' : 'Find Near Me'}
            </button>

            
          </div>

          
  

        {/* ── Results ── */}
        {filteredPharmacies.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gray-100" />
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                {filteredPharmacies.length} pharmacies found in {city}
              </p>
              <div className="h-px flex-1 bg-gray-100" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentItems.map((p) => (
                <div
                  key={p.id}
                  className="group bg-white p-6 rounded-3xl border border-gray-100 hover:border-slate-300 hover:shadow-xl hover:shadow-gray-100/80 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-brand-500 transition-colors leading-tight">
                      {p.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold uppercase tracking-tight flex-shrink-0">
                      Verified
                    </span>
                  </div>

                  <div className="space-y-2 mb-6">
                    <p className="text-gray-500 text-sm flex items-start gap-2">
                      <MapPin size={14} className="text-gray-300 flex-shrink-0 mt-0.5" />
                      {p.address}
                    </p>
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                      <Phone size={14} className="text-gray-300 flex-shrink-0" />
                      {p.phone}
                    </p>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${p.name}, ${p.city}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gray-50 text-gray-600 text-xs font-bold hover:bg-brand-500 hover:text-white transition-all border border-gray-100"
                  >
                    Open in Maps <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-10">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 disabled:opacity-30 transition-all"
                >
                  ← Prev
                </button>
                <span className="px-4 py-2 text-gray-500 text-sm font-medium">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 disabled:opacity-30 transition-all"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        )}

        {city && !loading && filteredPharmacies.length === 0 && (
          <div className="text-center py-16 mt-10">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-base">
              No pharmacies found in <span className="text-gray-900 font-bold">{city}</span>.
            </p>
            <p className="text-gray-400 text-sm mt-1">Try a nearby city or browse the full directory.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FindPharmacy;
