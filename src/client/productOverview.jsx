import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { addToCart, getCart, removeFromCart } from "../utils/cart.js";
import { useNavigate } from "react-router-dom";

export default function ProductOverview() {
  const params = useParams();
  const productId = params.id;
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/productId/${productId}`
      )
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setSelectedImage(res.data?.image);
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
      <div className="flex justify-center items-center h-screen bg-[#9085E4]">
        <div className="text-2xl font-semibold text-white animate-pulse">
          Loading Product...
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex justify-center items-center h-screen bg-[#9085E4]">
        <div className="text-white text-2xl font-bold">
          Failed to Load Product
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9085E4] to-[#b8b0ff] flex justify-center items-center p-6">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden max-w-6xl w-full grid md:grid-cols-2">

        {/* IMAGE SECTION */}
        <div className="p-6 flex flex-col gap-4">

          {/* MAIN IMAGE */}
          <div className="bg-white/20 rounded-2xl p-4 flex justify-center">
            <img
              src={selectedImage || product?.image}
              alt={product?.name}
              className="w-full h-[420px] object-cover rounded-2xl transition-all duration-300 hover:scale-105"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto p-2">

            {product?.image && (
              <img
                src={product.image}
                onClick={() => setSelectedImage(product.image)}
                className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition ${
                  selectedImage === product.image
                    ? "border-white scale-110"
                    : "border-white/30"
                }`}
              />
            )}

            {Array.isArray(product?.images) &&
              product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition ${
                    selectedImage === img
                      ? "border-white scale-110"
                      : "border-white/30"
                  }`}
                />
              ))}
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="p-8 flex flex-col justify-center text-white">

          <h1 className="text-4xl font-bold mb-4">
            {product?.name}
          </h1>

          <p className="text-white/80 text-lg mb-6">
            {product?.description}
          </p>

          <div className="mb-4">
            <span className="text-3xl font-bold text-yellow-300">
              Rs. {product?.price}
            </span>
          </div>

          <div className="flex gap-4 mt-6">

            <button
              className="bg-white text-[#9085E4] px-6 py-3 rounded-xl font-semibold hover:scale-105 transition cursor-pointer"
              onClick={() => {
                
                console.log("old cart");
                console.log(getCart());
                addToCart(product, 1);
                
                console.log("new cart");
                console.log(getCart());
                toast.success("Added to cart");
               
              }}
            >
              Add to Cart
            </button>

            <button className="bg-black/40 border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-black/60 transition cursor-pointer">
              Buy Now
            </button>

          </div>

          <div className="mt-8 border-t border-white/20 pt-4 text-white/70">
            <p>Stock: {product?.stock}</p>
          </div>

        </div>
      </div>
    </div>
  );
}