import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Star, ArrowRight, CheckCircle2, Building2 } from "lucide-react";

const pharmacies = [
  {
    id: 1,
    name: "Bethel Pharmacy",
    location: "Addis Ababa, 22 Mazoria",
    rating: 4.8,
    reviews: 312,
    tag: "Top Rated",
    tagColor: "bg-amber-50 text-amber-600 border-amber-100",
    image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "MedStar Pharmacy",
    location: "Bole, Morning Star Mall",
    rating: 4.6,
    reviews: 218,
    tag: "24 / 7 Open",
    tagColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Alem Pharmacy",
    location: "Piassa, Churchill Ave",
    rating: 4.4,
    reviews: 175,
    tag: "Verified",
    tagColor: "bg-blue-50 text-blue-600 border-blue-100",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=800",
  },
];

const perks = [
  "Ministry of Health Certified",
  "Real-time Stock Verification",
  "Temperature-Controlled Storage",
  "Trained Pharmaceutical Staff",
];

const FeaturedPharmacies = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gray-50/60">
      <div className=" mx-auto px-6 lg:px-30">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Content ── */}
          <div className="space-y-8 order-2 lg:order-1">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-300 mb-4">
                Pharmacy Network
              </p>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
                Partnered with Ethiopia's <br />
                <span className="text-brand-500">most trusted</span> pharmacies
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed max-w-md">
                We work exclusively with licensed institutions that meet strict standards
                for medicine authenticity, storage, and professional service.
              </p>
            </div>

            <ul className="space-y-3">
              {perks.map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700 text-sm font-medium">
                  <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate("/pharmacies")}
              className="cursor-pointer group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 transition-all hover:gap-4"
            >
              <Building2 size={18} />
              Explore All Pharmacies
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>

            <p className="text-xs text-gray-400 font-medium">1,200+ verified locations across Ethiopia</p>
          </div>

          {/* ── Right: Bento Grid ── */}
          <div className="grid grid-cols-5 grid-rows-2 gap-4 h-[480px] order-1 lg:order-2">
            {/* Large card */}
            <div
              className="col-span-3 row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm border border-white"
              onClick={() => navigate(`/pharmacy/${pharmacies[0].id}`)}
            >
              <img
                src={pharmacies[0].image}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={pharmacies[0].name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${pharmacies[0].tagColor}`}>
                  {pharmacies[0].tag}
                </span>
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="text-lg font-bold text-white mb-1">{pharmacies[0].name}</h3>
                <p className="text-white/70 text-xs flex items-center gap-1.5">
                  <MapPin size={11} /> {pharmacies[0].location}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <Star size={11} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-white text-xs font-bold">{pharmacies[0].rating}</span>
                  <span className="text-white/50 text-xs">({pharmacies[0].reviews})</span>
                </div>
              </div>
            </div>

            {/* Top-right card */}
            <div
              className="col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm border border-white"
              onClick={() => navigate(`/pharmacy/${pharmacies[1].id}`)}
            >
              <img
                src={pharmacies[1].image}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={pharmacies[1].name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${pharmacies[1].tagColor}`}>
                  {pharmacies[1].tag}
                </span>
              </div>
              <div className="absolute bottom-4 left-4">
                <h4 className="text-white font-bold text-sm leading-tight">{pharmacies[1].name}</h4>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={9} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-white/80 text-[10px] font-semibold">{pharmacies[1].rating}</span>
                </div>
              </div>
            </div>

            {/* Bottom-right card */}
            <div
              className="col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm border border-white"
              onClick={() => navigate(`/pharmacy/${pharmacies[2].id}`)}
            >
              <img
                src={pharmacies[2].image}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={pharmacies[2].name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${pharmacies[2].tagColor}`}>
                  {pharmacies[2].tag}
                </span>
              </div>
              <div className="absolute bottom-4 left-4">
                <h4 className="text-white font-bold text-sm leading-tight">{pharmacies[2].name}</h4>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={9} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-white/80 text-[10px] font-semibold">{pharmacies[2].rating}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedPharmacies;
