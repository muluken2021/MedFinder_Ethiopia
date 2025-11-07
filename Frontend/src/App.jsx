import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SearchMedicine from './pages/SearchMedicine'
import Pharmacies from './pages/Pharmacies'
import About from './pages/About'
import Contact from './pages/Contact'
import RegisterPharmacy from './pages/RegisterPharmacy'
import Login from './pages/Login'
import DashboardLayout from './components/DashboardLayout'
import DashboardHome from './pages/dashboard/DashboardHome'
import Medicines from './pages/dashboard/Medicines'
import AddMedicine from './pages/dashboard/AddMedicine'
import Profile from './pages/dashboard/Profile'
import AdminDashboardLayout from './components/AdminDashboardLayout'
import DashboardOverview from './pages/admin/DashboardOverview'
import AdminPharmacies from './pages/admin/AdminPharmacies'
import AdminMedicines from './pages/admin/AdminMedicines'
import AdminUsers from './pages/admin/AdminUsers'
import AdminApprovals from './pages/admin/AdminApprovals'
import AdminReports from './pages/admin/AdminReports'
import AdminSettings from './pages/admin/AdminSettings'


import PrivateRoute from './components/PrivateRoute';

const AppContent = () => {
  const { theme } = useTheme()

  return (
    <Routes>
      {/* Public Routes with Navbar and Footer */}
      <Route path="/*" element={
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.background }}>
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchMedicine />} />
              <Route path="/pharmacies" element={<Pharmacies />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register-pharmacy" element={<RegisterPharmacy />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      } />
        
        
          {/* // Pharmacy Dashboard Routes */}
          <Route path="/dashboard" element={
            <PrivateRoute role="pharmacy">
              <DashboardLayout>
                <DashboardHome />
              </DashboardLayout>
            </PrivateRoute>
          } />
          <Route path="/dashboard/medicines" element={
            <PrivateRoute role="pharmacy">
              <DashboardLayout>
                <Medicines />
              </DashboardLayout>
            </PrivateRoute>
          } />
          <Route path="/dashboard/add-medicine" element={
            <PrivateRoute role="pharmacy">
              <DashboardLayout>
                <AddMedicine />
              </DashboardLayout>
            </PrivateRoute>
          } />
          <Route path="/dashboard/profile" element={
            <PrivateRoute role="pharmacy">
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </PrivateRoute>
          } />

          {/* // Admin Dashboard Routes */}
          <Route path="/admin" element={
            <PrivateRoute role="admin">
              <AdminDashboardLayout>
                <DashboardOverview />
              </AdminDashboardLayout>
            </PrivateRoute>
          } />
          <Route path="/admin/pharmacies" element={
            <PrivateRoute role="admin">
              <AdminDashboardLayout>
                <AdminPharmacies />
              </AdminDashboardLayout>
            </PrivateRoute>
          } />
          <Route path="/admin/medicines" element={
            <PrivateRoute role="admin">
              <AdminDashboardLayout>
                <AdminMedicines />
              </AdminDashboardLayout>
            </PrivateRoute>
          } />
          <Route path="/admin/users" element={
            <PrivateRoute role="admin">
              <AdminDashboardLayout>
                <AdminUsers />
              </AdminDashboardLayout>
            </PrivateRoute>
          } />
          <Route path="/admin/approvals" element={
            <PrivateRoute role="admin">
              <AdminDashboardLayout>
                <AdminApprovals />
              </AdminDashboardLayout>
            </PrivateRoute>
          } />
          <Route path="/admin/reports" element={
            <PrivateRoute role="admin">
              <AdminDashboardLayout>
                <AdminReports />
              </AdminDashboardLayout>
            </PrivateRoute>
          } />
          <Route path="/admin/settings" element={
            <PrivateRoute role="admin">
              <AdminDashboardLayout>
                <AdminSettings />
              </AdminDashboardLayout>
            </PrivateRoute>
          } />

    </Routes>
  )
}

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
