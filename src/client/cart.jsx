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
                        <div key={item.productid} className="w-[500px] h-[100px] rounded-tl-3xl rounded-bl-3xl bg-primary shadow-2xl flex flex-row">
                            <img src={item.image} alt={item.name} className="w-[100px] h-[100px] object-cover rounded-3xl"/>
                    </div>
                    )

                }
            )
           
           }
               
       </div>

    )
}