import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4 mt-auto">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#2BB673' }}>MedFinder Ethiopia</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Your trusted partner in finding essential medicines across Ethiopia. 
              Connecting patients with pharmacies nationwide.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="transition-colors"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  onMouseEnter={(e) => e.target.style.color = '#2BB673'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="transition-colors"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  onMouseEnter={(e) => e.target.style.color = '#2BB673'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#privacy" 
                  className="transition-colors"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  onMouseEnter={(e) => e.target.style.color = '#2BB673'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 text-center" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>&copy; {new Date().getFullYear()} MedFinder Ethiopia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

