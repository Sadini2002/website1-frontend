import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, "")}/api/products`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        toast.error("Failed to load products");
      });
  }, []);

  // Delete product
  function deleteProduct(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Admin not logged in");
      return;
    }

    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, "")}/api/products/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        toast.success("Product deleted successfully");
        setProducts((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
        toast.error("Failed to delete product");
      });
  }

  return (
    <div className="w-full h-full p-6 relative bg-gray-50 font-sans overflow-auto">
      {/* Floating Add Product Button */}
      <Link
        to="/admin/addProduct"
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-16 h-16 rounded-full shadow-xl hover:bg-blue-700 flex items-center justify-center text-4xl transition-transform hover:scale-110"
      >
        +
      </Link>

      {!isLoading ? (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg bg-white p-6">
            <table className="w-full text-center border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 border-b font-medium">Product ID</th>
                  <th className="p-3 border-b font-medium">Image</th>
                  <th className="p-3 border-b font-medium">Name</th>
                  <th className="p-3 border-b font-medium">Price (Rs.)</th>
                  <th className="p-3 border-b font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.length > 0 ? (
                  products.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition-colors rounded-lg"
                    >
                      <td className="p-3 border-b">{item.productId}</td>

                      <td className="p-3 border-b">
                        {item.image?.length > 0 ? (
                          <img
                            src={item.image[0]}
                            alt={item.name}
                            className="w-16 h-16 object-cover mx-auto rounded-lg shadow-sm"
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>

                      <td className="p-3 border-b">{item.name}</td>
                      <td className="p-3 border-b">Rs. {item.price}</td>

                      <td className="p-3 border-b">
                        <div className="flex justify-center items-center gap-4 text-xl">
                          <FaTrashCan
                            className="cursor-pointer text-red-500 hover:text-red-700 transition-colors"
                            onClick={() => deleteProduct(item._id)}
                          />
                          <CiEdit
                            className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
                            onClick={() =>
                              navigate(`/admin/edit-product/${item.productId}`)
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-6 border-b text-gray-500" colSpan="5">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {products.length > 0 ? (
              products.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-4"
                >
                  {item.image?.length > 0 ? (
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg shadow-sm"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">ID: {item.productId}</p>
                    <p className="text-gray-600">Price: Rs. {item.price}</p>
                  </div>

                  <div className="flex gap-4">
                    <FaTrashCan
                      className="cursor-pointer text-red-500 hover:text-red-700 text-xl"
                      onClick={() => deleteProduct(item._id)}
                    />
                    <CiEdit
                      className="cursor-pointer text-blue-600 hover:text-blue-800 text-xl"
                      onClick={() =>
                        navigate(`/admin/edit-product/${item.productId}`)
                      }
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No products found.</p>
            )}
          </div>
        </>
      ) : (
        <h1 className="text-center text-gray-600 text-xl">Loading...</h1>
      )}
    </div>
  );
}

