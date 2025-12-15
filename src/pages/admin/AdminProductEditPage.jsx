import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import mediaUpload from "../../utils/media";

export default function AdminProductEditPage() {
  const { id } = useParams(); // Correct: MongoDB _id
  const navigate = useNavigate();

  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altName, setAltName] = useState([]);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [labelPrice, setLabelPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, "")}/api/products/${id}`
        );

        const p = res.data;

        setProductId(p.productId);
        setName(p.name);
        setAltName(p.altName || []);
        setPrice(p.price);
        setDescription(p.description);
        setExistingImages(p.image || []);
        setLabelPrice(p.labelPrice); // FIXED spelling
        setStock(p.stock);
        setIsAvailable(p.isAvailable);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product.");
      }
    }

    fetchProduct();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Admin not logged in");
      return;
    }

    // Upload new images
    let uploadedNewImages = [];
    if (newImages.length > 0) {
      uploadedNewImages = await Promise.all(
        newImages.map((file) => mediaUpload(file))
      );
    }

    const finalImages = [...existingImages, ...uploadedNewImages];

    const payload = {
      productId,
      name,
      altName,
      price: Number(price),
      description,
      image: finalImages,
      labelPrice: Number(labelPrice), // FIXED spelling
      stock: Number(stock),
      isAvailable,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, "")}/api/products/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Update failed");
    }
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-green-400 to-green-600 p-6">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-extrabold text-center bg-gradient-to-r from-blue-700 to-blue-900 text-transparent bg-clip-text mb-6">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Product ID"
            className="input input-bordered w-full"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />

          <input
            type="text"
            placeholder="Product Name"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Alt Name (comma separated)"
            className="input input-bordered w-full"
            value={altName.join(",")}
            onChange={(e) =>
              setAltName(
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
          />

          <input
            type="number"
            placeholder="Price"
            className="input input-bordered w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex gap-2 flex-wrap">
            {existingImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="prod"
                className="w-16 h-16 rounded object-cover"
              />
            ))}
          </div>

          <input
            type="file"
            accept="image/*"
            multiple
            className="file-input file-input-bordered w-full"
            onChange={(e) => setNewImages(Array.from(e.target.files))}
          />

          <input
            type="number"
            placeholder="Label Price"
            className="input input-bordered w-full"
            value={labelPrice}
            onChange={(e) => setLabelPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Stock"
            className="input input-bordered w-full"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <div className="flex items-center gap-3">
            <label className="font-medium text-gray-700">Available</label>
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
            />
          </div>

          <div className="flex justify-between pt-3">
            <Link
              to="/admin/products"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>  
    </div>
  );
}
