import { Link } from "react-router-dom";
import UserData from "./userData";
import { useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";

export default function Header() {
  const navigate = useNavigate();

  console.log("header rendered");

  return (
    <header className="w-full h-[80px] bg-[#9085E4] shadow-xl flex items-center px-4">

      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src="/logo.png"
        alt="logo"
        className="h-[65px] w-[65px] rounded-full object-cover cursor-pointer border-2 border-white hover:scale-105 transition duration-300"
      />

      {/* Navigation */}
      <div className="flex-1 h-full flex justify-center items-center gap-6">

        <Link
          to="/"
          className="text-white text-[18px] font-semibold hover:text-yellow-200 transition duration-300"
        >
          Home
        </Link>

        <Link
          to="/products"
          className="text-white text-[18px] font-semibold hover:text-yellow-200 transition duration-300"
        >
          Product
        </Link>

        <Link
          to="/contact"
          className="text-white text-[18px] font-semibold hover:text-yellow-200 transition duration-300"
        >
          Contact
        </Link>

        <Link
          to="/about"
          className="text-white text-[18px] font-semibold hover:text-yellow-200 transition duration-300"
        >
          About
        </Link>

        <Link
          to="/profile"
          className="text-white text-[18px] font-semibold hover:text-yellow-200 transition duration-300"
        >
          Wishlist
        </Link>
      </div>

      
      <div className="w-[80px] h-[50px] bg-white rounded-full flex justify-center items-center shadow-md cursor-pointer hover:scale-105 transition duration-300">
        <Link to="/cart">
        <BsCart3/>
        </Link>
        
      </div>

    </header>
  );
}