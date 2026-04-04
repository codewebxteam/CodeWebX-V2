import React, { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import ImageUpload from "../../components/Shared/ImageUpload";
import { db } from "../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const ProjectForm = () => {
  const [formData, setFormData] = useState({ title: "", desc: "", link: "", tags: "", imageUrl: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl) return alert("System Error: No cover image detected. Please upload first.");
    
    setLoading(true);
    try {
      await addDoc(collection(db, "projects"), {
        ...formData,
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(t => t !== ""),
        createdAt: serverTimestamp()
      });
      navigate("/admin/portfolio");
    } catch (err) {
      console.error(err);
      alert("Deployment Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl">
        <button onClick={() => navigate(-1)} className="text-zinc-500 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Vault
        </button>

        <div className="mb-12">
          <h2 className="text-5xl font-black uppercase tracking-tighter text-white">Project <span className="text-[#00a63e]">Broadcast</span></h2>
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mt-2 italic">Fill metadata to update portfolio</p>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2 space-y-4">
             <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Project Visual Asset (Recommended: 1280x720)</label>
             <ImageUpload onUploadSuccess={(url) => setFormData({...formData, imageUrl: url})} folder="portfolio" />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Internal Title</label>
            <input type="text" placeholder="Project Name" required className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl outline-none focus:border-[#00a63e] text-white font-bold placeholder:text-zinc-800 transition-all" 
              onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Target Link</label>
            <input type="url" placeholder="https://live-site.com" className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl outline-none focus:border-[#00a63e] text-white font-bold placeholder:text-zinc-800 transition-all" 
              onChange={(e) => setFormData({...formData, link: e.target.value})} />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Technologies Used (Comma Separated)</label>
            <input type="text" placeholder="React, Firebase, Tailwind, Node.js" className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl outline-none focus:border-[#00a63e] text-white font-bold placeholder:text-zinc-800 transition-all" 
              onChange={(e) => setFormData({...formData, tags: e.target.value})} />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Intelligence Brief (Description)</label>
            <textarea placeholder="Describe the project objective and results..." className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl outline-none focus:border-[#00a63e] text-white font-bold h-40 placeholder:text-zinc-800 transition-all resize-none" 
              onChange={(e) => setFormData({...formData, desc: e.target.value})}></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`md:col-span-1 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-3 transition-all shadow-xl
              ${loading ? "bg-zinc-800 text-zinc-500" : "bg-[#00a63e] text-white hover:bg-white hover:text-black shadow-[#00a63e]/10"}`}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <>Sync to Live Site <Send size={16} /></>}
          </button>
        </form>
      </motion.div>
    </AdminLayout>
  );
};

export default ProjectForm;