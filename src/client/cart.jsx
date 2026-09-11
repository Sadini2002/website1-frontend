import { useState } from "react";
import { getCart } from "../utils/cart.js";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";

export default function CartPage() {


  const [cart, setcart] = useState(getCart());

    
    return (

       <div className="w-full h-full flex flex-col items-center pt-4">
    
        {
            cart.map(
                (item)=>{
                    return(
                        <div key={item.productId} className="w-[600px] h-[100px] rounded-tl-3xl rounded-bl-3xl bg-primary shadow-2xl flex flex-row">
                            <img src={item.image} alt={item.name} className="w-[100px] h-[100px] object-cover rounded-3xl"/>
                            <div className="w-[250px] h-full flex flex-col justify-center items-start pl-4 ">
                                <h1 className="text-2xl font-bold text-bold">{item.name}</h1>
                                <p className="text-lg text-bold">{item.productId}</p>
                                <p className="text-lg text-bold">${item.price.toFixed(2)}</p>
                                <p className="text-lg text-bold">Quantity: {item.qty}</p>
                            </div>
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