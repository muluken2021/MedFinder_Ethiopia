// import React, { useState, useEffect } from "react";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// const MapSection = ({ theme }) => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [pharmacies, setPharmacies] = useState([]);

//   // Load Google Maps
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // replace with your key
//   });

//   useEffect(() => {
//     // Get user location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         setUserLocation({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//       });
//     }

//     // Mock pharmacy data
//     setPharmacies([
//       { id: 1, name: "Central Pharmacy", lat: 9.03, lng: 38.74 },
//       { id: 2, name: "Green Pharmacy", lat: 9.04, lng: 38.75 },
//       { id: 3, name: "CityMed Pharmacy", lat: 9.05, lng: 38.73 },
//     ]);
//   }, []);

//   if (!isLoaded || !userLocation) {
//     return (
//       <div className="w-full h-96 flex items-center justify-center">
//         <p className="text-gray-500">Loading map...</p>
//       </div>
//     );
//   }

//   return (
//     <section className="py-12 px-4" style={{ backgroundColor: theme.background }}>
//       <div className="container mx-auto max-w-6xl">
//         <h2 className="text-3xl font-bold text-center mb-8" style={{ color: theme.primary }}>
//           Find Pharmacies Near You
//         </h2>
//         <div className="h-96 rounded-lg overflow-hidden shadow-lg">
//           <GoogleMap
//             center={userLocation}
//             zoom={14}
//             mapContainerStyle={{ width: "100%", height: "100%" }}
//           >
//             {/* User marker */}
//             <Marker
//               position={userLocation}
//               label="You"
//             />

//             {/* Pharmacy markers */}
//             {pharmacies.map((pharmacy) => (
//               <Marker
//                 key={pharmacy.id}
//                 position={{ lat: pharmacy.lat, lng: pharmacy.lng }}
//                 title={pharmacy.name}
//               />
//             ))}
//           </GoogleMap>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MapSection;
