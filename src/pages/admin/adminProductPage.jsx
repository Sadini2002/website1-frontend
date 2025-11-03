import axios from "axios"
import { sampleProducts } from "../../assets/sample"
import { useEffect, useState } from "react"

export default function AdminProductPage()  {
    const {product, setProduct} =useState([sampleProducts])
    useEffect(
        ()=>{
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/").then((res)=>{
            console.log(res.data)
            setProduct(res.data)
        })
        
        },[])
    return(

        <div className="w-full h-full max-h-full overflow-hidden">
            
                 <table className="w-full text-center ">
                    <thead>
                        <th>Product ID </th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                       
                        <th>Actions</th>
                    </thead>
                    <tbody>
                       
     
                        
                    </tbody>


                </table>
            </div>
      
    )
}