import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, PlusCircle, ArrowRight } from 'lucide-react';

const CTABanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white">
      <div className=" container mx-auto px-6 lg:px-24">
        <div className="relative bg-brand-600 rounded-2xl overflow-hidden p-12 md:p-16 lg:p-20">

          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-white/5 blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
          <div className="absolute top-8 left-8 w-24 h-24 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute bottom-8 right-8 w-40 h-40 rounded-full border border-white/10 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

            {/* Text */}
            <div className="text-center lg:text-left max-w-xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight mb-4">
                Start finding medicine<br className="hidden md:block" /> in your city today.
              </h2>
              <p className="text-white/70 text-md leading-relaxed">
                Join thousands of Ethiopians who rely on Med Finder to locate
                medicines and access verified pharmacies every day.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <button
                onClick={() => navigate('/search')}
                className="cursor-pointer flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white text-brand-500 font-bold text-sm hover:bg-gray-50 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                <Search size={18} />
                Search Medicine
              </button>
              <button
                onClick={() => navigate('/register-pharmacy')}
                className="cursor-pointer flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <PlusCircle size={18} />
                Register Pharmacy
                <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
