import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { LocateIcon, Mail, MapPin, PhoneCall, Search } from 'lucide-react';

const Pharmacies = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pharmacies, setPharmacies] = useState([]); // <-- use this for real data
  const pharmaciesPerPage = 6;

  // Fetch pharmacies from backend API
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pharmacies'); // <-- your backend route
        const data = await response.json();
        setPharmacies(data);
      } catch (error) {
        console.error('Error fetching pharmacies:', error);
      }
    };
    fetchPharmacies();
  }, []);

  // Filter logic
  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    const matchesSearch =
      pharmacy.pharmacyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pharmacy.address && pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCity = !selectedCity || pharmacy.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  // Pagination logic
  const indexOfLastPharmacy = currentPage * pharmaciesPerPage;
  const indexOfFirstPharmacy = indexOfLastPharmacy - pharmaciesPerPage;
  const currentPharmacies = filteredPharmacies.slice(indexOfFirstPharmacy, indexOfLastPharmacy);

  const totalPages = Math.ceil(filteredPharmacies.length / pharmaciesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const cities = [...new Set(pharmacies.map((p) => p.city))];

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: theme.background }}>
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#2D2D49' }}>
          Registered Pharmacies
        </h1>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-3 border border-gray-200 w-full">
              <Search className="text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search by name or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-700 text-lg"
                style={{
                  color: '#1A1A1A',
                  borderColor: '#E5E7EB',
                }}
              />
            </div>

            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
              <MapPin className="text-gray-500" size={18} />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent flex-1 outline-none text-gray-700"
                style={{
                  color: '#1A1A1A',
                  borderColor: '#E5E7EB',
                  backgroundColor: 'white',
                }}
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Pharmacies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentPharmacies.map((pharmacy, index) => (
            <div
              key={pharmacy._id || index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              {/* Header Section */}
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold" style={{ color: "#2D2D49" }}>
                    {pharmacy.pharmacyName}
                  </h3>
                  <p className="text-sm text-gray-500">Verified Pharmacy</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm mb-6">
                {pharmacy.address && (
                  <p className="flex items-start text-gray-700">
                    <span className="mr-2"><MapPin size={20} color='#25bc95' /></span>
                    {pharmacy.address}
                  </p>
                )}
                {pharmacy.phone && (
                  <p className="flex items-center text-gray-700">
                    <span className="mr-2"><PhoneCall size={20} color='#25bc95' /></span>
                    {pharmacy.phone}
                  </p>
                )}
                {pharmacy.email && (
                  <p className="flex items-center text-gray-700">
                    <span className="mr-2"><Mail size={20} color='#25bc95' /></span>
                    {pharmacy.email}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="flex-1 py-2.5 rounded-lg font-semibold transition-colors"
                  style={{
                    backgroundColor: theme.primary,
                    color: theme.text,
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = theme.secondary)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = theme.primary)
                  }
                >
                  View Medicines
                </button>

                <button
                  className="flex-1 py-2.5 rounded-lg border font-semibold transition-colors"
                  style={{
                    borderColor: theme.primary,
                    color: theme.primary,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = theme.primary;
                    e.target.style.color = theme.text;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = theme.primary;
                  }}
                >
                  View on Map
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{
              borderColor: '#E5E7EB',
              color: '#1A1A1A',
            }}
          >
            Previous
          </button>
          <span className="px-4 py-2" style={{ color: '#1A1A1A' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{
              borderColor: '#E5E7EB',
              color: '#1A1A1A',
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pharmacies;
