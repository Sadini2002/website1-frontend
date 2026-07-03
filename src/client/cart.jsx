import { useState } from "react";
import { getCart } from "../utils/cart.js";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";

export default function CartPage() {
  const [cart, setcart] = useState(getCart());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 py-10 px-4">
      
      

      {/* Cart Items */}
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {cart.map((item) => {
          return (
            <div
              key={item.productid}
              className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 flex flex-col md:flex-row items-center gap-5 border border-gray-100"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-2xl shadow-md"
                />

                {item.labelledPrice > item.price && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    SALE
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">
                  {item.name}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Product ID: {item.productId}
                </p>

                <div className="mt-3">
                  {item.labelledPrice > item.price ? (
                    <div className="flex items-center gap-3">
                      <span className="line-through text-gray-400 text-lg">
                        Rs. {item.labelledPrice.toFixed(2)}
                      </span>

                      <span className="text-2xl font-bold text-green-600">
                        Rs. {item.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-green-600">
                      Rs. {item.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col items-center bg-gray-50 rounded-2xl p-3 shadow-sm">
                <button className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xl hover:bg-red-500 hover:text-white transition">
                  <BiMinus />
                </button>

                <span className="text-xl font-bold text-gray-800 my-3">
                  {item.qty}
                </span>

                <button className="w-10 h-10 rounded-full bg-green-100 text-green-500 flex items-center justify-center text-xl hover:bg-green-500 hover:text-white transition">
                  <BiPlus />
                </button>
              </div>

              {/* Total */}
              <div className="text-center px-4">
                <p className="text-gray-500 text-sm">Total</p>

                <h2 className="text-3xl font-bold text-blue-600 mt-1">
                  Rs. {(item.price * item.qty).toFixed(2)}
                </h2>
              </div>

              {/* Delete Button */}
              <button
                className="absolute -top-3 -right-3 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 hover:scale-110 transition-all duration-200"
              >
                <BiTrash size={20} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}