import React, { useState } from 'react'

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('')

  // Mock users data
  const [users, setUsers] = useState([
    { id: 1, name: 'Alemayehu Bekele', email: 'alemayehu@example.com', role: 'User', joinedDate: '2024-01-10', active: true },
    { id: 2, name: 'Sara Tsegaye', email: 'sara@example.com', role: 'Pharmacy Owner', joinedDate: '2024-01-08', active: true },
    { id: 3, name: 'Michael Hailu', email: 'michael@example.com', role: 'User', joinedDate: '2024-01-05', active: false },
    { id: 4, name: 'Tesfaye Alem', email: 'tesfaye@example.com', role: 'Pharmacy Owner', joinedDate: '2024-01-03', active: true },
  ])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = !roleFilter || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      setUsers(users.filter(u => u.id !== id))
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#2D2D49' }}>Users Management</h1>
        <p style={{ color: '#1A1A1A' }}>Manage registered users and pharmacy owners</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="px-4 py-2 rounded-lg border-2 outline-none transition-colors"
            style={{ 
              color: '#1A1A1A',
              borderColor: '#E5E7EB'
            }}
            onFocus={(e) => e.target.style.borderColor = '#0B6B6B'}
            onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 outline-none transition-colors"
            style={{ 
              color: '#1A1A1A',
              borderColor: '#E5E7EB',
              backgroundColor: 'white'
            }}
          >
            <option value="">All Roles</option>
            <option value="User">User</option>
            <option value="Pharmacy Owner">Pharmacy Owner</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#F6F8FA' }}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Joined Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#2D2D49' }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: '#E5E7EB' }}>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium" style={{ color: '#2D2D49' }}>{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span style={{ color: '#1A1A1A' }}>{user.email}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={
                        user.role === 'Pharmacy Owner'
                          ? { backgroundColor: 'rgba(11, 107, 107, 0.1)', color: '#0B6B6B' }
                          : { backgroundColor: 'rgba(43, 182, 115, 0.1)', color: '#2BB673' }
                      }
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span style={{ color: '#1A1A1A' }}>{user.joinedDate}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={
                        user.active
                          ? { backgroundColor: 'rgba(43, 182, 115, 0.1)', color: '#2BB673' }
                          : { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }
                      }
                    >
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: '#0B6B6B' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(11, 107, 107, 0.1)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        title="View"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      {!user.active && (
                        <button
                          onClick={() => handleRemove(user.id)}
                          className="p-2 rounded-lg transition-colors"
                          style={{ color: '#EF4444' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          title="Remove"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers



