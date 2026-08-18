import { useState } from "react";
import { getCart } from "../utils/cart.js";


export default function CartPage() {
    const [cart, setcart]=useState(getCart());

    
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

                    </div>
                    )

                }
            )
           
           }
               
       </div>

    )
}