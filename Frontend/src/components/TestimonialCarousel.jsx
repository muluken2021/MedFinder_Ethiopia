import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Selam H.",
    role: "Patient",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    quote:
      "This platform helped me find essential medication in minutes when every other pharmacy was out of stock. A lifesaver for our family.",
  },
  {
    id: 2,
    name: "Dr. Tadesse K.",
    role: "Medical Professional",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    quote:
      "I recommend this to all my patients. The real-time inventory tracking is accurate and saves people precious time during emergencies.",
  },
  {
    id: 3,
    name: "Martha A.",
    role: "Regular User",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    quote:
      "The interface is so clean and easy to use. I love how I can see exactly which pharmacies are open before I leave my house.",
  },
];

const ModernTestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);

  // Modern Medical Palette
  const colors = {
    primary: '#2563EB',
    textMain: '#111827',
    textSub: '#6B7280',
    bgLight: '#F9FAFB'
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6 text-center">
        
        {/* Header Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Trusted by the <span className="text-brand-500">Community</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Hear from the patients and healthcare providers using our network 
            to improve medical access across the country.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[400px] flex items-center justify-center">
          {testimonials.map((t, index) => {
            const isActive = index === current;
            
            return (
              <div 
                key={t.id} 
                className={`absolute w-full max-w-2xl transition-all duration-700 ease-in-out transform
                  ${isActive ? "opacity-100 scale-100 z-20" : "opacity-0 scale-95 z-10 pointer-events-none"}`}
              >
                <div className="bg-gray-50 border border-gray-100 p-8 md:p-12 rounded-[2rem] relative">
                  <Quote className="absolute top-8 right-8 text-blue-100" size={64} />
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="flex mb-6">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`mx-0.5 ${i < Math.round(t.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                          size={18}
                        />
                      ))}
                    </div>

                    <p className="text-xl md:text-2xl text-gray-700 font-medium italic leading-relaxed mb-8 relative z-10">
                      “{t.quote}”
                    </p>

                    <div className="flex items-center gap-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover"
                      />
                      <div className="text-left">
                        <h4 className="font-bold text-gray-900">{t.name}</h4>
                        <p className="text-brand-500 text-sm font-semibold uppercase tracking-wider">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Navigation Controls - Clean Outlined Style */}
          <div className="absolute w-full flex justify-between items-center z-30 px-2 pointer-events-none">
            <button
              onClick={handlePrev}
              className="pointer-events-auto p-4 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-brand-500 hover:border-blue-200 hover:shadow-lg transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto p-4 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-brand-500 hover:border-blue-200 hover:shadow-lg transition-all"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Minimal Progress Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 text-brand-500" : "w-2 bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernTestimonialCarousel;