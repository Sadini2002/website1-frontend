import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex md:grid-cols-2">

      {/* LEFT SIDE – HERO */}
      <div
        className="relative flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/2.jpeg')" }}
      >
        {/* Blur overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        <div className="relative z-10 bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center border border-white/20 max-w-md">
          <h1 className="text-4xl text-white font-bold mb-4">
            Welcome to Our Store
          </h1>
          <p className="text-gray-200 text-lg mb-8">
            Shop amazing products with a smooth user experience.
          </p>

          <div className="flex justify-center gap-4">
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

      {/* RIGHT SIDE – PRODUCTS (APPLE UI) */}
      <div className="bg-gray-50 flex flex-col justify-center px-10 py-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Product Card */}
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5"
            >
              <img
                src="https://via.placeholder.com/300"
                alt="product"
                className="rounded-xl mb-4 object-cover h-40 w-full"
              />

              <h3 className="text-lg font-medium text-gray-900">
                Product Name
              </h3>
              <p className="text-gray-500 text-sm mb-2">
                Short product description
              </p>

              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">$99</span>
                <button className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-900">
                
      
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
