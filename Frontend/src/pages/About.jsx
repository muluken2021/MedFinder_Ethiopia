import React from "react";

const About = () => {
  const steps = [
    {
      number: 1,
      title: "Search for a Medicine",
      description:
        "Enter the medicine name in our search bar to instantly see where it's available.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
    {
      number: 2,
      title: "Find Nearby Pharmacies",
      description:
        "Browse pharmacies near you, compare availability, and check medicine prices easily.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      number: 3,
      title: "Visit or Contact Directly",
      description:
        "Get directions or contact the pharmacy directly to confirm your medicine’s availability.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
  ];

  const teamMembers = [
    { name: "Dr. Alemayehu Bekele", role: "Founder & CEO" },
    { name: "Sara Tsegaye", role: "Head of Operations" },
    { name: "Michael Hailu", role: "Technology Lead" },
  ];

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 bg-gradient-to-b from-white to-[#F6F8FA]">
      <div className="max-w-6xl mx-auto">
        {/* Mission */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#2D2D49]">
            About <span className="text-[#0B6B6B]">MedFinder Ethiopia</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-700 max-w-3xl mx-auto">
            We connect patients and pharmacies—making access to medicines easier,
            faster, and smarter across Ethiopia.
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            MedFinder Ethiopia is a digital healthcare platform designed to
            simplify how people find essential medicines. We empower users to
            search, compare, and locate medicines from verified pharmacies in
            real-time.
          </p>
        </section>

        {/* How It Works */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-[#2D2D49] mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#E5F4F4] text-[#0B6B6B]">
                  {step.icon}
                </div>
                <div className="text-4xl font-bold text-[#0B6B6B] mb-2">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-[#2D2D49] mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Vision */}
        <section className="bg-white rounded-2xl shadow-md p-10 md:p-16 mb-20 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#2D2D49]">
            Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6 max-w-3xl mx-auto">
            To be Ethiopia’s leading digital healthcare platform—empowering
            people with reliable access to medicine and strengthening the
            country’s pharmacy network.
          </p>
          <ul className="text-left text-gray-700 max-w-2xl mx-auto space-y-3 list-disc list-inside">
            <li>Connect all Ethiopian pharmacies to a unified platform</li>
            <li>Provide real-time medicine availability updates</li>
            <li>Reduce time and cost for patients searching for medicines</li>
            <li>Support both rural and urban healthcare access</li>
            <li>Build a trusted network of verified pharmacies</li>
          </ul>
        </section>

        {/* Team */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#2D2D49]">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-24 h-24 rounded-full bg-[#E5F4F4] mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-[#0B6B6B]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#2D2D49] mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-700">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ethiopia Focus */}
        <section className="bg-white rounded-2xl shadow-md p-10 text-center">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#E5F4F4]">
            <svg
              className="w-10 h-10 text-[#2BB673]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[#2D2D49] mb-4">
            Serving All of Ethiopia
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            From Addis Ababa to remote rural areas, MedFinder Ethiopia is
            building a connected healthcare network—ensuring everyone has easy
            access to essential medicines and trusted pharmacies.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
