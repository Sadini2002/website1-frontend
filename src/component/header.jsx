import { Link } from "react-router-dom"
import UserData from "./userData";

import { useNavigate } from "react-router-dom"



export default function Header(){
  const navigate=useNavigate();
  console.log("header rendered");
 return(
    <header className="w-full  h-[80px] shadow-2xl  flex">

        
  
    <img onClick={() => navigate("/")} src="/logo.png" alt="logo" className=" h-[80px]  w-[80px] ml-4 mt-2 float-left object-cover cursor-pointer"/>
    <div className="w-[calc(100%-160px)] h-full bg-red-100  flex justify-center items-center">
    
      <Link to="/" className="text-[20px] font-bold mx-2">Home</Link>
      <Link to="/products" className="text-[20px] font-bold mx-2">Product</Link>
      <Link to="/contact" className="text-[20px] font-bold mx-2">Contact</Link>
      <Link to="/about" className="text-[20px] font-bold mx-2">About</Link>
      <Link to="/profile" className="text-[20px] font-bold mx-2">Wishlist</Link>
    
    </div>
    <div className="w-[80px] bg-blue-600"></div>
    
      
      
    
</header>

  



 )
}