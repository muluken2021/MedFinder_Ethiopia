import React, { useState } from 'react';
import { pharmacies } from '../data/Pharmacies.js';
import { assets } from '../assets/assets.js';
import { useTheme } from '../context/ThemeContext.jsx';
import { SearchCode } from 'lucide-react';

const FindPharmacy = () => {
  const { theme } = useTheme()
  const [city, setCity] = useState('');
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  

  const filterByCity = (detectedCity) => {
    if (!detectedCity) return setFilteredPharmacies([]);
    const results = pharmacies.filter(
      (p) => p.city.toLowerCase() === detectedCity.toLowerCase()
    );
    setFilteredPharmacies(results);
    setCurrentPage(1);
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
          const detectedCity =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            '';
          const detectedStreet = data.address.road || '';

          setCity(detectedCity);

          let results = [];
          if (detectedStreet) {
            results = pharmacies.filter(
              (p) =>
                p.address.toLowerCase().includes(detectedStreet.toLowerCase()) &&
                p.city.toLowerCase() === detectedCity.toLowerCase()
            );
          }
          if (results.length === 0 && detectedCity) {
            results = pharmacies.filter(
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
    <section
     style={{
    // background: `linear-gradient(to right, ${theme.background}, ${theme.gradient1})`,
  }}
    >
  <div className=" lg:px-30 backdrop-blur-xl bg-white/30 rounded-3xl p-10 container mx-auto max-w-full  border border-white/20">

    {/* HEADER AREA */}
    <div className=" flex flex-col md:flex-row items-center justify-between gap-10">
      {/* Left */}
      <div className="md:w-1/2 space-y-4">
     
          <p className="font-bold " style={{color: theme.primary}}>Nearby Pharmacies </p>
          <h2
            className="text-gray-600 text-3xl md:text-4xl font-bold"
            
          >
            Find Pharmacies Nearby 
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Explore top pharmacies near you. Get the best medicines quickly and reliably.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
          <button
            onClick={handleFindNearby}
            className="mt-3 cursor-pointer duration-300 transform hover:scale-105 px-8 lg:w-[70%] text-start py-3 rounded-xl  text-gray-600 border-green-400 border-1"
            style={{
              background: ` linear-gradient(135deg, ${theme.background}, ${theme.gradient1})`,
            }}
          >
            <div className="flex gap-5">
              <SearchCode size={50}  color="green"/>
              <div>
                <p className="font-bold text-lg  py-2"> Find Pharmacy Near to you</p>
                 Find your medicine in verified pharmacies across ethiopia with a single search 
              </div>
            </div>
          </button>

          
        

        <button
          onClick={handleFindNearby}
          className="mt-5 px-8 py-4 rounded-3xl text-white font-semibold shadow-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          style={{ backgroundImage:'linear-gradient(90deg, #2BB673, #0B8F83)'}}
        >
          {loading ? 'Detecting Location...' : 'Find Pharmacies Near Me'}
        </button>
      </div>

      {/* Right */}
      <div className="hidden md:block md:w-1/2  justify-center">
        <img src={assets.location} className="w-[600px]  rounded-2xl" />
      </div>
    </div>

    {/* RESULTS */}
    <div className="mt-16">
      {filteredPharmacies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((p) => (
              <a
                key={p.id}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${p.name}, ${p.city}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white/80 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/30"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{p.name}</h3>
                <p className="text-gray-700 mb-1">{p.address}</p>
                <p className="text-gray-700">{p.city}</p>
                <p className="text-gray-900 font-medium mt-2">{p.phone}</p>

                <div className="mt-5 text-green-600 font-semibold text-sm">
                  View on Google Maps →
                </div>
              </a>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-6 text-lg">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 disabled:opacity-50 transition"
              >
                Previous
              </button>

              <span className="px-4 py-2 bg-gray-100 rounded-xl text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 disabled:opacity-50 transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : city && !loading ? (
        <p className="text-center text-gray-500 mt-8 text-xl">
          No pharmacies found in "{city}"
        </p>
      ) : null}
    </div>
  </div>
</section>

  );
};

export default FindPharmacy;
