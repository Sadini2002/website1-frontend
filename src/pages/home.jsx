// src/components/HomePage.jsx
import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-800 to-green-900 flex flex-col text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-green-700/60 backdrop-blur-md">
        <h1 className="text-2xl font-bold">TreeWorld</h1>
        <ul className="hidden md:flex gap-6">
          <li><a href="#about" className="hover:text-green-300">About</a></li>
          <li><a href="#gallery" className="hover:text-green-300">Gallery</a></li>
          <li><a href="#contact" className="hover:text-green-300">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center flex-grow px-6 py-12 gap-8">
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Welcome to <span className="text-green-300">TreeWorld</span>
          </h2>
          <p className="text-lg text-sky-100/90">
            Discover the beauty of nature, the power of green, and the calm of forests.
          </p>
          <button className="bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-2 rounded-lg shadow-lg">
            Explore More
          </button>
        </div>

        {/* Tree Illustration */}
        <div className="md:w-1/2 flex justify-center relative">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-60 h-60 md:w-80 md:h-80"
          >
            <rect x="95" y="110" width="10" height="40" fill="#6b4f2a" />
            <circle cx="100" cy="100" r="30" fill="#0fa97d" />
            <circle cx="80" cy="110" r="25" fill="#0a8f6c" />
            <circle cx="120" cy="110" r="25" fill="#097f5e" />
          </svg>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-green-800/60 text-sm">
        © {new Date().getFullYear()} TreeWorld. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
