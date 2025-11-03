import { createClient } from "@supabase/supabase-js"

const url="https://jfynjajzyqdbgilgitbt.supabase.co"
const key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmeW5qYWp6eXFkYmdpbGdpdGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MzUxMzEsImV4cCI6MjA3NzQxMTEzMX0.6pwr-BZ55xFjzmyxwGWZobQ3VGltGAIwewFwmpxTfdc"

const supabase = createClient(url, key)
export default function mediaUpload(file){
    const mediaUploadPromise = new Promise(
        (resolve, reject) => {
            if (file===null){ 
                reject("No file selected")
                return
                
            }
            const timeStamp = new Date().getTime()
            const newName = timeStamp+file.name
             supabase.storage.from("images").upload(`public/${image.name}`, image,
            { upsert:false,
                cacheControl:"3600",
            }).then(()=>{
                const publicUrl=supabase.storage.from("images").getPublicUrl("public/"+image.name)

                resolve(publicUrl)
            }).catch((err)=>{
                console.log(err)
                reject("Error occured in supabase connection")
            })
})
    

    return mediaUploadPromise
}
