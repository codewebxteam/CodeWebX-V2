import React, { useState, useEffect } from "react";
import { Search, ShieldCheck, Download, X, Info, Loader2, CheckCircle2 } from "lucide-react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const CertificateVerifier = ({ isStandalone = true }) => {
  useEffect(() => {
    if (isStandalone) {
      window.scrollTo(0, 0);
    }
  }, [isStandalone]);
  
  const [searchId, setSearchId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const q = query(collection(db, "interns"), where("certId", "==", searchId.trim()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("No verified credential found with this ID.");
      } else {
        setResult(querySnapshot.docs[0].data());
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while verifying the credential.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={isStandalone ? "relative min-h-screen bg-black w-full overflow-hidden" : "w-full"}>
      {/* 1. HERO SECTION (Blog-style) - Only show if standalone */}
      {isStandalone && (
        <section className="relative pt-28 md:pt-36 pb-12 px-6 md:px-16 bg-black overflow-hidden border-b border-white/5">
          
          {/* MINIMALIST SYSTEM GRAPHICS */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00a63e]/5 to-transparent h-20 w-full animate-scan-y pointer-events-none"></div>
            
            <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden xl:block opacity-20">
              <div className="flex flex-col items-end gap-2 font-mono text-[9px] text-[#00a63e] tracking-[0.4em] rotate-90">
                <span>AUTH_NODE_099X</span>
                <div className="w-32 h-[1px] bg-[#00a63e]"></div>
              </div>
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* CORE TITLE */}
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-3 mb-6 bg-white/[0.03] border border-white/10 px-3 py-1 rounded-sm">
                  <span className="w-1.5 h-1.5 bg-[#00a63e] animate-pulse"></span>
                  <span className="text-[8px] md:text-[10px] font-black tracking-[0.5em] uppercase text-zinc-500">
                    Credential / Verification / Registry
                  </span>
                </div>

                <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-none uppercase">
                  VERIFY <span className="text-[#00a63e]">ID</span> <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00a63e] to-[#00a63e]">
                    AUTHENTICITY
                  </span>
                </h1>
              </div>

              {/* TIGHT DATA INFO */}
              <div className="lg:col-span-4 flex flex-col lg:items-end justify-center">
                <div className="relative p-6 border-l-2 border-[#00a63e] bg-zinc-900/20 backdrop-blur-sm max-w-sm w-full">
                  <div className="flex items-center gap-2 mb-3">
                     <div className="h-[1px] w-4 bg-[#00a63e]"></div>
                     <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Global_Registry_v2.1</span>
                  </div>
                  <p className="text-zinc-400 text-xs md:text-sm font-medium leading-relaxed">
                    Securely validate <span className="text-white">credentials</span> and download official <span className="text-[#00a63e]">CodeWebX certifications.</span>
                  </p>
                  <div className="mt-4 w-full h-[1px] bg-zinc-800 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-[#00a63e] w-1/3 animate-progress-slide"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* DECORATIVE CORNER DATA */}
          <div className="absolute bottom-4 left-6 md:left-16 flex gap-6 opacity-30 pointer-events-none">
              <div className="flex flex-col gap-1">
                <span className="text-[7px] text-zinc-600 font-bold uppercase tracking-tighter">Status</span>
                <span className="text-[9px] text-[#00a63e] font-mono uppercase tracking-widest">System_Ready</span>
              </div>
              <div className="flex flex-col gap-1 border-l border-zinc-800 pl-6">
                <span className="text-[7px] text-zinc-600 font-bold uppercase tracking-tighter">Security</span>
                <span className="text-[9px] text-white font-mono uppercase tracking-widest">Encrypted_256</span>
              </div>
          </div>
        </section>
      )}

      {/* 2. SEARCH & RESULT SECTION (White Background) */}
      <section className={`px-6 md:px-16 bg-white relative ${isStandalone ? 'py-24 md:py-32 min-h-screen' : 'py-20'}`}>
        <div className="max-w-[1000px] mx-auto relative z-20">
          
          {/* Main Title above Search Box */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black">
              Enter Certificate <span className="text-[#00a63e]">ID</span>
            </h2>
            <p className="text-zinc-500 font-medium mt-4 max-w-lg mx-auto">
              Please enter the unique ID found on your CodeWebX certificate to verify its authenticity and access the digital copy.
            </p>
          </div>

          {/* Search Box - Big & Beautiful */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative mb-20">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#00a63e]/0 via-[#00a63e]/20 to-[#00a63e]/0 rounded-full blur-2xl opacity-50 hidden md:block"></div>
            
            {/* Desktop View (Input with inline button) */}
            <div className="relative hidden md:block">
              <input 
                type="text"
                placeholder="e.g., CWX-26-01"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full bg-white border-2 border-zinc-200 p-8 pl-10 pr-48 rounded-full outline-none focus:border-[#00a63e] transition-all font-mono text-2xl text-black placeholder:text-zinc-300 shadow-xl"
              />
              <button 
                type="submit"
                disabled={loading}
                className="absolute right-3 top-3 bottom-3 bg-black text-white px-10 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#00a63e] hover:text-white transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <><Search size={20} /> Verify</>}
              </button>
            </div>

            {/* Mobile View (Stacked layout) */}
            <div className="flex flex-col gap-4 md:hidden">
              <input 
                type="text"
                placeholder="e.g., CWX-26-01"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full bg-white border-2 border-zinc-200 p-5 rounded-2xl outline-none focus:border-[#00a63e] transition-all font-mono text-lg text-black placeholder:text-zinc-300 shadow-md text-center"
              />
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white p-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-[#00a63e] hover:text-white transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <><Search size={20} /> Verify Credential</>}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="max-w-3xl mx-auto bg-red-50 border-l-4 border-red-500 p-6 flex items-center gap-4 shadow-sm mb-16">
              <X className="text-red-500 shrink-0" size={28} />
              <p className="text-red-500 font-mono text-sm uppercase tracking-widest">{error}</p>
            </div>
          )}

          {/* Trust Badges - Shown when no result is present to fill the page beautifully */}
          {!result && !error && (
            <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-zinc-50 border border-zinc-100 p-8 rounded-3xl hover:border-[#00a63e]/30 transition-all group">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <ShieldCheck className="text-[#00a63e]" size={28} />
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight text-black mb-2">100% Authentic</h4>
                <p className="text-zinc-500 text-sm font-medium">Every certificate is digitally signed and securely stored in our official registry.</p>
              </div>

              <div className="bg-zinc-50 border border-zinc-100 p-8 rounded-3xl hover:border-[#00a63e]/30 transition-all group">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Info className="text-[#00a63e]" size={28} />
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight text-black mb-2">Global Access</h4>
                <p className="text-zinc-500 text-sm font-medium">Verify your credentials from anywhere in the world, at any time.</p>
              </div>

              <div className="bg-zinc-50 border border-zinc-100 p-8 rounded-3xl hover:border-[#00a63e]/30 transition-all group">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Download className="text-[#00a63e]" size={28} />
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight text-black mb-2">Instant Download</h4>
                <p className="text-zinc-500 text-sm font-medium">Access and download your high-resolution digital certificate instantly.</p>
              </div>
            </div>
          )}

          {/* Result Area */}
          {result && (
            <div className="max-w-4xl mx-auto bg-white border-2 border-zinc-100 rounded-none md:rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#00a63e]/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#00a63e]/10 transition-all duration-700"></div>
              
              {/* Internal decorative lines */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00a63e]/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black/5 to-transparent"></div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-10 relative z-10">
                
                {/* Profile Image */}
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden border-4 border-white shadow-xl flex-shrink-0 bg-zinc-100 relative">
                  <div className="absolute inset-0 bg-[#00a63e]/5 mix-blend-overlay"></div>
                  {result.image ? (
                    <img src={result.image} alt={result.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 font-mono text-[10px]">NO_IMAGE</div>
                  )}
                </div>

                {/* Details & Actions */}
                <div className="flex-1 w-full text-left">
                  <div className="inline-flex items-center gap-2 border border-[#00a63e]/20 bg-[#00a63e]/5 text-[#00a63e] px-4 py-1.5 mb-6">
                    <CheckCircle2 size={12} />
                    <span className="text-[8px] font-black uppercase tracking-[0.3em]">Verified Authenticity</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black mb-2 leading-none">{result.name}</h3>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full"></div>
                      <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.2em]">{result.role}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full"></div>
                      <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.2em]">{result.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#00a63e] rounded-full animate-pulse"></div>
                      <span className="text-[#00a63e] font-mono text-[9px] uppercase tracking-[0.2em]">ID: {result.certId}</span>
                    </div>
                  </div>

                  {result.certificateUrl ? (
                    <a 
                      href={result.certificateUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex bg-black text-white px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-[#00a63e] transition-all items-center justify-center gap-3 shadow-md"
                    >
                      <Download size={14} /> Access Original Certificate
                    </a>
                  ) : (
                    <div className="border border-zinc-200 bg-zinc-50 p-4 text-zinc-400 font-mono text-[10px] uppercase tracking-widest flex items-center gap-3">
                      <Info size={14} /> Certificate File Pending
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CertificateVerifier;