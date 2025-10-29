import { Link } from "react-router-dom"
import UserData from "./userData"
export default function Header(){
 return(
    <div>

        <header class="bg-white shadow-md">
  <div class="container mx-auto px-6 py-3 flex justify-between items-center">
    <h1 class="text-2xl font-bold text-blue-600">MyWebsite</h1>
    <nav class="hidden md:flex space-x-6">
      <Link to="/home" class="text-gray-600 hover:text-blue-600">Home</Link>
      <Link to="/login" class="text-gray-600 hover:text-blue-600">Login</Link>
      <Link to="/signup" class="text-gray-600 hover:text-blue-600">SignUp</Link>
      <Link to="/admin" class="text-gray-600 hover:text-blue-600">Admin</Link>
    </nav>
    <button class="md:hidden text-gray-600 focus:outline-none">
      
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
</header>

    </div>



 )
}