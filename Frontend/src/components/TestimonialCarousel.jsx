import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const testimonials = [
  {
    id: 1,
    name: "Selam H.",
    role: "Software Engineer",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    quote:
      "This app helped me find the nearest pharmacy in minutes. Extremely useful and reliable!",
  },
  {
    id: 2,
    name: "Tadesse K.",
    role: "Doctor",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    quote:
      "A must-have app for anyone looking for fast access to medicine. Smooth interface and accurate results.",
  },
  {
    id: 3,
    name: "Martha A.",
    role: "Student",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    quote:
      "I love the map integration! Finding pharmacies around my area is now effortless.",
  },
];

const ModernTestimonialCarousel = () => {
  const { theme } = useTheme();
  const [current, setCurrent] = useState(0);

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
    <section className="py-20 bg-gray-50">
      <div className="max-w-2xl mx-auto text-center relative mb-40">
        <div className="text-gray-600 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold py-3">
            What Our Users Say
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Praesentium animi dolor eveniet officiis dolorem blanditiis
            facilis ullam voluptates, voluptatibus ipsum.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative lg:flex  items-center justify-center">
          {testimonials.map((t, index) => {
            let positionClasses = "absolute top-0 w-full md:w-2/3 p-8 bg-white rounded-3xl shadow-2xl transform transition-all duration-700 ease-in-out";
            
            // Determine position for large screens
            if (window.innerWidth >= 768) {
              positionClasses +=
                index === current
                  ? " translate-x-0 z-20 scale-100 opacity-100"
                  : index === (current - 1 + testimonials.length) % testimonials.length
                  ? " -translate-x-full z-10 scale-90 opacity-50"
                  : " translate-x-full z-10 scale-90 opacity-50";
            } else {
              // Mobile: only middle card visible, others blurred behind
              if (index === current) {
                positionClasses += " translate-x-0 z-20 scale-100 opacity-100";
              } else {
                positionClasses += " translate-x-0 z-10 scale-95 opacity-30 blur-sm";
              }
            }

            return (
              <div key={t.id} className={positionClasses}>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-24 h-24 rounded-full object-cover shadow-lg"
                  />
                  <div className="text-left flex-1">
                    <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
                    <h4 className="font-bold text-gray-900">{t.name}</h4>
                    <p className="text-gray-500 text-sm">{t.role}</p>
                    <div className="flex mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`${
                            i < Math.round(t.rating) ? "text-yellow-400" : "text-gray-300"
                          }`}
                          size={16}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:scale-110 transition"
          >
            <ArrowLeft size={24} stroke={theme.primary} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:scale-110 transition"
          >
            <ArrowRight size={24} stroke={theme.primary} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full transition ${
                i === current ? `bg-[${theme.primary}]` : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernTestimonialCarousel;
