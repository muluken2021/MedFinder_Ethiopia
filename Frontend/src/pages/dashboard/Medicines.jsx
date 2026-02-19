import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Filter, Trash2, Edit3, Package, AlertTriangle, ChevronRight } from 'lucide-react';

const Medicines = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use authentication logic to get the pharmacy ID
  const pharmacyId = localStorage.getItem('pharmacyId') || 'PHARM-001';

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch(`/api/pharmacy/${pharmacyId}/medicines`);
        const data = await response.json();
        if (response.ok) {
          setMedicines(data.medicines || []);
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
    if (!window.confirm('Delete this item from inventory? This action cannot be undone.')) return;

    try {
      const response = await fetch('/api/medicine/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pharmacyId, medicineId })
      });
      if (response.ok) {
        setMedicines(medicines.filter(m => m._id !== medicineId));
      }
    } catch (err) {
      console.error(err);
      alert('Connection error. Please try again.');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-[#2D2D49] tracking-tight">
            Inventory <span className="text-blue-600">Management</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1 flex items-center gap-2">
            <Package size={18} className="text-blue-500" />
            {medicines.length} total products listed in your pharmacy.
          </p>
        </div>
        
        <Link
          to="/dashboard/add-medicine"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
        >
          <Plus size={20} /> Add New Medicine
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 p-4 mb-8 border border-gray-100 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search medicine by name or generic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white outline-none transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-blue-600/20 outline-none font-bold text-gray-600 transition-all cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-blue-600/20 outline-none font-bold text-gray-600 transition-all cursor-pointer"
          >
            <option value="">Status</option>
            <option value="available">Available</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Modern Table Container */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-400">Medicine Name</th>
              <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-400">Category</th>
              <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-400">Inventory</th>
              <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-400">Unit Price</th>
              <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-400">Status</th>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredMedicines.map((m) => (
              <tr key={m._id} className="group hover:bg-blue-50/30 transition-all duration-300">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Package size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-[#2D2D49] text-lg">{m.name}</div>
                      <div className="text-xs text-gray-400 font-medium tracking-wide uppercase">{m._id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm font-bold">
                    {m.category}
                  </span>
                </td>
                <td className="px-6 py-6 font-bold text-gray-700">
                  <div className="flex items-center gap-2">
                    {m.stock} Units
                    {m.stock <= 5 && <AlertTriangle size={16} className="text-orange-500" title="Low stock alert" />}
                  </div>
                </td>
                <td className="px-6 py-6 font-black text-gray-900">
                  {m.price} <span className="text-[10px] text-gray-400">ETB</span>
                </td>
                <td className="px-6 py-6">
                  <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter ${
                    m.status === 'available' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${m.status === 'available' ? 'bg-green-500' : 'bg-red-500'}`} />
                    {m.status === 'available' ? 'In Stock' : 'Out of Stock'}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2.5 rounded-xl hover:bg-blue-100 text-blue-600 transition-colors" title="Edit">
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(m._id)}
                      className="p-2.5 rounded-xl hover:bg-red-100 text-red-500 transition-colors" 
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-4 text-gray-300">
              <Filter size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">No matches found</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-2">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Medicines;