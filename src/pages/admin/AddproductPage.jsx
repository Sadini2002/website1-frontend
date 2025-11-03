import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import mediaUpload from "../../utils/media";
import axios from "axios";

export default function AddProductPage() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altName, setAltName] = useState([]);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [labelPrice, setLabelPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);

  async function addProduct() {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      toast.error("Admin not logged in");
      return;
    }

    if (image.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    try {
      // Upload all images
      const promiseArray = image.map((file) => mediaUpload(file));
      const imageUrls = await Promise.all(promiseArray);

      // Build product object
      const product = {
        productId:productId,
        name:name,
        altName:altName,
        price:price,
        labelPrice: labelPrice,
        description: description,
        image: imageUrls,
        stock: stock,
        isAvailable:isAvailable,
      };

      // Send to backend
      axios.post(import.meta.env.VITE_BACKEND_URL+"api/products",
        product,
        {
          headers: {
            "Authorization": "Bearer " +token
          }
        }).then(()=>{
             toast.success("Product added successfully!");
      console.log("Response:", res.data);

        }).catch((e)=>{
            toast.error("Error adding product");
            console.error("Error response:", e);
        })
        

     
    } catch (err) {
      console.error("Error adding product:", err);
      toast.error("Error adding product");
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-green-500 p-6">
      <input
        type="text"
        placeholder="Product ID"
        className="input input-bordered w-full max-w-xs mb-4"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />

      <input
        type="text"
        placeholder="Product Name"
        className="input input-bordered w-full max-w-xs mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Alt Name (comma separated)"
        className="input input-bordered w-full max-w-xs mb-4"
        onChange={(e) => setAltName(e.target.value.split(","))}
      />

      <input
        type="number"
        placeholder="Price"
        className="input input-bordered w-full max-w-xs "
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />

      <textarea
        placeholder="Description"
        className="textarea textarea-bordered w-full max-w-xs mb-4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <input
        type="file"
        accept="image/*"
        multiple
        className="input input-bordered w-full max-w-xs mb-4"
        onChange={(e) => setImage(Array.from(e.target.files))}
      />

      <input
        type="number"
        placeholder="Label Price"
        className="input input-bordered w-full max-w-xs mb-4"
        value={labelPrice}
        onChange={(e) => setLabelPrice(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Stock"
        className="input input-bordered w-full max-w-xs mb-4"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <div className="w-full flex justify-center items-center mt-4">
        <Link
          to="/admin/products"
          className="bg-red-500 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </Link>

        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 ml-4 rounded"
          onClick={addProduct}
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
