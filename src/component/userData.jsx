import React from "react"
import { useState } from "react"
import mediaUpload from "../utils/media"
export default function UserData(){
    const [image,setImage]=useState(null)
    function fileupload(){
        mediaUpload(image[0]).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })

    }
    return (
        <div className="w-full h-full flex justify-center items-center flex-col">
            <input type="file" className="file-input file-input-bordared w-full max-w-xs"
            onChange={(e)=>{
                setImage(e.target.files[0])

            }}
               />   
            <button onClick={fileupload} className="bg-blue-500 texr-white font-bold py-2 px-4 rounded">Upload</button>

        </div>
    )}
        
        