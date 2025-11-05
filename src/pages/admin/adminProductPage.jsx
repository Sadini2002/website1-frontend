import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, "")}/api/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <div className="w-full h-full max-h-full overflow-hidden relative p-6">

      {/* Add Product Button */}
      <Link
        to="/admin/addProduct"
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center text-3xl"
      >
        +
      </Link>

      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Product ID</th>
            <th className="p-2 border">Product Image</th>
            <th className="p-2 border">Product Name</th>
            <th className="p-2 border">Price (Rs.)</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((item) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="p-2 border">{item.productId}</td>

                <td className="p-2 border">
                  {item.image && item.image.length > 0 ? (
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-16 h-16 object-cover mx-auto rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>

                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">Rs. {item.price}</td>

                <td className="p-2 border">
                    <div className="flex justify-center item-center gap-4 text-xl">
                  <FaTrashCan className="text-[20px] text-black-500 mx-2  cursor-pointer" />
                  <CiEdit className="text-[20px] text-black-500 mx-2 cursor-pointer" onClick={()=>{
                    navigate("admin/edit-product")
                  }}/>
                  </div>

                  

                 
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-4 border" colSpan="5">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
