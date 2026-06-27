import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';

const footerLinks = {
  Platform: [
    { name: 'Search Medicine', path: '/search' },
    { name: 'Nearby Pharmacies', path: '/pharmacies' },
    { name: 'Register Pharmacy', path: '/register-pharmacy' },
    { name: 'Pharmacy Portal', path: '/login' },
  ],
  Company: [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '#' },
    { name: 'Terms of Service', path: '#' },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white">
      <div className=" mx-auto px-6 lg:px-30">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <img src="/medlogo.png" className="w-5 h-5 brightness-0 invert" alt="Logo" />
              </div>
              <span className="text-xl font-bold tracking-tight">Med Finder</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Empowering Ethiopians with real-time pharmaceutical access — because
              finding the right medicine should never be hard.
            </p>

            {/* Contact */}
            <div className="space-y-2.5">
              <p className="flex items-center gap-2.5 text-gray-400 text-sm">
                <MapPin size={14} className="text-gray-600 flex-shrink-0" />
                Addis Ababa, Ethiopia
              </p>
              <p className="flex items-center gap-2.5 text-gray-400 text-sm">
                <Phone size={14} className="text-gray-600 flex-shrink-0" />
                +251 900 000 000
              </p>
              <p className="flex items-center gap-2.5 text-gray-400 text-sm">
                <Mail size={14} className="text-gray-600 flex-shrink-0" />
                hello@medfinder.et
              </p>
            </div>

            {/* Socials */}
            <div className="flex gap-2.5 pt-2">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">
                {group}
              </h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between py-6 border-t border-white/10 gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Med Finder Ethiopia. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Verified by the Ethiopian Ministry of Health
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
