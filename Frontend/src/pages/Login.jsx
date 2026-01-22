import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import heroimg from "../assets/location.png";

const Login = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ general: data.message || "Login failed" });
        return;
      }

      // Save token & role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role); // “admin” or “pharmacy”
      localStorage.setItem("userName", data.userName || "User");

      // Redirect based on role
      if (data.role === "admin") navigate("/admin");
      if (data.role === "pharmacy") navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setErrors({ general: "Server error. Please try again later." });
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-50">

      {/* Right Image */}
      <div className="md:w-1/2 hidden md:block relative">
        <img
          src={heroimg}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Left: Login Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 w-full">
        <div className="max-w-md w-full">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: "#2D2D49" }}>
              Welcome Back
            </h1>
            <p style={{ color: "#1A1A1A" }}>Sign in to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {errors.general && (
              <p className="text-red-500 text-center">{errors.general}</p>
            )}

            {/* Email */}
            <div>
              <label className="block mb-2 font-semibold" style={{ color: "#2D2D49" }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-semibold" style={{ color: "#2D2D49" }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 rounded-lg border-2 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-lg"
              style={{ backgroundColor: theme.primary, color: theme.text }}
            >
              Sign In
            </button>
          </form>

          {/* Register */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">Don't have a pharmacy account?</p>
            <Link to="/register-pharmacy" className="font-semibold" style={{ color: theme.primary }}>
              Register Your Pharmacy
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;
