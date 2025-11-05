import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/media";
import axios from "axios";

export default function EditProductPage() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altName, setAltName] = useState([]); // stored as array of strings
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]); // File[] before upload
  const [labelPrice, setLabelPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);

  

  const navigate = useNavigate();

  async function updateProduct(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log("Admin Token:", token);
    if (!token) {
      toast.error("Admin not logged in");
      return;
    }

    if (!name || !productId) {
      toast.error("Please provide Product ID and Name");
      return;
    }

    if (!image || image.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    // Convert numeric fields to numbers and validate
    const numericPrice = Number(price);
    const numericLabelPrice = Number(labelPrice);
    const numericStock = Number(stock);

    if (Number.isNaN(numericPrice) || Number.isNaN(numericLabelPrice) || Number.isNaN(numericStock)) {
      toast.error("Price, Label Price and Stock must be valid numbers.");
      return;
    }

    try {
      // upload images (mediaUpload should return the uploaded image URL)
      const uploads = image.map((file) => mediaUpload(file));
      const imageUrls = await Promise.all(uploads);

      // Build product payload
      const productPayload = {
        productId: productId,
        name: name,
        altName: altName, // array
        price: numericPrice,
        description: description,
        image: imageUrls,
        labalPrice: numericLabelPrice, // note: matches your Mongoose field name
        stock: numericStock,
        isAvailable: Boolean(isAvailable),
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, "")}/api/products`,
        productPayload,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Product added successfully!");
      console.log("Response:", res.data);
      navigate("/admin/products");
    } catch (err) {
      console.error("Error adding product:", err);
      const message = err?.response?.data?.message || err.message || "Error adding product";
      toast.error(message);
    }
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-green-400 to-green-600 p-6">
    <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg animate-fadeIn">
      
      <h2 className="text-2xl font-extrabold text-center bg-gradient-to-r from-green-700 to-green-900 text-transparent bg-clip-text mb-6">
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

        <input
          type="file"
          accept="image/*"
          multiple
          className="file-input file-input-bordered w-full"
          onChange={(e) => setImage(Array.from(e.target.files))}
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
            className="bg-red-500 hover:bg-red-600 transition text-white font-semibold py-2 px-5 rounded-lg"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 px-6 rounded-lg"
            onChange={updateProduct}
          >
            update Product
          </button>
        </div>

      </form>
    </div>
  </div>
   
  );
}
