import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Pill, AlertCircle} from 'lucide-react';
import { fallbackPharmacies } from '../data/pharmacyData.js';

const PharmacyInventory = () => {
  const { pharmacyId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

 const currentPharmacy = fallbackPharmacies.find(p => String(p._id) === String(pharmacyId));

 const pharmacyName = currentPharmacy?.pharmacyName || "Bole Medhanealem Pharmacy";
  console.log(pharmacyName)
  // Mock Data - In a real app, fetch this using pharmacyId
  const inventory = [
    { id: 1, name: 'Amoxicillin 500mg', category: 'Antibiotic', price: 150, stock: 45, unit: 'Capsule' },
    { id: 2, name: 'Insulin Glargine', category: 'Diabetes', price: 1200, stock: 12, unit: 'Vial' },
    { id: 3, name: 'Paracetamol 500mg', category: 'Pain Relief', price: 40, stock: 150, unit: 'Tablet' },
    { id: 4, name: 'Metformin 850mg', category: 'Diabetes', price: 210, stock: 0, unit: 'Tablet' },
  ];

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div >
      <div className="py-10 bg-brand-700"></div>
    <div className="min-h-screen bg-gray-50/50">
      {/* 🔹 HEADER */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="lg:px-24 px-6 pt-14 pb-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-brand-600 transition-colors font-semibold text-sm"
          >
            <ChevronLeft size={20} /> Back to Network
          </button>
          <div className="text-right">
            <h1 className="text-lg font-bold text-gray-900 leading-tight">{pharmacyName}</h1>
            <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Live Inventory</p>
          </div>
        </div>
      </header>

      <main className="lg:px-24 px-6 py-10">
        {/* 🔹 SEARCH & STATS */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Search pharmacy stock..."
              className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* 🔹 INVENTORY TABLE */}
        <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-200/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Medication</th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Price</th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Availability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-brand-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all">
                          <Pill size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-400">{item.unit}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-8 py-6 font-bold text-gray-900">
                      {item.price} <span className="text-[10px] text-gray-400">ETB</span>
                    </td>
                    <td className="px-8 py-6">
                      {item.stock > 0 ? (
                        <div className="flex flex-col">
                          <span className="text-emerald-600 font-bold text-sm">In Stock</span>
                          <span className="text-[10px] text-gray-400">{item.stock} units left</span>
                        </div>
                      ) : (
                        <span className="text-red-400 font-bold text-sm flex items-center gap-1">
                          <AlertCircle size={14} /> Out of Stock
                        </span>
                      )}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
    </div>
  );
};

export default PharmacyInventory;