import React from 'react'

const About = () => {
  const steps = [
    {
      number: 1,
      title: 'Search for a medicine',
      description: 'Enter the medicine name in our search bar to find available pharmacies.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      number: 2,
      title: 'Find nearby pharmacies',
      description: 'Browse pharmacies with the medicine, see prices, and check availability.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      number: 3,
      title: 'Visit or contact directly',
      description: 'Get directions to the pharmacy or contact them directly for confirmation.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    }
  ]

  const teamMembers = [
    { name: 'Dr. Alemayehu Bekele', role: 'Founder & CEO', image: null },
    { name: 'Sara Tsegaye', role: 'Head of Operations', image: null },
    { name: 'Michael Hailu', role: 'Technology Lead', image: null },
  ]

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: '#F6F8FA' }}>
      <div className="container mx-auto max-w-6xl">
        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#2D2D49' }}>
              About MedFinder Ethiopia
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed" style={{ color: '#1A1A1A' }}>
              We connect patients to pharmacies — saving time and making healthcare access easier.
            </p>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: '#1A1A1A' }}>
              MedFinder Ethiopia is a revolutionary platform designed to bridge the gap between patients 
              and pharmacies across Ethiopia. Our mission is to ensure that every Ethiopian has easy access 
              to essential medicines by providing real-time information about medicine availability, prices, 
              and pharmacy locations.
            </p>
          </div>
        </section>

        {/* How It Works Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#2D2D49' }}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector Line (for desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5" style={{ backgroundColor: '#2BB673' }}>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-t-4 border-b-4 border-transparent" style={{ borderLeftColor: '#2BB673' }}></div>
                  </div>
                )}
                
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(43, 182, 115, 0.1)' }}>
                    <div style={{ color: '#2BB673' }}>
                      {step.icon}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#2BB673', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#2D2D49' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: '#1A1A1A' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vision Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#2D2D49' }}>
              Our Vision
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg leading-relaxed mb-4" style={{ color: '#1A1A1A' }}>
                Our vision is to become the leading healthcare technology platform in Ethiopia, ensuring that 
                every citizen can easily find and access essential medicines when they need them most. We aim to:
              </p>
              <ul className="space-y-3 list-disc list-inside" style={{ color: '#1A1A1A' }}>
                <li>Connect all pharmacies across Ethiopia to our platform</li>
                <li>Provide real-time medicine availability information</li>
                <li>Reduce the time patients spend searching for medicines</li>
                <li>Support healthcare accessibility in rural and urban areas</li>
                <li>Build a trusted network of verified pharmacies</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#2D2D49' }}>
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12" style={{ color: '#0B6B6B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#2D2D49' }}>
                  {member.name}
                </h3>
                <p style={{ color: '#1A1A1A' }}>
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Ethiopia Illustration Section */}
        <section className="bg-white rounded-lg shadow-md p-8 md:p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: 'rgba(43, 182, 115, 0.1)' }}>
              <svg className="w-20 h-20" style={{ color: '#2BB673' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#2D2D49' }}>
              Serving All of Ethiopia
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: '#1A1A1A' }}>
              From Addis Ababa to the most remote regions, MedFinder Ethiopia is committed to making 
              healthcare accessible to everyone. We're building a network that spans the entire country, 
              ensuring that no matter where you are, you can find the medicines you need.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About

