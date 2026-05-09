import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-6">
      <div className="max-w-xl text-center">
        {/* 404 Number */}
        <h1 className="text-7xl md:text-9xl font-black text-white/10 tracking-widest">
          404
        </h1>

        {/* Main Text */}
        <h2 className="text-3xl md:text-5xl font-bold text-white mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-400 mt-6 text-lg leading-relaxed">
          The page you are looking for doesn’t exist or may have been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition-all text-white font-medium"
          >
            <Home size={18} />
            Back Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-white font-medium"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;