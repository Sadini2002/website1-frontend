import { createClient } from "@supabase/supabase-js";

const url = "https://jfynjajzyqdbgilgitbt.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmeW5qYWp6eXFkYmdpbGdpdGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MzUxMzEsImV4cCI6MjA3NzQxMTEzMX0.6pwr-BZ55xFjzmyxwGWZobQ3VGltGAIwewFwmpxTfdc";

const supabase = createClient(url, key);

export default function mediaUpload(file) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!file) {
        reject("No file selected");
        return;
      }

      const timeStamp = new Date().getTime();
      const newName = `${timeStamp}_${file.name}`;

      // ✅ Use file instead of image
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`public/${newName}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Upload error:", error);
        reject("Error occurred during upload");
        return;
      }

      // ✅ Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(`public/${newName}`);

      resolve(publicUrlData.publicUrl);
    } catch (err) {
      console.error("Unexpected error:", err);
      reject("Unexpected error occurred");
    }
  });
}
