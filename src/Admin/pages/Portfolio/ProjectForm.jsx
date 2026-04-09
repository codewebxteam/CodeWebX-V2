import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import ImageUpload from "../../components/Shared/ImageUpload";
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Send, Loader2, Info, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const ProjectForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.editData; // Check if we are in Edit mode

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    link: "",
    tags: "",
    imageUrl: ""
  });
  const [loading, setLoading] = useState(false);

  // Pre-fill data if editing
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        desc: editData.desc || "",
        link: editData.link || "",
        tags: editData.tags ? editData.tags.join(", ") : "",
        imageUrl: editData.imageUrl || ""
      });
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl) return alert("System Error: No cover image detected. Please upload first.");
    
    setLoading(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(t => t !== ""),
        updatedAt: serverTimestamp()
      };

      if (editData) {
        // UPDATE EXISTING PROJECT
        await updateDoc(doc(db, "projects", editData.id), payload);
        alert("Portfolio Updated Successfully!");
      } else {
        // ADD NEW PROJECT
        await addDoc(collection(db, "projects"), {
          ...payload,
          createdAt: serverTimestamp()
        });
        alert("Project Deployed Successfully!");
      }
      
      navigate("/admin/portfolio");
    } catch (err) {
      console.error(err);
      alert("Action Failed: " + err.message);
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
          <h2 className="text-5xl font-black uppercase tracking-tighter text-white">
            {editData ? "Refine" : "Project"} <span className="text-[#00a63e]">{editData ? "Asset" : "Broadcast"}</span>
          </h2>
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mt-2 italic">
            {editData ? `Editing: ${editData.title}` : "Fill metadata to update portfolio"}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="md:col-span-2 space-y-4 bg-zinc-950/50 p-8 rounded-[2rem] border border-white/5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Info size={12} className="text-[#00a63e]" /> Project Visual Asset
              </label>
              {formData.imageUrl && (
                <div className="mb-4 rounded-xl overflow-hidden border border-white/10 h-40">
                  <img src={formData.imageUrl} className="w-full h-full object-cover opacity-60" alt="Preview" />
                </div>
              )}
              <ImageUpload onUploadSuccess={(url) => setFormData({...formData, imageUrl: url})} folder="portfolio" />
          </div>
          
          {/* Title */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Project Name</label>
            <input 
              type="text" value={formData.title} required
              placeholder="e.g. Hello 11" 
              className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl outline-none focus:border-[#00a63e] text-white font-bold placeholder:text-zinc-800 transition-all" 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
            />
          </div>
          
          {/* Link */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Live URL</label>
            <input 
              type="url" value={formData.link}
              placeholder="https://codewebx.com" 
              className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl outline-none focus:border-[#00a63e] text-white font-bold placeholder:text-zinc-800 transition-all" 
              onChange={(e) => setFormData({...formData, link: e.target.value})} 
            />
          </div>

          {/* Tags */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Category (Comma Separated)</label>
            <input 
              type="text" value={formData.tags}
              placeholder="App, Web, React" 
              className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl outline-none focus:border-[#00a63e] text-white font-bold placeholder:text-zinc-800 transition-all" 
              onChange={(e) => setFormData({...formData, tags: e.target.value})} 
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Intelligence Brief</label>
            <textarea 
              value={formData.desc} required
              placeholder="Describe the project..." 
              className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl outline-none focus:border-[#00a63e] text-white font-bold h-44 placeholder:text-zinc-800 transition-all resize-none leading-relaxed" 
              onChange={(e) => setFormData({...formData, desc: e.target.value})}
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`md:col-span-1 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-3 transition-all shadow-xl
              ${loading ? "bg-zinc-800 text-zinc-500" : "bg-[#00a63e] text-white hover:bg-white hover:text-black shadow-[#00a63e]/10"}`}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : (
              <>
                {editData ? "Commit Updates" : "Deploy to Production"} 
                {editData ? <RefreshCw size={16} /> : <Send size={16} />}
              </>
            )}
          </button>
        </form>
      </motion.div>
    </AdminLayout>
  );
};

export default ProjectForm;