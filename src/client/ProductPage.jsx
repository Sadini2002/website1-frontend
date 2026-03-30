import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../component/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading){
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, "")}/api/products`)
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      });
      }
  }, [isLoading]);

  return (
    <div className="w-full h-full bg-gray-200 flex flex-wrap justify-center items-center gap-4 p-4 overflow-auto">
     {
      products.map((product)=>{
        return(
          <ProductCard key={product.productId} product={product} />

        )
      }
       
        

      )
     }
    </div>
    
  );
}
