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
      { name: 'Live Statistics', path: '/stats' },
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Pharmacy Registration', path: '/register-pharmacy' },
      { name: 'Report an Issue', path: '/report' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Data Protection', path: '/data' },
    ]
  };

  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-200">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        
        {/* Newsletter / CTA Section - Clean & High Contrast */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-16 border-b border-gray-200 items-center">
          <div>
            <h3 className="text-2xl font-bold text-[#111827] mb-3">
              Stay Informed on <span className="text-brand-600">Health Access</span>
            </h3>
            <p className="text-gray-500 max-w-md text-sm leading-relaxed">
              Join our network to receive critical updates on medicine availability and new verified pharmacy partners in your region.
            </p>
          </div>
          <div className="w-full max-w-md lg:ml-auto">
            <div className="flex p-1 bg-white rounded-xl border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-brand-100 transition-all">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-none outline-none flex-1 px-4 text-sm text-gray-800 placeholder:text-gray-400"
              />
              <button className="bg-brand-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-brand-700 transition-colors">
                <Send size={16} />
                Subscribe
              </button>
            </div>
          </div>
        </div> */}

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-16">
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6 group">
            <img src="/medlogo.png" className="w-7" />
              <span className="text-xl font-bold tracking-tight text-[#111827]">
                Ethio<span className="text-brand-600">Med</span>
              </span>
            </Link>
            <p className="text-gray-500 max-w-xs mb-8 text-sm leading-relaxed">
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
            <h4 className="text-[#111827] font-bold text-sm mb-6 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-500 hover:text-brand-600 transition-colors text-sm font-medium">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#111827] font-bold text-sm mb-6 uppercase tracking-wider">Support</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-500 hover:text-brand-600 transition-colors text-sm font-medium">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#111827] font-bold text-sm mb-6 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-500 hover:text-brand-600 transition-colors text-sm font-medium">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 gap-4">
          <p className="text-gray-400 text-xs font-medium">
            &copy; {new Date().getFullYear()} Ethio-Med. All rights reserved. Verified by Ministry of Health.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-xs font-medium">
            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-300" /> Addis Ababa, ET</span>
            <span className="flex items-center gap-1.5"><Phone size={14} className="text-gray-300" /> +251 900 000 000</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;