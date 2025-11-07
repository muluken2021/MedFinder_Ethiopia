import React, { useState } from 'react'

import FAQSection from '../components/FaqSection'
import { useTheme } from '../context/ThemeContext'  // ✅ import theme hook
import FindPharmacy from '../components/FindPharmacy'

import Hero from '../components/Hero'

const Home = () => {
  
  const { theme } = useTheme()  // ✅ access theme colors


  return (
    <>

     <Hero />

      

      <FindPharmacy />

      {/* Features Section */}
      <section className="py-16 px-4" style={{ backgroundColor: theme.background }}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: theme.primary }}>
            Why Choose MedFinder?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Fast Search',
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                ),
                text: 'Quickly find medicines with our powerful search engine that searches across all registered pharmacies.',
              },
              {
                title: 'Nearby Pharmacies',
                icon: (
                  <>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </>
                ),
                text: 'Discover pharmacies close to you with real-time location tracking and distance calculations.',
              },
              {
                title: 'Real-Time Availability',
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ),
                text: 'Get instant updates on medicine availability and stock status from pharmacies in real-time.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${theme.primary}15` }}
                >
                  <svg className="w-8 h-8" style={{ color: theme.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: theme.primary }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#1A1A1A' }}>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  )
}

export default Home

