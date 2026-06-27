import React from "react";
import { MapPin, Search, Clock, ShieldCheck, Zap, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Intelligent Search",
    description:
      "Find exact medicines or therapeutic alternatives instantly. Our smart engine searches across thousands of pharmacy inventories in real time.",
    accent: "bg-blue-50 text-blue-600",
    border: "hover:border-blue-200",
  },
  {
    icon: MapPin,
    title: "Precision Mapping",
    description:
      "Turn-by-turn navigation to the nearest pharmacy carrying your medicine. Filter by distance, hours, or availability.",
    accent: "bg-violet-50 text-violet-600",
    border: "hover:border-violet-200",
  },
  {
    icon: Clock,
    title: "Live Stock Updates",
    description:
      "Direct integration with pharmacy systems means you always see what's truly in stock — no more wasted trips.",
    accent: "bg-emerald-50 text-emerald-600",
    border: "hover:border-emerald-200",
  },
  {
    icon: ShieldCheck,
    title: "MOH Verified",
    description:
      "Every pharmacy in our network is Ministry of Health certified and regularly audited for compliance and quality.",
    accent: "bg-orange-50 text-orange-600",
    border: "hover:border-orange-200",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Results appear in under a second, with filters for price range, open hours, and medicine form.",
    accent: "bg-yellow-50 text-yellow-600",
    border: "hover:border-yellow-200",
  },
  {
    icon: TrendingUp,
    title: "Transparent Pricing",
    description:
      "Compare prices side by side across pharmacies. No hidden fees — just honest, up-to-date pricing data.",
    accent: "bg-pink-50 text-pink-600",
    border: "hover:border-pink-200",
  },
];

const KeyFeatures = () => {
  return (
    <section className="py-24 bg-white">
      <div className=" mx-auto px-6 lg:px-30">

        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-300 mb-4">
            Platform Features
          </p>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
            Everything you need to find <br className="hidden sm:block" />
            medicine fast
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            We've removed the guesswork from pharmaceutical access. Built for patients,
            caregivers, and healthcare professionals across Ethiopia.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className={`group p-8 rounded-3xl bg-white border border-gray-100 transition-all duration-300 hover:shadow-xl hover:shadow-gray-100 ${feature.border}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${feature.accent} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={22} strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default KeyFeatures;
