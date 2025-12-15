import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function AdminUserPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch users
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, "")}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        toast.error("Admin not logged in");
      });
  }, []);

  // Delete user
  function deleteUser(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Admin not logged in");
      return;
    }

    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, "")}/api/users/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        toast.success("User deleted successfully");
        setUsers((prev) => prev.filter((user) => user._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        toast.error("Failed to delete user");
      });
  }

  return (
    <div className="w-full h-full p-6 relative bg-gray-50 font-sans overflow-auto">
      {/* Floating Add User Button */}
      <Link
        to="/admin/addUser"
        className="fixed bottom-6 right-6 bg-green-600 text-white w-16 h-16 rounded-full shadow-xl hover:bg-green-700 flex items-center justify-center text-4xl transition-transform hover:scale-110"
      >
        +
      </Link>

      {!isLoading ? (
        <div className="overflow-x-auto rounded-2xl shadow-lg bg-white p-6">
          <table className="w-full text-center border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 border-b font-medium">User ID</th>
                <th className="p-3 border-b font-medium">Name</th>
                <th className="p-3 border-b font-medium">Email</th>
                <th className="p-3 border-b font-medium">Role</th>
                <th className="p-3 border-b font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <td className="p-3 border-b">{user._id}</td>
                    <td className="p-3 border-b">{user.firstname} {user.lastname}</td>
                    <td className="p-3 border-b">{user.email}</td>
                    <td className="p-3 border-b">{user.role}</td>
                    <td className="p-3 border-b">
                      <div className="flex justify-center items-center gap-4 text-xl">
                        <FaTrashCan
                          className="cursor-pointer text-red-500 hover:text-red-700 transition-colors"
                          onClick={() => deleteUser(user._id)}
                        />
                        <CiEdit
                          className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
                          onClick={() => navigate(`/admin/edit-user/${user._id}`)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-6 border-b text-gray-500" colSpan="5">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-center text-gray-600 text-xl">Loading...</h1>
      )}
    </div>
  );
}
