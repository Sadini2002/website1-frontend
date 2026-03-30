import axios from "axios";
import { use, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"

export default function ProductOverview() {

    const params =useParams();
    const productId = params.id;
    const [status, setStatus] = useState("loading");//loading and success and error
    const [product, setProduct] = useState(null);


    useEffect(
        () => {
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/productId/"+productId).then(
            (res)=>{
                console.log(res.data);
                setProduct(res.data);
                setStatus("success");
            }
        ).catch(
            (err)=>{
                console.log(err);
                setStatus("error");
                toast.error("Failed to load product details");
            }
        )
        
         } ,[])


  return (
    <div >
        <h1 className="text-2xl font-bold mb-4">Product Overview  {JSON.stringify(product)}</h1>

    </div> 
  )
}
