import React from "react";
import { MapPin, Search, Clock, Zap, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Intelligence Search",
    description: "Our advanced engine finds exact matches and therapeutic alternatives in seconds.",
    icon: Search,
    color: "#2563EB", // Medical Blue
  },
  {
    id: 2,
    title: "Precision Mapping",
    description: "Get real-time navigation to the nearest pharmacy with verified medicine in stock.",
    icon: MapPin,
    color: "#7C3AED", // Purple accent
  },
  {
    id: 3,
    title: "Live Stock Pulse",
    description: "Direct integration with pharmacy inventory systems ensures high data accuracy.",
    icon: Clock,
    color: "#059669", // Success Green
  },
];

const KeyFeatures = () => {
  return (
    <section className="relative py-24  overflow-hidden">
      {/* Subtle Structural Accents */}
      <div className="absolute top-0 left-0 w-full h-px "></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
            Designed for <span className="text-brand-600">Critical Access</span>
          </h2>
          <p className="text-gray-500 text-md leading-relaxed">
            We've removed the guesswork from healthcare. Our platform provides the most 
            reliable pharmaceutical data network in Ethiopia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative p-8 rounded-3xl bg-white border border-gray-200 hover:border-brand-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div
                  className="w-14 h-14 mb-8 flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 group-hover:bg-white group-hover:scale-110 transition-all duration-300"
                  style={{ color: feature.color }}
                >
                  <Icon size={28} strokeWidth={2} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed mb-6 text-sm">
                  {feature.description}
                </p>

                <div className="cursor-pointer flex items-center gap-2 text-xs font-bold text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>

        
      </div>
    </section>
  );
};

export default KeyFeatures;