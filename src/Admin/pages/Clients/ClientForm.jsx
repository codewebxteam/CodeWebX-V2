import React, { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import ImageUpload from "../../components/Shared/ImageUpload";
import { db } from "../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Loader2 } from "lucide-react";

const ClientForm = () => {
  const [formData, setFormData] = useState({ name: "", logo: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.logo) return alert("Security Check: Client identity (logo) is missing.");

    setLoading(true);
    try {
      await addDoc(collection(db, "clients"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      navigate("/admin/clients");
    } catch (err) {
      alert("Encryption Failed: Could not onboard client.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-xl space-y-10">
        <button onClick={() => navigate(-1)} className="text-zinc-600 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors">
          <ArrowLeft size={16} /> Back to Hub
        </button>

        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Client <span className="text-[#00a63e]">Onboarding</span></h2>
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mt-2 italic">Registering new entity into network</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-950 border border-white/5 p-10 rounded-[2.5rem]">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Brand Identity (PNG/SVG preferred)</label>
            <ImageUpload onUploadSuccess={(url) => setFormData({...formData, logo: url})} folder="clients" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Entity Name</label>
            <input 
              type="text" 
              placeholder="e.g. Google India" 
              required 
              className="w-full bg-black border border-white/5 p-5 rounded-2xl outline-none focus:border-[#00a63e] text-white font-bold placeholder:text-zinc-800 transition-all" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-3 transition-all
              ${loading ? "bg-zinc-800 text-zinc-500" : "bg-[#00a63e] text-white hover:bg-white hover:text-black shadow-xl shadow-[#00a63e]/10"}`}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <>Finalize Onboarding <Zap size={16} /></>}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ClientForm;