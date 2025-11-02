import React, { useState } from 'react'

const Pharmacies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pharmaciesPerPage = 6;

  // Mock pharmacy data
  const mockPharmacies = [
    {
      id: 1,
      name: 'Central Pharmacy',
      address: 'Bole Road, Addis Ababa, Ethiopia',
      phone: '+251 11 123 4567',
      email: 'info@centralpharmacy.et',
      city: 'Addis Ababa',
      logo: null
    },
    {
      id: 2,
      name: 'MedCare Pharmacy',
      address: 'Meskel Square, Addis Ababa, Ethiopia',
      phone: '+251 11 234 5678',
      email: 'contact@medcare.et',
      city: 'Addis Ababa',
      logo: null
    },
    {
      id: 3,
      name: 'Health Plus Pharmacy',
      address: 'Piazza, Addis Ababa, Ethiopia',
      phone: '+251 11 345 6789',
      email: 'info@healthplus.et',
      city: 'Addis Ababa',
      logo: null
    },
    {
      id: 4,
      name: 'City Pharmacy',
      address: 'CMC Road, Addis Ababa, Ethiopia',
      phone: '+251 11 456 7890',
      email: 'contact@citypharmacy.et',
      city: 'Addis Ababa',
      logo: null
    },
    {
      id: 5,
      name: 'Dire Dawa Medical Center',
      address: 'Main Street, Dire Dawa, Ethiopia',
      phone: '+251 25 111 2222',
      email: 'info@ddmc.et',
      city: 'Dire Dawa',
      logo: null
    },
    {
      id: 6,
      name: 'Bahir Dar Pharmacy',
      address: 'Lake Tana Road, Bahir Dar, Ethiopia',
      phone: '+251 58 222 3333',
      email: 'info@bahirdarpharmacy.et',
      city: 'Bahir Dar',
      logo: null
    },
    {
      id: 7,
      name: 'Bahir Dar Pharmacy',
      address: 'Lake Tana Road, Bahir Dar, Ethiopia',
      phone: '+251 58 222 3333',
      email: 'info@bahirdarpharmacy.et',
      city: 'Bahir Dar',
      logo: null
    },
  ]

    // Filter logic
  const filteredPharmacies = mockPharmacies.filter((pharmacy) => {
    const matchesSearch =
      pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase());
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

  const cities = [...new Set(mockPharmacies.map((p) => p.city))];

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: '#F6F8FA' }}>
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#2D2D49' }}>
          Registered Pharmacies
        </h1>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search by name or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-3 rounded-lg border-2 outline-none"
              style={{
                color: '#1A1A1A',
                borderColor: '#E5E7EB',
              }}
            />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-3 rounded-lg border-2 outline-none"
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

        {/* Pharmacies Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentPharmacies.map((pharmacy) => (
              <div
                key={pharmacy.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-4">
                  {/* Logo or Initial Placeholder */}
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-2xl"
                    style={{
                      backgroundColor: "rgba(11, 107, 107, 0.1)",
                      color: "#0B6B6B",
                    }}
                  >
                    {pharmacy.name.charAt(0)}
                  </div>

                  {/* Pharmacy Name */}
                  <div>
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: "#2D2D49" }}
                    >
                      {pharmacy.name}
                    </h3>
                    <p className="text-sm text-gray-500">Verified Pharmacy</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-sm mb-6">
                  <p className="flex items-start text-gray-700">
                    <span className="mr-2">📍</span>
                    {pharmacy.address}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <span className="mr-2">📞</span>
                    {pharmacy.phone}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <span className="mr-2">✉️</span>
                    {pharmacy.email}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    className="flex-1 py-2.5 rounded-lg font-semibold transition-colors"
                    style={{
                      backgroundColor: "#0B6B6B",
                      color: "white",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#095555")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#0B6B6B")
                    }
                  >
                    View Medicines
                  </button>

                  <button
                    className="flex-1 py-2.5 rounded-lg border font-semibold transition-colors"
                    style={{
                      borderColor: "#0B6B6B",
                      color: "#0B6B6B",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#0B6B6B";
                      e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#0B6B6B";
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