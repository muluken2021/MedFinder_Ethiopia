import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Send, Activity, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  // Medical Design System
  const styles = {
    primary: '#2563EB',      // Medical brand
    bgFooter: '#F9FAFB',     // Clean Surface Gray
    textMain: '#111827',     // Dark Gray
    textSecondary: '#6B7280',// Medium Gray
    border: '#E5E7EB'        // Light Gray Stroke
  };

  const footerLinks = {
    platform: [
      { name: 'Search Medicine', path: '/search' },
      { name: 'Nearby Pharmacies', path: '/pharmacies' },
      { name: 'Pharmacy Portal', path: '/login' },
    ],
    support: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'About Us', path: '/about' },
      { name: 'Pharmacy Registration', path: '/register-pharmacy' },
    ],
   
  };

  return (
    <footer className="bg-brand-700 pt-0 pb-10 border-t border-brand-600">
      <div className="container lg:px-24 px-6 lg:px-12">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-16">
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6 group">
              <span className="text-2xl font-bold tracking-tight text-gray-100">
                Med Finder
              </span>
            </Link>
            <p className="text-gray-200 max-w-xs mb-8 text-sm leading-relaxed">
              Empowering Ethiopian citizens with real-time access to life-saving pharmaceuticals through an intelligent data network.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="p-2.5 rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-brand-600 hover:border-brand-200 transition-all shadow-sm">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-gray-100 font-bold text-sm mb-6 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-200 hover:text-brand-50 transition-colors text-sm font-medium">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-100 font-bold text-sm mb-6 uppercase tracking-wider">Support</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-200 hover:text-brand-50 transition-colors text-sm font-medium">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 gap-4">
          <p className="text-gray-200 text-xs font-medium">
            &copy; {new Date().getFullYear()} Ethio-Med. All rights reserved. Verified by Ministry of Health.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-gray-200 text-xs font-medium">
            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-200" /> Addis Ababa, ET</span>
            <span className="flex items-center gap-1.5"><Phone size={14} className="text-gray-200" /> +251 900 000 000</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;