import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route path="/*" element={
          <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F6F8FA' }}>
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
        
        {/* Dashboard Routes with Dashboard Layout */}
        <Route path="/dashboard" element={
          <DashboardLayout>
            <DashboardHome />
          </DashboardLayout>
        } />
        <Route path="/dashboard/medicines" element={
          <DashboardLayout>
            <Medicines />
          </DashboardLayout>
        } />
        <Route path="/dashboard/add-medicine" element={
          <DashboardLayout>
            <AddMedicine />
          </DashboardLayout>
        } />
        <Route path="/dashboard/profile" element={
          <DashboardLayout>
            <Profile />
          </DashboardLayout>
        } />
        
        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={
          <AdminDashboardLayout>
            <DashboardOverview />
          </AdminDashboardLayout>
        } />
        <Route path="/admin/pharmacies" element={
          <AdminDashboardLayout>
            <AdminPharmacies />
          </AdminDashboardLayout>
        } />
        <Route path="/admin/medicines" element={
          <AdminDashboardLayout>
            <AdminMedicines />
          </AdminDashboardLayout>
        } />
        <Route path="/admin/users" element={
          <AdminDashboardLayout>
            <AdminUsers />
          </AdminDashboardLayout>
        } />
        <Route path="/admin/approvals" element={
          <AdminDashboardLayout>
            <AdminApprovals />
          </AdminDashboardLayout>
        } />
        <Route path="/admin/reports" element={
          <AdminDashboardLayout>
            <AdminReports />
          </AdminDashboardLayout>
        } />
        <Route path="/admin/settings" element={
          <AdminDashboardLayout>
            <AdminSettings />
          </AdminDashboardLayout>
        } />
      </Routes>
    </Router>
  )
}

export default App
