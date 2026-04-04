import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle, MapPin, Phone, User, Settings, ChevronDown } from "lucide-react";
// Firebase Imports
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const InquiryModal = ({ isOpen, onClose }) => {
  const brandColor = "#00a63e";
  const scriptURL = "https://script.google.com/macros/s/AKfycbwG81OCyNZlyKRRJPyfXZ-Q_Iv4GQRLG8xq9E4Cl1xmF_OPwK5SyfJ-qbYWyeHC/exec";

  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "", city: "", contact: "", service: ""
  });

  const services = [
    "Website Development", "App Development", "Digital Marketing", "AI Consultation", "ERP/CRM Solutions"
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.service) {
        alert("Please select a service");
        return;
    }
    setStatus("loading");

    try {
      // 1. SAVE TO FIREBASE (Admin Panel Data)
      await addDoc(collection(db, "inquiries"), {
        ...formData,
        status: "unread",
        timestamp: serverTimestamp(),
      });

      // 2. SEND TO GOOGLE SHEETS (Backup)
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setStatus("sent");
      setFormData({ name: "", city: "", contact: "", service: "" });
      setTimeout(() => { setStatus("idle"); onClose(); }, 2500);
    } catch (error) {
      console.error("Submission Error", error);
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start md:items-center justify-center p-4 pt-24 md:pt-6 overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl animate-in zoom-in duration-300 max-h-[85vh] flex flex-col overflow-hidden">
        <div className="p-6 pb-4 flex justify-between items-start bg-white border-b border-zinc-50 shrink-0">
          <div className="pr-8 text-left">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none">
                Capture <br/><span style={{color: brandColor}}>Opportunity</span>
            </h3>
            <p className="text-zinc-400 text-[9px] font-bold uppercase tracking-widest mt-1">Let's discuss your vision</p>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 pt-4 overflow-y-auto overflow-x-hidden flex-1 overscroll-contain">
          <form id="inquiry-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
              <input type="text" placeholder="Full Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-50 border border-zinc-100 p-3.5 pl-12 rounded-xl outline-none focus:border-[#00a63e] text-sm font-bold text-black" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
                <input type="text" placeholder="City" required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full bg-zinc-50 border border-zinc-100 p-3.5 pl-12 rounded-xl outline-none focus:border-[#00a63e] text-sm font-bold text-black" />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
                <input type="tel" placeholder="Contact No." required value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} className="w-full bg-zinc-50 border border-zinc-100 p-3.5 pl-12 rounded-xl outline-none focus:border-[#00a63e] text-sm font-bold text-black" />
              </div>
            </div>

            <div className="relative">
              <Settings className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
              <select required value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} className={`w-full bg-zinc-50 border border-zinc-100 p-3.5 pl-12 pr-10 rounded-xl outline-none focus:border-[#00a63e] text-sm font-bold appearance-none cursor-pointer ${formData.service === "" ? "text-zinc-400" : "text-black"}`}>
                <option value="" disabled>Select a Service</option>
                {services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
            </div>
          </form>
        </div>

        <div className="p-6 bg-zinc-50 border-t border-zinc-100 shrink-0">
          <button 
            form="inquiry-form"
            type="submit" disabled={status === "loading"}
            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-3
              ${status === "sent" ? "bg-[#00a63e] text-white" : "bg-black text-white hover:bg-[#00a63e] active:scale-95"}`}
          >
            {status === "loading" ? "Submitting..." : status === "sent" ? "Data Secured" : "Finish & Submit"}
            {status === "sent" ? <CheckCircle size={18} /> : <Send size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;