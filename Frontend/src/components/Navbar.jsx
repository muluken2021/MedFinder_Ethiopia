import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PlusCircle, LogIn } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'py-3 bg-brand-700 shadow-xl' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container  px-6 lg:px-24 relative z-10">
        <div className="flex items-center justify-between">
          
          {/* 🔹 Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/medlogo.png" 
              className="w-7 brightness-0 invert" 
              alt="Logo"
            />
            <span className="text-xl font-bold text-white tracking-tight">
              Med Finder
            </span>
          </Link>

          {/* 🔹 Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive(link.path) 
                    ? 'text-white bg-white/20' 
                    : 'text-blue-50 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* 🔹 Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-sm font-semibold text-white hover:opacity-80 flex items-center gap-2">
              <LogIn size={18} /> Login
            </Link>
            <Link
              to="/register-pharmacy"
              className="px-5 py-2.5 rounded-lg font-bold text-sm transition-all bg-white text-brand-500 hover:bg-blue-50 shadow-lg flex items-center gap-2"
            >
              <PlusCircle size={18} />
              <span>Pharmacy Portal</span>
            </Link>
          </div>

          {/* 🔹 Mobile Menu Toggle (Hamburger) */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
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
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-2xl">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-semibold p-3 rounded-xl ${
                    isActive(link.path) ? 'bg-blue-50 text-brand-500' : 'text-gray-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-[1px] bg-gray-100 my-2" />
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-gray-600 font-semibold p-3"
              >
                <LogIn size={20} /> Login
              </Link>
              <Link
                to="/register-pharmacy"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 mt-2 rounded-xl text-white font-bold bg-brand-500 shadow-lg"
              >
                <PlusCircle size={20} /> Pharmacy Portal
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 MATCHED WAVE EFFECT 🔹
      <div className={`absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[95%] transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
        <svg 
          className="relative block w-full h-[40px]" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V46.29C80.7,71.4,200.23,78.93,321.39,56.44Z" 
            fill="#227FBB" 
          ></path>
        </svg>
      </div> */}
    </nav>
  );
};

export default Navbar;