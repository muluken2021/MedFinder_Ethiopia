import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { Hospital, Scan, ScanSearch, Search } from "lucide-react";

const pharmacies = [
  {
    id: 1,
    name: "Bethel Pharmacy",
    location: "Addis Ababa, 22 Mazoria",
    rating: 4.8,
    image: "https://tse1.mm.bing.net/th/id/OIP.DgIQRnpEVLzlUy7Yi_ZOgwHaFj?pid=Api&P=0&h=220",
  },
  {
    id: 2,
    name: "MedStar Pharmacy",
    location: "Bole, Morning Star Mall",
    rating: 4.6,
    image: "https://tse3.mm.bing.net/th/id/OIP.GRDaam6CztlCWUC6IK0CUwHaEL?pid=Api&P=0&h=220",
  },
  {
    id: 3,
    name: "Alem Pharmacy",
    location: "Piassa, Churchill Ave",
    rating: 4.4,
    image: "https://tse3.mm.bing.net/th/id/OIP.sZEezQGXv64q1SFJNtH_1wHaD4?pid=Api&P=0&h=220",
  },
];

const FeaturedPharmaciesHero = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <section className="px-5 py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
  

        {/* Right Side - Vertical Stacked Images */}
        <div className="md:w-1/2 flex flex-col gap-6">
          {/* Top Image - Full Width */}
          <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={pharmacies[0].image}
              alt={pharmacies[0].name}
              className="w-full h-full object-cover"
            />
            {/* Darker gradient overlay for better text visibility */}
            <div className="absolute bottom-0 left-0 w-full h-55 bg-gradient-to-t from-black/90 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <h3 className="font-bold text-lg drop-shadow-lg">{pharmacies[0].name}</h3>
              <p className="text-sm drop-shadow-md">{pharmacies[0].location}</p>
              <button
                onClick={() => navigate(`/pharmacy/${pharmacies[0].id}`)}
                className="cursor-pointer duration-300 transform hover:scale-110 mt-2 px-3 py-1 text-sm rounded-xl font-semibold drop-shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                }}
              >
                View on Map
              </button>
            </div>
          </div>

          {/* Bottom Images - Half Width Each */}
          <div className="flex gap-6">
            {[1, 2].map((i) => (
              <div
                key={pharmacies[i].id}
                className="relative w-1/2 h-48 rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={pharmacies[i].image}
                  alt={pharmacies[i].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full h-55 bg-gradient-to-t from-black/90 to-transparent"></div>
                <div className="p-2 absolute bottom-2 left-2 right-2 text-white z-10">
                  <h3 className="font-bold text-sm drop-shadow-lg">{pharmacies[i].name}</h3>
                  <p className="text-xs drop-shadow-md">{pharmacies[i].location}</p>
                  <button
                    onClick={() => navigate(`/pharmacy/${pharmacies[i].id}`)}
                    className=" cursor-pointer duration-300 transform hover:scale-110 mt-3 px-2 py-1 text-xs rounded-xl font-semibold drop-shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                    }}
                  >
                    View on Map
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

              {/* Left Side - Title */}
        <div className="md:w-1/2 space-y-6 flex flex-col justify-center">
          <p className="font-bold " style={{color: theme.primary}}>Selected Pharmacies</p>
          <h2
            className="text-gray-600 text-3xl md:text-4xl font-bold"
            
          >
            Featured Pharmacies
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Explore top pharmacies near you. Get the best medicines quickly and reliably.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea earum saepe ex dolores hic totam quibusdam maiores commodi aliquam rem consectetur, alias illum nobis magni officia? Rem eveniet perferendis exercitationem.
          </p>
          <button
            onClick={() => navigate("/pharmacies")}
            className="cursor-pointer duration-300 transform hover:scale-105 px-8 lg:w-[70%] text-start py-3 rounded-xl  text-gray-600 border-green-400 border-1"
            style={{
              background: ` linear-gradient(135deg, ${theme.background}, ${theme.gradient1})`,
            }}
          >
            <div className="flex gap-5">
              <ScanSearch size={50}  color="green"/>
              <div>
                <p className="font-bold text-lg  py-2"> Find Pharmacy</p>
                 Find your medicine in verified pharmacies across ethiopia with a single search 
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPharmaciesHero;
