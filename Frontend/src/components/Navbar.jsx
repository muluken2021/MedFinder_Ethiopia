import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PlusCircle, LogIn, Search } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Search', path: '/search' },
  { name: 'Pharmacies', path: '/pharmacies' },
  { name: 'About', path: '/about' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100'
          : 'py-5 bg-white'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-24">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-brand-500 rounded-sm flex items-center justify-center flex-shrink-0">
              <img src="/medlogo.png" className="w-6 h-6 brightness-0 invert" alt="Logo" />
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              Med Finder
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive(link.path)
                    ? 'text-brand-500 bg-gray-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/search"
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all"
              aria-label="Search"
            >
              <Search size={18} />
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all"
            >
              <LogIn size={16} />
              Login
            </Link>
            <Link
              to="/register-pharmacy"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-brand-500 text-white hover:bg-brand-600 transition-all shadow-sm hover:shadow-md"
            >
              <PlusCircle size={16} />
              Pharmacy Portal
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute left-4 right-4 top-full mt-2 transition-all duration-300 origin-top ${
            mobileMenuOpen
              ? 'opacity-100 scale-y-100 pointer-events-auto'
              : 'opacity-0 scale-y-95 pointer-events-none'
          }`}
        >
          <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-gray-200/50 p-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive(link.path)
                    ? 'bg-gray-50 text-brand-500'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <LogIn size={16} /> Login
            </Link>
            <Link
              to="/register-pharmacy"
              className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-bold bg-brand-500 text-white"
            >
              <PlusCircle size={16} /> Pharmacy Portal
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
