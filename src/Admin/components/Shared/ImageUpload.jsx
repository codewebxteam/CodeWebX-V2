import React, { useState } from "react";
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle2 } from "lucide-react";

const ImageUpload = ({ onUploadSuccess, folder = "general" }) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [uploadDone, setUploadDone] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Optional: Check file size (e.g., max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("Bhai, file size 10MB se kam rakho!");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setLoading(true);
    setUploadDone(false);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", `codewebx/${folder}`);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      
      if (data.secure_url) {
        onUploadSuccess(data.secure_url);
        setUploadDone(true);
      } else {
        throw new Error(data.error?.message || "Upload Failed");
      }
    } catch (error) {
      console.error("Cloudinary Error:", error);
      alert("Cloudinary Sync Failed! Check your internet or format.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // FIXED: Removed fixed height (h-52), added min-height and padding.
    // Transition added for smooth height change on upload.
    <div className="group relative w-full h-auto min-h-52 bg-black border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center transition-all duration-500 hover:border-[#00a63e]/30 overflow-hidden p-6 pb-12">
      {preview ? (
        // FIXED: Flex container for centered image that never crops.
        <div className="w-full flex flex-col items-center justify-center relative">
          <img 
            src={preview} 
            alt="Preview" 
            // FIXED: Removed object-cover, added object-contain, h-auto, max-h-96 for control.
            // This ensures the image is never cropped from top or bottom.
            className={`w-auto h-auto max-w-full max-h-96 object-contain rounded-2xl transition-all ${loading ? "opacity-20 blur-sm" : "opacity-40"}`} 
          />
          
          {/* Overlay elements (Loader, Success check, Delete button) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            {loading ? (
              <Loader2 className="text-[#00a63e] animate-spin" size={32} />
            ) : uploadDone ? (
              <CheckCircle2 className="text-[#00a63e] animate-bounce" size={32} />
            ) : null}
            <span className="text-[8px] font-black uppercase tracking-widest text-white bg-black/50 px-3 py-1 rounded-full">
              {loading ? "Encrypting Asset..." : "Sync Complete"}
            </span>
          </div>

          {/* Delete Button */}
          <button 
            type="button"
            onClick={() => {
              // Memory cleanup
              URL.revokeObjectURL(preview);
              setPreview(null); 
              setUploadDone(false);
            }} 
            className="absolute top-0 right-0 p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all z-10"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        // Upload Placeholder (When no image selected)
        <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full py-10">
          <div className="p-5 bg-white/5 rounded-[1.5rem] mb-4 group-hover:scale-110 transition-transform">
            <ImageIcon className="text-zinc-500" size={30} />
          </div>
          <div className="text-center px-4">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-1">Select Media Source</p>
            <p className="text-[7px] font-bold text-zinc-700 uppercase tracking-widest">Supports: JPG, PNG, WEBP, AVIF</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            onChange={handleFileChange} 
            accept=".jpg, .jpeg, .png, .webp, .avif, image/*" 
          />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;