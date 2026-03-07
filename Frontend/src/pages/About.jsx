import React from "react";
import { Search, MapPin, PhoneCall, Target, Users, Heart, ArrowRight, ShieldCheck, CheckCircle2, Award } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const steps = [
    {
      number: "01",
      title: "Intelligent Search",
      description: "Enter your prescription. Our engine cross-references live inventory across verified national networks.",
      icon: Search,
      color: "#2563EB"
    },
    {
      number: "02",
      title: "Geo-Location",
      description: "The system identifies the nearest pharmacies, prioritizing distance and real-time stock status.",
      icon: MapPin,
      color: "#7C3AED"
    },
    {
      number: "03",
      title: "Direct Access",
      description: "Secure direct contact and navigation details ensure you reach your medicine without delay.",
      icon: PhoneCall,
      color: "#059669"
    },
  ];

  const teamMembers = [
    { name: "Dr. Alemayehu Bekele", role: "Founder & CEO", initials: "AB" },
    { name: "Sara Tsegaye", role: "Head of Operations", initials: "ST" },
    { name: "Michael Hailu", role: "Technology Lead", initials: "MH" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/*  HERO SECTION */}
      <section className="relative py-32  overflow-hidden bg-brand-700">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-600/5 -skew-x-12 translate-x-20"></div>
        <div className="px-6 lg:px-24 text-start relative z-10">
          
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-100 mb-8 tracking-tight leading-tight">
            Connecting Care with Digital Precision
          </h1>
          <p className="text-md text-gray-200 max-w-2xl leading-relaxed">
            MedFinder Ethiopia is building the digital backbone of healthcare, 
            ensuring that no patient ever has to visit multiple pharmacies just to find essential medicine.
          </p>
        </div>
      </section>

      {/*  HOW IT WORKS */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Process</h2>
            <div className="h-1.5 w-20 bg-brand-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="group p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:border-brand-200 hover:bg-white hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300">
                <div className="text-5xl font-bold opacity-10 mb-4 group-hover:opacity-20 transition-opacity" style={{ color: step.color }}>
                  {step.number}
                </div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white shadow-sm border border-gray-100" style={{ color: step.color }}>
                  <step.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* 🔹 CALL TO ACTION */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-7xl mx-auto p-12  rounded-[3.5rem] bg-brand-50 border border-brand-100">
          <ShieldCheck className="mx-auto text-brand-600 mb-6" size={48} />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Ready to find your medicine?</h2>
          <p className="text-gray-500 mb-10 text-lg font-medium">Join thousands of Ethiopians making smarter healthcare choices today.</p>
          <Link to="/search">
            <button className="cursor-pointer inline-flex items-center gap-3 bg-brand-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-brand-700 transition-all shadow-xl shadow-gray-200 active:scale-95">
              Start Your Search <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;