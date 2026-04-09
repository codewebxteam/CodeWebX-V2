import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle, MapPin, Phone, User, Settings, ChevronDown, Sparkles } from "lucide-react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const InquiryModal = ({ isOpen, onClose }) => {
  const brandColor = "#00a63e";
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({ name: "", city: "", contact: "", service: "" });

  const services = ["Website Development", "App Development", "Digital Marketing", "AI Consultation", "ERP/CRM Solutions"];

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.service) return alert("Select service");
    setStatus("loading");
    try {
      await addDoc(collection(db, "inquiries"), {
        ...formData,
        connected: false,
        status: "unread",
        timestamp: serverTimestamp(),
      });
      setStatus("sent");
      setFormData({ name: "", city: "", contact: "", service: "" });
      setTimeout(() => { setStatus("idle"); onClose(); }, 2000);
    } catch (error) {
      setStatus("idle");
      alert("Error!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in zoom-in duration-300 flex flex-col overflow-hidden border border-white/20">
        
        {/* Decorative Green Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#00a63e]"></div>

        {/* Header */}
        <div className="p-7 pb-4 flex justify-between items-start bg-white shrink-0">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-1">
                <Sparkles size={14} className="text-[#00a63e] fill-[#00a63e]" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Secure Entry</span>
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tighter leading-[0.9] text-black">
                Capture <br/><span className="text-zinc-300">Opportunity</span>
            </h3>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-zinc-300 hover:text-black hover:rotate-90 transition-all duration-300">
            <X size={28} />
          </button>
        </div>

        {/* Compact Form Body */}
        <div className="px-7 py-2">
          <form id="inquiry-form" onSubmit={handleSubmit} className="flex flex-col gap-3">
            
            {/* Full Name */}
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#00a63e] transition-colors" size={18} />
              <input 
                type="text" placeholder="Full Name" required 
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
                className="w-full bg-zinc-50 border border-zinc-100 p-4 pl-12 rounded-2xl outline-none focus:border-[#00a63e] focus:bg-white font-bold text-zinc-900 text-sm placeholder:text-zinc-400 transition-all shadow-inner" 
              />
            </div>

            {/* City */}
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#00a63e] transition-colors" size={18} />
              <input 
                type="text" placeholder="Your City" required 
                value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} 
                className="w-full bg-zinc-50 border border-zinc-100 p-4 pl-12 rounded-2xl outline-none focus:border-[#00a63e] focus:bg-white font-bold text-zinc-900 text-sm placeholder:text-zinc-400 transition-all shadow-inner" 
              />
            </div>

            {/* Contact */}
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#00a63e] transition-colors" size={18} />
              <input 
                type="tel" placeholder="Contact Number" required 
                value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} 
                className="w-full bg-zinc-50 border border-zinc-100 p-4 pl-12 rounded-2xl outline-none focus:border-[#00a63e] focus:bg-white font-bold text-zinc-900 text-sm placeholder:text-zinc-400 transition-all shadow-inner" 
              />
            </div>

            {/* Service Select */}
            <div className="relative group">
              <Settings className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#00a63e] transition-colors" size={18} />
              <select 
                required value={formData.service} 
                onChange={(e) => setFormData({...formData, service: e.target.value})} 
                className="w-full bg-zinc-50 border border-zinc-100 p-4 pl-12 pr-10 rounded-2xl outline-none focus:border-[#00a63e] focus:bg-white font-bold appearance-none text-zinc-900 text-sm transition-all shadow-inner"
              >
                <option value="" disabled>Select Service</option>
                {services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={18} />
            </div>
          </form>
        </div>

        {/* Premium Footer */}
        <div className="p-7 bg-white shrink-0">
          <button 
            form="inquiry-form" type="submit" disabled={status === "loading"} 
            className={`w-full py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[12px] transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl
              ${status === "sent" ? "bg-[#00a63e] text-white" : "bg-black text-white hover:bg-[#00a63e] hover:shadow-[#00a63e]/30"}`}
          >
            {status === "loading" ? "Validating..." : status === "sent" ? "Success" : "Initialize Project"}
            {status === "sent" ? <CheckCircle size={20} /> : <Send size={18} />}
          </button>
          <p className="text-center text-zinc-300 text-[8px] font-bold uppercase tracking-widest mt-4">
              © CodeWebX Intelligence Systems 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;