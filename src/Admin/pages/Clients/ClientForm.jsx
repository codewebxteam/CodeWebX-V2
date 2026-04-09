import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import ImageUpload from "../../components/Shared/ImageUpload";
import { db } from "../../../firebase"; // Path depth check kar lena (../../../)
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Send, Loader2, User, Box, Link as LinkIcon } from "lucide-react";

const ClientForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.editData;

  const [formData, setFormData] = useState({
    clientName: "",
    projectTitle: "",
    experience: "",
    clientImage: "",
    projectImage: "",
    liveLink: "", // Naya field
    width: "w-[85vw] md:w-[65vw]" 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientImage || !formData.projectImage) {
      return alert("Please upload both Client and Project images.");
    }

    setLoading(true);
    try {
      const payload = { ...formData, updatedAt: serverTimestamp() };
      if (editData) {
        await updateDoc(doc(db, "testimonials", editData.id), payload);
      } else {
        await addDoc(collection(db, "testimonials"), { ...payload, createdAt: serverTimestamp() });
      }
      navigate("/admin/clients");
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <button onClick={() => navigate(-1)} className="text-zinc-500 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase mb-8">
          <ArrowLeft size={16} /> Back to Clients
        </button>

        <h2 className="text-5xl font-black uppercase text-white mb-12">
          Client <span className="text-[#00a63e]">Feedback</span>
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 bg-zinc-950 p-6 rounded-3xl border border-white/5">
            <label className="text-[10px] font-black uppercase text-zinc-500 flex items-center gap-2"><User size={14}/> Client Photo</label>
            <ImageUpload onUploadSuccess={(url) => setFormData({...formData, clientImage: url})} folder="clients" />
          </div>

          <div className="space-y-4 bg-zinc-950 p-6 rounded-3xl border border-white/5">
            <label className="text-[10px] font-black uppercase text-zinc-500 flex items-center gap-2"><Box size={14}/> Project Screenshot</label>
            <ImageUpload onUploadSuccess={(url) => setFormData({...formData, projectImage: url})} folder="client-projects" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-500 ml-2">Client Name & Company</label>
            <input type="text" value={formData.clientName} required placeholder="Founder, Mice Academy" className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-[#00a63e]" 
              onChange={(e) => setFormData({...formData, clientName: e.target.value})} />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-500 ml-2">Project Title</label>
            <input type="text" value={formData.projectTitle} required placeholder="LMS Development" className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-[#00a63e]" 
              onChange={(e) => setFormData({...formData, projectTitle: e.target.value})} />
          </div>

          {/* LIVE LINK INPUT */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-500 ml-2">Live Project Link (Optional)</label>
            <div className="relative">
                <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input type="url" value={formData.liveLink} placeholder="https://client-project.com" className="w-full bg-zinc-950 border border-white/5 p-5 pl-14 rounded-2xl text-white font-bold outline-none focus:border-[#00a63e]" 
                onChange={(e) => setFormData({...formData, liveLink: e.target.value})} />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-500 ml-2">Testimonial Experience</label>
            <textarea value={formData.experience} required className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl text-white font-bold h-32 resize-none outline-none focus:border-[#00a63e]" 
              onChange={(e) => setFormData({...formData, experience: e.target.value})}></textarea>
          </div>

          <button type="submit" disabled={loading} className="md:col-span-1 py-6 bg-[#00a63e] text-white rounded-2xl font-black uppercase text-[11px] flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all">
            {loading ? <Loader2 className="animate-spin" /> : <>Publish Feedback <Send size={16} /></>}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ClientForm;