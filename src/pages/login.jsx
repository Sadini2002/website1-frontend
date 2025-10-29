import axios from "axios";
import React, { use, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  async function handleSubmit(e) {
  e.preventDefault(); // prevent form reload

  console.log("Email:", email);
  console.log("Password:", password);

  try {
    const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login", {
      email,
      password,
    });

    toast.success("Login successful:");
    console.log( "login succussfull" , response.data);
    localStorage.setItem("token", response.data.token);

    
    if (response.data.user && response.data.user.role) {
      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/admin"); // Redirect non-admin users to dashboard as well
      }
    } else {
      // If backend doesn’t send a user object
      navigate("/admin");
    }
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Login failed. Please check your credentials.");
  }
}
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1920&auto=format&fit=crop')",
      }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-200 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-200 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all"
          >
            Login
          </button>

          <p className="text-center text-gray-300 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
