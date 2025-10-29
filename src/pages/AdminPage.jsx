import { Link, Route, Routes } from "react-router-dom";
import AdminProductPage from "./admin/AdminProductPage";

export default function AdminPage(){
    return(
        <div className="w-full h-screen flex">
            <div className="h-full w-[300px]  flex flex-col">
                <Link to="/admin/products">Products</Link>
                <Link to="/admin/user">User</Link>
                <Link to="/admin/Order">Order</Link>
                <Link to="/admin/reviews">Review</Link>
            </div>
            <div className="h-full w-[calc(100%-300px)]">
                <Routes path="/*">
                <Route path="/products" element={<AdminProductPage/>}/>
                <Route path="/user" element={<h1>User</h1>}/>
                <Route path="/order" element={<h1>Order</h1>}/>
                <Route path="/reviews" element={<h1>Review</h1>}/>  
              </Routes>
            </div>



        </div>

    )

}