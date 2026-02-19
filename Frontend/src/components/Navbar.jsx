import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PlusCircle, LogIn, Activity } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Modern Healthcare Design System
  const styles = {
    primary: '#2563EB',      // Medical brand
    textMain: '#111827',     // Dark Gray
    textSecondary: '#6B7280',// Medium Gray
    bgHeader: 'rgba(255, 255, 255, 0.95)',
    border: '#E5E7EB'
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Search', path: '/search' },
    { name: 'Pharmacies', path: '/pharmacies' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav 
      className={`sticky top-0 md:mx-10 rounded-full z-[100] transition-all duration-300 ${
        scrolled ? 'py-3 shadow-sm border-b' : 'py-5 bg-white'
      }`}
      style={{ 
        backgroundColor: scrolled ? styles.bgHeader : 'transparent',
        borderColor: scrolled ? styles.border : 'transparent',
        backdropBlur: '12px'
      }}
    >
  
      <div className="container mx-auto max-w-9xl px-6 lg:px-12">
        <div className="flex items-center justify-between">
          
          {/* 🔹 Professional Medical Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img src="/medlogo.png" className="w-7" />
            <span className="text-xl font-bold tracking-tight text-[#111827]">
              Ethio<span className="text-brand-600">Med</span>
            </span>
          </Link>

          {/* 🔹 Minimal Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive(link.path) 
                    ? 'text-brand-600 bg-brand-50' 
                    : 'text-gray-500 hover:text-brand-500 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* 🔹 Action Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm border border-gray-400 px-5 py-2.5 rounded-lg  font-semibold text-gray-600 hover:text-brand-600 transition-colors"
            >
              <LogIn size={18} />
              Login
            </Link>
            
            <Link
              to="/register-pharmacy"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm text-white bg-brand-500 hover:bg-brand-600 transition-all shadow-md shadow-brand-100"
            >
              <PlusCircle size={18} />
              <span>Pharmacy Portal</span>
            </Link>
          </div>

          {/* 🔹 Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg bg-gray-50 text-gray-600 border border-gray-200"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 🔹 Mobile Menu Dropdown */}
        <div
          className={`md:hidden absolute left-0 right-0 top-full mt-2 px-6 transition-all duration-300 ${
            mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xl">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-semibold p-3 rounded-xl ${
                    isActive(link.path) ? 'bg-brand-50 text-brand-600' : 'text-gray-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-[1px] bg-gray-100 my-2" />
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-600 font-semibold p-3"
              >
                <LogIn size={20} /> Login
              </Link>
              <Link
                to="/register-pharmacy"
                className="flex items-center justify-center gap-2 w-full py-3.5 mt-2 rounded-xl text-white font-bold bg-brand-500 shadow-lg shadow-brand-100"
              >
                <PlusCircle size={20} /> Register Pharmacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;