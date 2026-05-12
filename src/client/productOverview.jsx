import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function ProductOverview() {
  const params = useParams();
  const productId = params.id;

  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/productId/${productId}`
      )
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setStatus("success");
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
        toast.error("Failed to load product details");
      });
  }, [productId]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold animate-pulse">
          Loading Product...
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-2xl font-bold">
          Failed to Load Product
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2">
        
        {/* Image Section */}
        <div className="bg-gray-200 flex items-center justify-center p-6">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-[450px] object-cover rounded-2xl hover:scale-105 transition duration-300"
          />
        </div>

        {/* Details Section */}
        <div className="p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {product?.name}
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            {product?.description}
          </p>

          <div className="mb-4">
            <span className="text-3xl font-bold text-green-600">
              Rs. {product?.price}
            </span>
          </div>

          <div className="flex gap-4 mt-6">
            <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
              Add to Cart
            </button>

            <button className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition">
              Buy Now
            </button>
          </div>

          {/* Extra Info */}
          <div className="mt-8 border-t pt-4 text-gray-500">
            
            <p>Stock: {product?.stock}</p>
          </div>
        </div>
      </div>
    </div>
  );
}