import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Eye, EyeOff, Lock, Mail, ChevronRight, AlertCircle, Loader2 } from "lucide-react";
import heroimg from "../assets/location.png";

const Login = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ general: data.message || "Invalid credentials provided." });
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userName", data.userName || "User");

      if (data.role === "admin") navigate("/admin");
      else if (data.role === "pharmacy") navigate("/dashboard");

    } catch (err) {
      setErrors({ general: "Network connection error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <div >
      <div className="py-10 bg-brand-700"></div>
      <div className="min-h-screen flex bg-white font-sans py-20">
      {/* 🔹 LEFT SIDE: FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="mb-10 text-center sm:text-left">
            <h1 className="text-4xl font-bold text-gray-700 mb-3 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-gray-500 font-medium">
              Manage your pharmacy inventory and serve patients efficiently.
            </p>
          </div>

          {/* Error Banner */}
          {errors.general && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-sm font-medium">
              <AlertCircle size={18} />
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-600 transition-colors" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 bg-gray-50 outline-none transition-all ${
                    errors.email ? "border-red-200 focus:border-red-500 bg-red-50/30" : "border-transparent focus:border-brand-600 focus:bg-white"
                  }`}
                  placeholder="name@pharmacy.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs font-bold ml-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-600 transition-colors" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-4 rounded-2xl border-2 bg-gray-50 outline-none transition-all ${
                    errors.password ? "border-red-200 focus:border-red-500 bg-red-50/30" : "border-transparent focus:border-brand-600 focus:bg-white"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs font-bold ml-1">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-brand-600 text-white font-bold text-lg hover:bg-brand-700  transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Verifying...
                </>
              ) : (
                <>
                  Sign In <ChevronRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm font-medium mb-2">Partner with MedFinder?</p>
            <Link 
              to="/register-pharmacy" 
              className="text-brand-600 font-bold hover:text-brand-700 transition-colors flex items-center justify-center gap-1"
            >
              Register Your Pharmacy <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: IMAGE/INFO */}
      <div className="hidden lg:block lg:w-1/2 relative  bg-gray-50">
        
          <img
            src={heroimg}
            alt="Pharmacy Location Interface"
            className="absolute inset-0 w-full h-full "
          />
          {/* Overlay gradient for text readability */}
          
      </div>
      </div>
    </div>
  );
};

export default Login;