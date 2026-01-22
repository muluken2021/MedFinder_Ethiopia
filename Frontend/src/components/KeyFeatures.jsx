import React from "react";
import { MapPin, Search, Clock, Bell } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const features = [
    
    {
    id: 1,
    title: "Quick Medicine Search",
    description:
      "Search for any medicine quickly and see which pharmacies have it in stock.",
    icon: Search,
  },
  {
    id: 2,
    title: "Find Nearby Pharmacies",
    description:
      "Locate pharmacies around your area instantly using our integrated map feature.",
    icon: MapPin,
  },
 
  {
    id: 3,
    title: "Real-Time Availability",
    description:
      "Get up-to-date information about medicine availability in nearby stores.",
    icon: Clock,
  },
  
];

const KeyFeatures = () => {
  const { theme } = useTheme();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Key Features</h2>
        <p className="text-gray-600 mb-12">
          Med Finder makes it easy to locate and access medicines quickly and reliably.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2"
              >
                <div
                  className="p-4 mb-4 inline-block rounded-full bg-gray-100"
                  style={{ color: theme.primary }}
                >
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
