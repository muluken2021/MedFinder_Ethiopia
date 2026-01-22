import React, { useState, useMemo } from 'react';
 import { Search, MapPin, Filter } from "lucide-react";
import { useSearchParams } from 'react-router-dom';
import { medicines } from '../data/medicines';
import { useTheme } from '../context/ThemeContext'

const SearchMedicine = () => {
  const { theme } = useTheme()
  const [searchParams, setSearchParams] = useSearchParams();
  const [medicineName, setMedicineName] = useState(searchParams.get('q') || '');
  const [city, setCity] = useState('');
  const [availability, setAvailability] = useState('');
  const [priceRange, setPriceRange] = useState('');

  // Update URL query when medicineName changes
  const handleSearch = () => {
    setSearchParams({ q: medicineName });
  };

  // Filtered results computed dynamically
  const filteredResults = useMemo(() => {
    return medicines.filter((m) => {
      // Name filter
      if (medicineName && !m.name.toLowerCase().includes(medicineName.toLowerCase())) {
        return false;
      }

      // City filter
      if (city && m.city !== city) {
        return false;
      }

      // Availability filter
      if (availability) {
        if (availability === 'available' && !m.available) return false;
        if (availability === 'out-of-stock' && m.available) return false;
      }

      // Price range filter
      if (priceRange) {
        const [min, max] = priceRange.split('-');
        const price = Number(m.price);
        if (max) {
          if (price < Number(min) || price > Number(max)) return false;
        } else {
          if (price < Number(min)) return false;
        }
      }

      return true;
    });
  }, [medicineName, city, availability, priceRange]);

  const handleGetDirections = (pharmacy) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${pharmacy.lat},${pharmacy.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: theme.background }}>
      <div className="container mx-auto max-w-7xl">
        {/* Search Bar */}
     

        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">

            {/* Search Input */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-3 border border-gray-200 w-full">
                <Search className="text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Search for a medicine..."
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 bg-transparent outline-none text-gray-700 text-lg"
                />
              </div>

              <button
                onClick={handleSearch}
                className="px-8 py-3 rounded-xl text-white font-semibold transition hover:opacity-90"
                style={{ backgroundColor: theme.primary }}
              >
                Search
              </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                <MapPin className="text-gray-500" size={18} />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-transparent flex-1 outline-none text-gray-700"
                >
                  <option value="">Select City</option>
                  <option value="addis-ababa">Addis Ababa</option>
                  <option value="dire-dawa">Dire Dawa</option>
                  <option value="bahir-dar">Bahir Dar</option>
                  <option value="mekelle">Mekelle</option>
                  <option value="awassa">Awassa</option>
                </select>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                <Filter className="text-gray-500" size={18} />
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="bg-transparent flex-1 outline-none text-gray-700"
                >
                  <option value="">Availability</option>
                  <option value="available">Available</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                <Filter className="text-gray-500" size={18} />
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="bg-transparent flex-1 outline-none text-gray-700"
                >
                  <option value="">Price Range</option>
                  <option value="0-200">0 - 200 ETB</option>
                  <option value="200-500">200 - 500 ETB</option>
                  <option value="500-1000">500 - 1000 ETB</option>
                  <option value="1000+">1000+ ETB</option>
                </select>
              </div>

            </div>
          </div>
        </div>

        {/* Results */}
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#2D2D49' }}>
          Search Results ({filteredResults.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredResults.map((pharmacy) => (
    <div
      key={pharmacy.id}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-3" style={{ color: '#2D2D49' }}>
            {pharmacy.pharmacyName}
          </h3>
          <p className="text-sm mb-1" style={{ color: '#1A1A1A' }}>
            <span className="font-semibold">Medicine:</span> {pharmacy.name}
          </p>
          <p className="text-sm mb-2" style={{ color: '#1A1A1A' }}>
            <span className="font-semibold">Address:</span> {pharmacy.address}
          </p>
         
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            pharmacy.available
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
          style={
            pharmacy.available
              ? { backgroundColor: `${theme.primary}15`, color: theme.primary }
              : { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }
          }
        >
          {pharmacy.available ? 'Available' : 'Out of Stock'}
        </span>
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-2xl font-bold" style={{ color: '#2D2D49' }}>
          {pharmacy.price} ETB
        </p>
      </div>

     <button
        onClick={() => {
          const query = encodeURIComponent(
            `${pharmacy.pharmacyName}, ${pharmacy.city}`
          );
          window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
        }}
        className="w-full py-2 px-4 rounded-lg font-semibold transition-colors text-white"
        style={{ backgroundColor: theme.primary }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = theme.secondary)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = theme.primary)}
      >
        Get Directions
      </button>

    </div>
  ))}
</div>

       
      </div>
    </div>
  );
};

export default SearchMedicine;

