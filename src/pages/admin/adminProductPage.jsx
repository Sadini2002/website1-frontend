import { sampleProducts } from "../../assets/sample"
import { useState } from "react"

export default function AdminProductPage(){
    const {product, setProduct} =useState([sampleProducts])
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
                        <tr>
                        <td>as123</td>
                        <td>face</td>
                        <td>Tree</td>
                        <td>1500</td>
                        <td>free</td>
                        </tr>
                        
                    </tbody>


                </table>
            </div>
      
    )
}