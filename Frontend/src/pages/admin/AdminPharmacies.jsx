import React, { useState, useEffect } from 'react';

const AdminPharmacies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [pharmacyToApprove, setPharmacyToApprove] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);

  // Fetch pharmacies from backend
  const fetchPharmacies = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/pharmacies');
      const data = await res.json();
      setPharmacies(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const filteredPharmacies = pharmacies.filter((p) => {
    const matchesSearch =
      p.pharmacyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      !statusFilter ||
      (statusFilter === 'approved' && p.isApproved) ||
      (statusFilter === 'pending' && !p.isApproved);
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (pharmacy) => {
    setPharmacyToApprove(pharmacy);
    setShowApprovalModal(true);
  };

  const confirmApprove = async () => {
    try {
      await fetch(`http://localhost:5000/api/admin/pharmacies/${pharmacyToApprove._id}/approve`, {
        method: 'PUT',
      });
      fetchPharmacies();
    } catch (err) {
      console.error(err);
    } finally {
      setShowApprovalModal(false);
      setPharmacyToApprove(null);
    }
  };

  const handleBlock = async (id) => {
    if (!window.confirm('Are you sure you want to block this pharmacy?')) return;
    try {
      await fetch(`http://localhost:5000/api/admin/pharmacies/${id}/block`, { method: 'PUT' });
      fetchPharmacies();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pharmacy?')) return;
    try {
      await fetch(`http://localhost:5000/api/admin/pharmacies/${id}`, { method: 'DELETE' });
      fetchPharmacies();
      if (selectedPharmacy?._id === id) setSelectedPharmacy(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#2D2D49' }}>
          Pharmacies Management
        </h1>
        <p style={{ color: '#1A1A1A' }}>Manage and approve pharmacy registrations</p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by pharmacy name or city..."
          className="w-full px-4 py-2 rounded-lg border-2 outline-none transition-colors"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border-2 outline-none transition-colors"
        >
          <option value="">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>
      </div>

 {/* Pharmacies Table */}
<div className="bg-white rounded-lg shadow-md overflow-hidden">
  <div className="overflow-x-auto">
    {filteredPharmacies.length === 0 ? (
      <div className="p-6 text-center text-gray-500">
        No registered pharmacies.
      </div>
    ) : (
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold">Pharmacy Name</th>
            <th className="px-6 py-4 text-left text-xs font-semibold">City</th>
            <th className="px-6 py-4 text-left text-xs font-semibold">Email</th>
            <th className="px-6 py-4 text-left text-xs font-semibold">Phone</th>
            <th className="px-6 py-4 text-left text-xs font-semibold">Status</th>
            <th className="px-6 py-4 text-left text-xs font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {filteredPharmacies.map((p) => (
            <tr
              key={p._id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedPharmacy(p)}
            >
              <td className="px-6 py-4">{p.pharmacyName}</td>
              <td className="px-6 py-4">{p.city}</td>
              <td className="px-6 py-4">{p.email}</td>
              <td className="px-6 py-4">{p.phone}</td>
              <td className="px-6 py-4">
                {p.isApproved ? 'Approved' : 'Pending'}
              </td>
              <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                {!p.isApproved && <button onClick={() => handleApprove(p)}>Approve</button>}
                <button onClick={() => handleBlock(p._id)}>Block</button>
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>


      {/* Approval Modal */}
      {showApprovalModal && pharmacyToApprove && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3>Approve {pharmacyToApprove.pharmacyName}?</h3>
            <div className="flex space-x-4 mt-4">
              <button onClick={confirmApprove} className="bg-green-500 text-white px-4 py-2 rounded">
                Confirm
              </button>
              <button
                onClick={() => setShowApprovalModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pharmacy Details Sidebar */}
      {selectedPharmacy && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3>{selectedPharmacy.pharmacyName}</h3>
          <p>Owner: {selectedPharmacy.ownerName}</p>
          <p>Email: {selectedPharmacy.email}</p>
          <p>Phone: {selectedPharmacy.phone}</p>
          <p>City: {selectedPharmacy.city}</p>
          <p>Address: {selectedPharmacy.address}</p>
          <p>License: {selectedPharmacy.licenseNumber}</p>
          <p>Status: {selectedPharmacy.isApproved ? 'Approved' : 'Pending'}</p>
        </div>
      )}
    </div>
  );
};

export default AdminPharmacies;

