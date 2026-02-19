import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Star, ArrowRight, Building2, CheckCircle2 } from "lucide-react";

const pharmacies = [
  {
    id: 1,
    name: "Bethel Pharmacy",
    location: "Addis Ababa, 22 Mazoria",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "MedStar Pharmacy",
    location: "Bole, Morning Star Mall",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Alem Pharmacy",
    location: "Piassa, Churchill Ave",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=800",
  },
];

const FeaturedPharmaciesHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 translate-x-32 z-0"></div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* GRID: LEFT SIDE (Refined Bento Layout) */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-6 h-[520px]">
            {/* Primary Featured Card */}
            <div 
              className="relative col-span-1 row-span-2 rounded-3xl overflow-hidden group cursor-pointer shadow-lg border border-gray-100"
              onClick={() => navigate(`/pharmacy/${pharmacies[0].id}`)}
            >
              <img src={pharmacies[0].image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={pharmacies[0].name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    <Star size={10} className="fill-yellow-400 text-yellow-400" /> {pharmacies[0].rating}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{pharmacies[0].name}</h3>
                <p className="text-white/80 text-xs flex items-center gap-1"><MapPin size={12} /> {pharmacies[0].location}</p>
              </div>
            </div>

            {/* Top Right Card */}
            <div 
              className="relative col-span-1 rounded-3xl overflow-hidden group cursor-pointer shadow-md border border-gray-100"
              onClick={() => navigate(`/pharmacy/${pharmacies[1].id}`)}
            >
              <img src={pharmacies[1].image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={pharmacies[1].name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-bold text-sm">{pharmacies[1].name}</h4>
                <div className="flex items-center gap-1 text-[10px] text-white/80">
                   <Star size={10} className="fill-yellow-400 text-yellow-400"/> {pharmacies[1].rating}
                </div>
              </div>
            </div>

            {/* Bottom Right Card */}
            <div 
              className="relative col-span-1 rounded-3xl overflow-hidden group cursor-pointer shadow-md border border-gray-100"
              onClick={() => navigate(`/pharmacy/${pharmacies[2].id}`)}
            >
              <img src={pharmacies[2].image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={pharmacies[2].name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-bold text-sm">{pharmacies[2].name}</h4>
                <div className="flex items-center gap-1 text-[10px] text-white/80">
                   <Star size={10} className="fill-yellow-400 text-yellow-400"/> {pharmacies[2].rating}
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT: RIGHT SIDE */}
          <div className="w-full lg:w-1/2 space-y-6">
            
            <h2 className="text-4xl md:text-5xl font-bold text-[#111827] leading-tight">
              Verified <span className="text-brand-500">Institutional</span> Partners
            </h2>
            
            <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
              We collaborate with Ethiopia's top-rated pharmaceutical institutions to ensure 
              authentic medicine, professional storage, and fair pricing.
            </p>

            <ul className="space-y-3 pt-2">
               {['Ministry of Health Certified', 'Real-time Stock Verification', 'Temperature Controlled Storage'].map((item) => (
                 <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                   <CheckCircle2 size={18} className="text-brand-400" /> {item}
                 </li>
               ))}
            </ul>

            <div className="pt-6">
              <button
                onClick={() => navigate("/pharmacies")}
                className="cursor-pointer group flex items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-gray-200 hover:border-brand-400 hover:shadow-lg hover:shadow-blue-50 transition-all w-full max-w-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-brand-500 text-white group-hover:bg-brand-500 transition-colors">
                    <Building2 size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-[#111827] font-bold text-base leading-none mb-1">Explore Directory</p>
                    <p className="text-gray-400 text-xs font-medium">1,200+ verified locations</p>
                  </div>
                </div>
                <ArrowRight className="text-gray-300 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedPharmaciesHero;