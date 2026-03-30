import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={"/overview/" + product.productId}   className="group w-[300px] bg-white rounded-3xl overflow-hidden
      shadow-[0_8px_30px_rgb(0,0,0,0.08)]
      hover:shadow-[0_20px_50px_rgb(0,0,0,0.15)]
      transition-all duration-500">

      {/* Image Section */}
      <div className="h-[260px] bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <img
          src={product.image?.[0]}
          alt={product.name}
          className="h-[260px] w-[300px] object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h2 className="text-[20px] font-semibold text-gray-900 tracking-tight">
          {product.name}
        </h2>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-end gap-2">
          <span className="text-2xl font-semibold text-black">
            Rs. {product.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-400 line-through mb-1">
            Rs. {product.labalPrice.toLocaleString()}
          </span>
        </div>

        {/* Availability */}
        <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium
          ${product.stock > 0
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-600"}`}>
          {product.stock > 0 ? "Available" : "Out of Stock"}
        </span>

        {/* Button */}
        <button
          disabled={!product.isAvailable}
          className="w-full mt-4 py-3 rounded-2xl
            bg-black text-white text-sm font-medium
            hover:bg-gray-900 active:scale-95
            transition-all duration-300
            disabled:bg-gray-300 disabled:cursor-not-allowed ">
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
