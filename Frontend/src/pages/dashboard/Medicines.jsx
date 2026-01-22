import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Medicines = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace this with your actual pharmacy ID or auth-based method
  const pharmacyId = 'YOUR_PHARMACY_ID';

  // Fetch medicines from backend
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch(`/api/pharmacy/${pharmacyId}/medicines`);
        const data = await response.json();
        if (response.ok) {
          setMedicines(data.medicines || []);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, [pharmacyId]);

  const categories = [...new Set(medicines.map(m => m.category))];

  const filteredMedicines = medicines.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || m.category === categoryFilter;
    const matchesAvailability = !availabilityFilter || m.status === availabilityFilter;
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const handleDelete = async (medicineId) => {
    if (!window.confirm('Are you sure you want to delete this medicine?')) return;

    try {
      const response = await fetch('/api/medicine/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pharmacyId, medicineId })
      });
      const data = await response.json();
      if (response.ok) {
        setMedicines(medicines.filter(m => m._id !== medicineId));
      } else {
        alert(data.message || 'Failed to delete medicine.');
      }
    } catch (err) {
      console.error(err);
      alert('Server error while deleting medicine.');
    }
  };

  if (loading) return <p>Loading medicines...</p>;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#2D2D49' }}>
            Medicines Management
          </h1>
          <p style={{ color: '#1A1A1A' }}>Manage your pharmacy's medicine inventory</p>
        </div>
        <Link
          to="/dashboard/add-medicine"
          className="mt-4 md:mt-0 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
          style={{ backgroundColor: '#2BB673', color: 'white' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#239e5f'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2BB673'}
        >
          <span>Add Medicine</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medicine by name..."
            className="w-full px-4 py-2 rounded-lg border-2 outline-none transition-colors"
            style={{ color: '#1A1A1A', borderColor: '#E5E7EB' }}
          />

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border-2 outline-none transition-colors"
            style={{ color: '#1A1A1A', borderColor: '#E5E7EB', backgroundColor: 'white' }}
          >
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          {/* Availability */}
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border-2 outline-none transition-colors"
            style={{ color: '#1A1A1A', borderColor: '#E5E7EB', backgroundColor: 'white' }}
          >
            <option value="">All</option>
            <option value="available">Available</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Medicines Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#F6F8FA' }}>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: '#E5E7EB' }}>
              {filteredMedicines.map(m => (
                <tr key={m._id} className="hover:bg-gray-50 transition-colors">
                  <td>{m.name}</td>
                  <td>{m.category}</td>
                  <td>{m.stock}</td>
                  <td>{m.price} ETB</td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${m.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {m.status === 'available' ? '🟢 Available' : '🔴 Out of Stock'}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(m._id)} className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: '#1A1A1A' }}>No medicines found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Medicines;
