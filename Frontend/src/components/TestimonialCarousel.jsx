import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Selam Haile",
    role: "Patient",
    location: "Addis Ababa",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    quote:
      "I found the medication I desperately needed in under 2 minutes. Every other pharmacy was out of stock, but Med Finder showed me exactly where to go. Truly a lifesaver.",
  },
  {
    id: 2,
    name: "Dr. Tadesse Kebede",
    role: "Medical Doctor",
    location: "Bahir Dar General Hospital",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    quote:
      "I recommend this platform to all my patients. The real-time inventory data is remarkably accurate and saves people precious time, especially during emergencies.",
  },
  {
    id: 3,
    name: "Martha Alemu",
    role: "Caregiver",
    location: "Hawassa",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    quote:
      "The interface is so clean and simple. I can see which pharmacies are open before leaving home, and the directions are perfect. It's made managing my mother's prescriptions so much easier.",
  },
];

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setCurrent((p) => (p === 0 ? testimonials.length - 1 : p - 1));
  const next = () => setCurrent((p) => (p + 1) % testimonials.length);

  return (
    <section className="py-24 bg-gray-50/60">
      <div className=" mx-auto px-6 lg:px-30">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-300 mb-4">
              Testimonials
            </p>
            <h2 className="text-4xl font-bold text-brand-500 leading-tight tracking-tight">
              Trusted by the <span className="text-brand-500">community</span>
            </h2>
            <p className="text-gray-500 text-lg mt-3 max-w-lg">
              Hear from patients and healthcare professionals who use Med Finder
              to improve medical access every day.
            </p>
          </div>
          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-2xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-brand-500 hover:border-slate-300 hover:shadow-md transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-2xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-brand-500 hover:border-slate-300 hover:shadow-md transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => {
            const isActive = index === current;
            return (
              <div
                key={t.id}
                onClick={() => setCurrent(index)}
                className={`relative p-8 rounded-3xl border cursor-pointer transition-all duration-500 ${
                  isActive
                    ? "bg-brand-400 border-brand-400 text-white shadow-2xl shadow-brand-500/20 scale-[1.02]"
                    : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-lg"
                }`}
              >
                {/* Quote icon */}
                <Quote
                  size={40}
                  className={`absolute top-6 right-6 ${isActive ? "text-white/10" : "text-gray-100"}`}
                />

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < t.rating
                          ? isActive
                            ? "fill-yellow-300 text-yellow-300"
                            : "fill-yellow-400 text-yellow-400"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p
                  className={`text-base leading-relaxed mb-8 ${
                    isActive ? "text-white/90" : "text-gray-600"
                  }`}
                >
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className={`w-11 h-11 rounded-full object-cover border-2 ${
                      isActive ? "border-white/30" : "border-gray-100"
                    }`}
                  />
                  <div>
                    <p className={`font-bold text-sm ${isActive ? "text-white" : "text-gray-900"}`}>
                      {t.name}
                    </p>
                    <p className={`text-xs mt-0.5 ${isActive ? "text-white/60" : "text-gray-400"}`}>
                      {t.role} · {t.location}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-6 h-2 bg-brand-500" : "w-2 h-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
