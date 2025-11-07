import React, { useState } from 'react';
import { pharmacies } from '../data/Pharmacies.js';

const FindPharmacy = () => {
  const [city, setCity] = useState('');
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const theme = { primary: '#2BB673' };

  const filterByCity = (detectedCity) => {
    if (!detectedCity) return setFilteredPharmacies([]);
    const results = pharmacies.filter(
      (p) => p.city.toLowerCase() === detectedCity.toLowerCase()
    );
    setFilteredPharmacies(results);
    setCurrentPage(1); // Reset to first page
  };

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
        console.log(detectedCity , detectedStreet)

        setCity(detectedCity);

        // Filter pharmacies by street first
        let results = [];
        if (detectedStreet) {
          results = pharmacies.filter(
            (p) =>
              p.address.toLowerCase().includes(detectedStreet.toLowerCase()) &&
              p.city.toLowerCase() === detectedCity.toLowerCase()

             
          );
        }

        // If no results by street, fallback to city-only search
        if (results.length === 0 && detectedCity) {
          results = pharmacies.filter(
            (p) => p.city.toLowerCase() === detectedCity.toLowerCase()
          );
          
        }

        setFilteredPharmacies(results);
      } catch (error) {
        console.error('Reverse geocoding error:', error);
        alert('Error detecting location. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    (error) => {
      console.error('Geolocation error:', error);
      alert('Location access denied or unavailable.');
      setLoading(false);
    }
  );
};

  // Pagination calculations
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredPharmacies.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPharmacies.length / itemsPerPage);

  return (
    <section
      className="py-16 px-4"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginTop: '2rem',
      }}
    >
      <div className="bg-[#b6f7d57a] bg-opacity-80 backdrop-blur-sm rounded-2xl p-8 container mx-auto max-w-6xl">
        <h2 className="text-gray-700 text-4xl font-extrabold text-center mb-6">
          Find Pharmacies Near You
        </h2>

        <p className="text-center text-gray-700 mb-8 text-lg">
          Find pharmacies in your current location. <span className="text-yellow-600">Notice:</span> results may differ if you have a VPN turned on.
        </p>

        <div className="flex justify-center mb-12">
          <button
            onClick={handleFindNearby}
            className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 transition"
          >
            {loading ? 'Detecting Location...' : 'Find Pharmacies Near Me'}
          </button>
        </div>

        {filteredPharmacies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((p) => (
                <a
                  key={p.id}
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    p.name + ', ' + p.city
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow hover:scale-105 transform duration-300 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{p.name}</h3>
                    <p className="text-gray-600 mb-1">{p.address}</p>
                    <p className="text-gray-600 mb-1">{p.city}</p>
                    <p className="text-gray-600">{p.phone}</p>
                  </div>
                  <div className="mt-4 text-sm text-green-700 font-medium">
                    View on Google Maps →
                  </div>
                </a>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : city && !loading ? (
          <p className="text-center text-gray-500 mt-8 text-lg">
            No pharmacies found in "{city}"
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default FindPharmacy;
