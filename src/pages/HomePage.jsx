import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full">

      {/* FULL SCREEN HERO */}
      <div
        className="relative h-screen w-full flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/2.jpeg')" }}
      >
        {/* Dark Blur Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        {/* Glass Card */}
        <div className="relative z-10 bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center border border-white/20 max-w-md w-full mx-4">
          <h1 className="text-4xl md:text-5xl text-white font-bold mb-4">
            Welcome to Our Store
          </h1>

          <p className="text-gray-200 text-lg mb-8">
            Shop amazing products with a smooth user experience.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/login"
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-lg"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
