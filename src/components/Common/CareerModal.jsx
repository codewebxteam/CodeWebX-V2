import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle, Briefcase, GraduationCap, Phone, User, Mail, ChevronDown, UploadCloud, FileText, Loader2 } from "lucide-react";
// Firebase Imports
import { db } from "../../firebase"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CareerModal = ({ isOpen, onClose }) => {
  const brandColor = "#00a63e";
  const scriptURL = "https://script.google.com/macros/s/AKfycbxCvahn6Qq222CcGH8POZcPZY_BOCndPk8nSn59DAeJjhmPdmpuX9sRKx8PTRDbtgwq/exec";

  const [status, setStatus] = useState("idle"); // idle, loading, sent
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFileName, setUploadFileName] = useState("");
  
  const [formData, setFormData] = useState({
    name: "", email: "", contact: "", college: "", degree: "", experience: "Fresher", role: "", resume: ""
  });

  const roles = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer", "Digital Marketer", "Sales Executive"];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset state when closed
      if (status === "sent") {
        setStatus("idle");
        setFormData({ name: "", email: "", contact: "", college: "", degree: "", experience: "Fresher", role: "", resume: "" });
        setUploadFileName("");
      }
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen, status]);

  if (!isOpen) return null;

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB.");
      return;
    }

    setUploadFileName(file.name);
    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("fileName", file.name);
    uploadData.append("folder", "/codewebx/resumes");

    try {
      const authHeader = `Basic ${btoa(import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY + ":")}`;
      const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        headers: { "Authorization": authHeader },
        body: uploadData,
      });
      const data = await res.json();
      
      if (data.url) {
        setFormData({ ...formData, resume: data.url });
      } else {
        throw new Error("Upload Failed");
      }
    } catch (error) {
      console.error("Resume Upload Error:", error);
      alert("Resume Upload Failed! Check your internet.");
      setUploadFileName("");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.resume) {
      alert("Please upload your resume (PDF) before submitting.");
      return;
    }
    
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
      setTimeout(() => { 
        onClose(); 
      }, 3500); // Wait 3.5 seconds before auto-closing so they see the success message
    } catch (error) {
      console.error("Firebase/Sheet Error!", error);
      setStatus("idle");
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-start justify-center overflow-y-auto overflow-x-hidden pt-20 md:pt-32 pb-10">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl animate-in zoom-in duration-300 flex flex-col mx-4 flex-shrink-0 min-h-[400px]">
        
        {/* Header - Only visible when not sent */}
        {status !== "sent" && (
          <div className="p-6 pb-4 flex justify-between items-start bg-white border-b border-zinc-50 rounded-t-[2.5rem]">
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
        )}

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-center">
          {status === "sent" ? (
            // SUCCESS UI
            <div className="p-10 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 h-full">
              <div className="w-20 h-20 bg-[#00a63e]/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={40} className="text-[#00a63e]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 text-black">Application Received</h3>
              <p className="text-zinc-500 font-medium text-sm max-w-sm mb-8">
                Form submitted successfully. Our team will review your application and get back to you shortly.
              </p>
              <button 
                onClick={onClose} 
                className="bg-black text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#00a63e] transition-all"
              >
                Close Window
              </button>
            </div>
          ) : (
            // FORM UI
            <div className="p-6 pt-4 flex-1">
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

                {/* RESUME UPLOAD FIELD */}
                <div className="relative mt-2">
                  <label className={`flex items-center justify-between w-full p-3.5 rounded-xl border border-dashed transition-all cursor-pointer
                    ${formData.resume ? "bg-[#00a63e]/5 border-[#00a63e]/30" : "bg-zinc-50 border-zinc-300 hover:bg-zinc-100"}
                  `}>
                    <div className="flex items-center gap-3 overflow-hidden">
                      {isUploading ? (
                        <Loader2 size={20} className="text-[#00a63e] animate-spin shrink-0" />
                      ) : formData.resume ? (
                        <FileText size={20} className="text-[#00a63e] shrink-0" />
                      ) : (
                        <UploadCloud size={20} className="text-zinc-400 shrink-0" />
                      )}
                      
                      <div className="flex flex-col truncate">
                        <span className={`text-sm font-bold truncate ${formData.resume ? "text-black" : "text-zinc-500"}`}>
                          {isUploading ? "Uploading Resume..." : formData.resume ? uploadFileName : "Upload Resume (PDF only)"}
                        </span>
                        {!formData.resume && !isUploading && (
                          <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Max size: 5MB</span>
                        )}
                      </div>
                    </div>
                    
                    {formData.resume && !isUploading && (
                      <div className="shrink-0 ml-2">
                        <CheckCircle size={18} className="text-[#00a63e]" />
                      </div>
                    )}
                    
                    <input 
                      type="file" 
                      accept="application/pdf" 
                      className="hidden" 
                      onChange={handleFileUpload} 
                      disabled={isUploading}
                    />
                  </label>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Footer - Only visible when not sent */}
        {status !== "sent" && (
          <div className="p-6 bg-zinc-50 border-t border-zinc-100 rounded-b-[2.5rem]">
            <button 
              form="career-form"
              type="submit" 
              disabled={status === "loading" || isUploading} 
              className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-3 
                ${isUploading ? "bg-zinc-300 text-zinc-500 cursor-not-allowed" : "bg-black text-white hover:bg-[#00a63e] active:scale-95"}`}
            >
              {status === "loading" ? "Processing..." : isUploading ? "Wait for upload..." : "Send Application"}
              {!isUploading && status !== "loading" && <Send size={16} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerModal;