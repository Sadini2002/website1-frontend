import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/login",
        { email, password }
      );

      // Store token
      localStorage.setItem("token", response.data.token);
      console.log("Received token:", response.data.token);

      toast.success("Login successful!");

      // Redirect based on role
      if (response.data.user && response.data.user.role !== "admin") {
        navigate("/products");
      } else {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center bg-[#9085E4]"
      
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Animated Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#9085E4]/40 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl animate-pulse"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-[#9085E4] flex items-center justify-center shadow-lg border-4 border-white/20">
              <img
                src="/logo.png"
                alt="logo"
                className="w-12 h-12 object-cover rounded-full"
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold text-center text-white mb-2">
            Welcome Back
          </h2>

          <p className="text-center text-gray-300 mb-8">
            Login to continue your shopping journey
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-200 mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                className="w-full px-5 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#9085E4] transition-all duration-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-200 mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                className="w-full px-5 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#9085E4] transition-all duration-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-[#d7d1ff] hover:text-white hover:underline transition"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#9085E4] hover:bg-[#7c70dc] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-[#9085E4]/40 transition-all duration-300 hover:scale-[1.02]"
            >
              Login
            </button>

            {/* Sign Up */}
            <p className="text-center text-gray-300 text-sm">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-white font-semibold hover:text-[#d7d1ff] hover:underline transition"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;