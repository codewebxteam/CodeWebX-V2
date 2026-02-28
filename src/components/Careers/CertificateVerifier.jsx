import React, { useState } from "react";
import { CheckCircle, Search, AlertCircle, ShieldCheck } from "lucide-react"; //

const CertificateVerifier = () => {
  const [certId, setCertId] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | verified | error

  const handleVerify = () => {
    if (!certId) return;
    setStatus("loading");
    
    // Logic: Abhi ke liye hum mock verification kar rahe hain
    setTimeout(() => {
      if (certId.toUpperCase().includes("CWX")) {
        setStatus("verified");
      } else {
        setStatus("error");
      }
    }, 1500);
  };

  return (
    <section className="py-24 px-6 md:px-16 bg-zinc-900/20 relative overflow-hidden">
      {/* Background decoration matching your theme */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/5 blur-[100px] rounded-full"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <ShieldCheck className="text-lime-500" size={24} />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
            Trust & Security
          </span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-light mb-8">
          Verify <span className="text-outline">Authenticity</span>
        </h2>

        <div className="relative max-w-2xl mx-auto">
          <input 
            type="text" 
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            placeholder="Enter Certificate ID (e.g. CWX-2026-101)" 
            className="w-full bg-black border border-zinc-800 p-6 md:p-8 rounded-full text-center outline-none focus:border-lime-500 transition-all text-white placeholder:text-zinc-700 font-medium"
          />
          
          <button 
            onClick={handleVerify}
            className="absolute right-3 top-3 bottom-3 px-8 bg-white text-black rounded-full hover:bg-lime-400 transition-all flex items-center gap-2 group"
          >
            <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest">
              {status === "loading" ? "Checking..." : "Verify"}
            </span>
            <Search size={18} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Status Messages */}
        <div className="mt-10 min-h-[60px]">
          {status === "verified" && (
            <div className="flex items-center justify-center gap-3 text-lime-400 animate-bounce">
              <CheckCircle size={20} />
              <p className="text-xs font-bold uppercase tracking-[0.2em]">Verified Professional Member</p>
            </div>
          )}
          
          {status === "error" && (
            <div className="flex items-center justify-center gap-3 text-red-500">
              <AlertCircle size={20} />
              <p className="text-xs font-bold uppercase tracking-[0.2em]">Invalid ID. Please check and try again.</p>
            </div>
          )}
        </div>

        <p className="mt-4 text-zinc-600 text-[9px] uppercase tracking-[0.3em] font-bold">
          Instantly verify the credentials of past interns from CodeWebX Technologies.
        </p>
      </div>
    </section>
  );
};

export default CertificateVerifier;