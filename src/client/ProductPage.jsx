import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../component/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL.replace(
            /\/+$/,
            ""
          )}/api/products`
        )
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#221586] via-[#9c92eb] to-[#b8b0ff] px-6 py-10">

      {/* Heading Section */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          Our Products
        </h1>

        <p className="text-white/80 mt-3 text-lg">
          Discover amazing products with the best quality
        </p>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[300px]">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Product Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-white text-lg font-medium">
              Total Products :{" "}
              <span className="font-bold">{products.length}</span>
            </p>

            <button className="bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-xl border border-white/20 hover:bg-white/30 transition-all">
              Latest Collection
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => {
              return (
                <div
                  key={product.productId}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-4 shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300"
                >
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}