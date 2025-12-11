import { Link } from "react-router-dom"
import UserData from "./userData"
export default function Header(){
 return(
    <div>

        <header class="bg-white shadow-md">
  <div class="container mx-auto px-6 py-3 flex justify-between items-center shadow-sm">
    
    <nav class="hidden md:flex space-x-6">
      <Link to="/home" class="text-gray-600 hover:text-blue-600">Home</Link>
      <Link to="/login" class="text-gray-600 hover:text-blue-600">Login</Link>
      <Link to="/signup" class="text-gray-600 hover:text-blue-600">SignUp</Link>
      
    </nav>
    <button class="md:hidden text-gray-600 focus:outline-none">
      
      
    </button>
  </div>
</header>

    </div>



 )
}