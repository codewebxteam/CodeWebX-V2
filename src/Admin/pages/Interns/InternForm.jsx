import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import ImageUpload from "../../components/Shared/ImageUpload";
import { db } from "../../../firebase"; 
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Send, Loader2, User } from "lucide-react";

const InternForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.editData;
  const isCertificate = location.state?.type === "certificate" || editData?.certId;

  const [formData, setFormData] = useState({
    name: "",
    role: "", 
    image: "",
    duration: "", 
    linkedin: "",
    certId: "", 
    status: "active" 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Logic: Image mandatory check
    if (!formData.image) {
      return alert("Bhai, image upload hone ka intezar karein ya dobara upload karein!");
    }
    
    if (isCertificate && !formData.certId) {
      return alert("Bhai, Certificate ID zaroori hai!");
    }

    setLoading(true);
    const targetCollection = isCertificate ? "certificates" : "interns";
    
    try {
      const payload = { 
        ...formData, 
        updatedAt: serverTimestamp(),
        // Extension support logic handled by Firebase storage via ImageUpload URL
      };

      if (editData) {
        await updateDoc(doc(db, targetCollection, editData.id), payload);
      } else {
        await addDoc(collection(db, targetCollection), { 
          ...payload, 
          createdAt: serverTimestamp() 
        });
      }
      navigate("/admin/interns");
    } catch (err) {
      console.error("Firebase Error:", err);
      alert("Kuch gadbad hui: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl text-left">
        <button 
          onClick={() => navigate(-1)} 
          className="text-zinc-500 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Management
        </button>

        <h2 className="text-5xl font-black uppercase text-white mb-12">
          {editData ? 'Edit' : 'Add'} <span className="text-[#00a63e]">{isCertificate ? 'Certificate' : 'Intern'}</span>
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* PHOTO UPLOAD SECTION */}
          <div className="md:col-span-2 space-y-4 bg-zinc-950 p-6 rounded-3xl border border-white/5">
            <label className="text-[10px] font-black uppercase text-zinc-500 flex items-center gap-2">
              <User size={14}/> {isCertificate ? 'Alumni Photo (Supports JPG, PNG, WEBP)' : 'Intern Photo (Supports JPG, PNG, WEBP)'}
            </label>
            
            {/* Note: Ensure your ImageUpload component doesn't restrict extensions */}
            <ImageUpload 
              onUploadSuccess={(url) => setFormData({...formData, image: url})} 
              folder={isCertificate ? "certificates" : "interns"} 
            />
            
            {formData.image && (
               <p className="text-[9px] text-[#00a63e] font-bold uppercase tracking-widest">
                 ✅ Image Ready for saving
               </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-500 ml-2">Full Name</label>
            <input 
              type="text" 
              value={formData.name} 
              required 
              placeholder="Rahul V." 
              className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-[#00a63e]" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-500 ml-2">Domain / Stack</label>
            <input 
              type="text" 
              value={formData.role} 
              required 
              placeholder="Frontend / UI/UX" 
              className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-[#00a63e]" 
              onChange={(e) => setFormData({...formData, role: e.target.value})} 
            />
          </div>

          {isCertificate ? (
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 ml-2">Certificate ID</label>
                <input 
                  type="text" 
                  value={formData.certId} 
                  required 
                  placeholder="CWX-26-01" 
                  className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-[#00a63e]" 
                  onChange={(e) => setFormData({...formData, certId: e.target.value})} 
                />
             </div>
          ) : (
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 ml-2">Duration</label>
                <input 
                  type="text" 
                  value={formData.duration} 
                  placeholder="Feb 2026 - Aug 2026" 
                  className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-[#00a63e]" 
                  onChange={(e) => setFormData({...formData, duration: e.target.value})} 
                />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-500 ml-2">LinkedIn URL</label>
            <input 
              type="url" 
              value={formData.linkedin} 
              placeholder="https://linkedin.com/..." 
              className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-[#00a63e]" 
              onChange={(e) => setFormData({...formData, linkedin: e.target.value})} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="md:col-span-1 py-6 bg-[#00a63e] text-white rounded-2xl font-black uppercase text-[11px] flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>{isCertificate ? 'Issue Certificate' : 'Save Intern'} <Send size={16} /></>}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default InternForm;