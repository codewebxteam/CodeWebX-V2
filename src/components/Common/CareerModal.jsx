import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle, Briefcase, GraduationCap, Link as LinkIcon, Phone, User, Mail, ChevronDown } from "lucide-react";
// Firebase Imports
import { db } from "../../firebase"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CareerModal = ({ isOpen, onClose }) => {
  const brandColor = "#00a63e";
  const scriptURL = "https://script.google.com/macros/s/AKfycbxCvahn6Qq222CcGH8POZcPZY_BOCndPk8nSn59DAeJjhmPdmpuX9sRKx8PTRDbtgwq/exec";

  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "", email: "", contact: "", college: "", degree: "", experience: "Fresher", role: "", resume: ""
  });

  const roles = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer", "Digital Marketer", "Sales Executive"];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // 1. SAVE TO FIREBASE (Admin Panel Data)
      await addDoc(collection(db, "applications"), {
        ...formData,
        status: "pending",
        appliedAt: serverTimestamp(),
      });

      // 2. SEND TO GOOGLE SHEETS (Backup)
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setStatus("sent");
      setFormData({ name: "", email: "", contact: "", college: "", degree: "", experience: "Fresher", role: "", resume: "" });
      setTimeout(() => { setStatus("idle"); onClose(); }, 2500);
    } catch (error) {
      console.error("Firebase/Sheet Error!", error);
      setStatus("idle");
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-start justify-center overflow-y-auto overflow-x-hidden pt-20 md:pt-32 pb-10">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl animate-in zoom-in duration-300 flex flex-col overflow-hidden mx-4 flex-shrink-0">
        <div className="p-6 pb-4 flex justify-between items-start bg-white border-b border-zinc-50 sticky top-0 z-20">
          <div className="pr-8 text-left">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none">
              Apply to <span style={{color: brandColor}}>CodeWebX</span>
            </h3>
            <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-1">Engineering Modern Legacies</p>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 pt-4 overflow-y-visible flex-1">
          <form onSubmit={handleSubmit} id="career-form" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
                <input type="text" placeholder="Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-50 border border-zinc-100 p-3.5 pl-12 rounded-xl outline-none focus:border-[#00a63e] text-sm font-bold text-black" />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
                <input type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-zinc-50 border border-zinc-100 p-3.5 pl-12 rounded-xl outline-none focus:border-[#00a63e] text-sm font-bold text-black" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
                <input type="tel" placeholder="Contact No." required value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} className="w-full bg-zinc-50 border border-zinc-100 p-3.5 pl-12 rounded-xl outline-none focus:border-[#00a63e] text-sm font-bold text-black" />
              </div>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
                <select value={formData.role} required onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-zinc-50 border border-zinc-100 p-3.5 pl-12 pr-10 rounded-xl outline-none focus:border-[#00a63e] text-sm font-bold text-black appearance-none">
                  <option value="" disabled>Select Role</option>
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="relative">
              <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
              <input type="text" placeholder="College / Current Company" required value={formData.college} onChange={(e) => setFormData({...formData, college: e.target.value})} className="w-full bg-zinc-50 border border-zinc-100 p-3.5 pl-12 rounded-xl outline-none focus:border-[#00a63e] text-sm font-bold text-black" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Degree (e.g. B.Tech)" value={formData.degree} onChange={(e) => setFormData({...formData, degree: e.target.value})} className="w-full bg-zinc-50 border border-zinc-100 p-3.5 rounded-xl outline-none focus:border-[#00a63e] text-sm font-bold text-black" />
              <div className="relative">
                <select value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="w-full bg-zinc-50 border border-zinc-100 p-3.5 pr-10 rounded-xl outline-none focus:border-[#00a63e] text-sm font-bold text-black appearance-none">
                  <option value="Fresher">Fresher</option>
                  <option value="1+ Year">1+ Year</option>
                  <option value="2+ Years">2+ Years</option>
                  <option value="5+ Years">5+ Years</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
              <input type="url" placeholder="Resume Link (Drive/LinkedIn)" required value={formData.resume} onChange={(e) => setFormData({...formData, resume: e.target.value})} className="w-full bg-zinc-50 border border-zinc-100 p-3.5 pl-12 rounded-xl outline-none focus:border-[#00a63e] text-sm font-bold text-black" />
            </div>
          </form>
        </div>

        <div className="p-6 bg-zinc-50 border-t border-zinc-100 sticky bottom-0 z-20">
          <button 
            form="career-form"
            type="submit" 
            disabled={status === "loading"} 
            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-3 
              ${status === "sent" ? "bg-[#00a63e] text-white" : "bg-black text-white hover:bg-[#00a63e] active:scale-95"}`}
          >
            {status === "loading" ? "Processing..." : status === "sent" ? "Submitted!" : "Send Application"}
            {status === "sent" ? <CheckCircle size={18} /> : <Send size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerModal;