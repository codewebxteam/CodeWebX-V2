import React, { useState, useEffect, useMemo, useRef } from "react";
import { Search, Award, ShieldCheck, ExternalLink, X, ChevronRight, Info, Loader2 } from "lucide-react";
import { db } from "../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const CertificateVerifier = () => {
  const scrollRef = useRef(null);
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Frontend", "Backend", "Full Stack", "Sales", "UI/UX", "Marketing"];

  useEffect(() => {
    const q = query(collection(db, "certificates"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setInterns(snapshot.docs.map(doc => ({ id_db: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredInterns = useMemo(() => {
    return interns.filter((item) => {
      const matchesSearch = item.certId?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStack = activeFilter === "All" || item.role?.toLowerCase().includes(activeFilter.toLowerCase());
      return matchesSearch && matchesStack;
    });
  }, [searchTerm, activeFilter, interns]);

  return (
    <section className="py-24 px-6 md:px-16 bg-white overflow-hidden text-left">
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="text-[#00a63e]" size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Credential Registry</span>
            </div>
            <h2 className="text-4xl md:text-8xl font-black text-black tracking-tighter uppercase leading-[0.8]">
              Verify <br /> <span className="text-zinc-200">Authenticity.</span>
            </h2>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-96 flex flex-col gap-3">
             <div className="relative">
                <input 
                    type="text"
                    placeholder="Search by ID or Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 p-5 rounded-2xl outline-none focus:border-[#00a63e] transition-all font-bold text-sm text-black placeholder:text-zinc-400"
                />
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-300" size={20} />
             </div>
             <p className="flex items-center gap-2 text-[9px] font-bold text-zinc-400 uppercase tracking-widest pl-2">
                <Info size={12} className="text-[#00a63e]" /> Verified records are encrypted and permanent
             </p>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex overflow-x-auto no-scrollbar gap-3 mb-12 pb-4 border-b border-zinc-50">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`flex-shrink-0 px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all
                ${activeFilter === cat ? "bg-[#00a63e] text-white shadow-lg" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Display */}
        {loading ? (
          <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-[#00a63e]" size={40} /></div>
        ) : (
          <div className="relative group/container">
            {filteredInterns.length > 0 ? (
              <div 
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-10 cursor-grab active:cursor-grabbing"
              >
                {filteredInterns.map((intern) => (
                  <div key={intern.id_db} className="flex-shrink-0 w-[90vw] md:w-[750px] group flex flex-col gap-6 snap-center">
                    
                    {/* --- FULL FRAME LANDSCAPE CERTIFICATE --- */}
                    <div className="relative aspect-[1.6/1] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-zinc-50 border border-zinc-200 shadow-xl transition-all duration-500 group-hover:border-[#00a63e]/40">
                      
                      {/* Certificate Image - Covering full card */}
                      <img 
                        src={intern.image} 
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 relative z-10"
                        alt={intern.name} 
                      />

                      {/* Floating ID Tag */}
                      <div className="absolute top-6 right-6 bg-black/90 backdrop-blur-md text-white px-5 py-2 rounded-full z-30 shadow-2xl border border-white/10">
                          <span className="text-[10px] font-black tracking-[0.2em] uppercase">{intern.certId}</span>
                      </div>

                      {/* Subtle hover indicator (no blur) */}
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all z-20" />
                    </div>

                    {/* Details & Actions Section */}
                    <div className="px-4 flex justify-between items-center">
                      <div className="text-left">
                        <h4 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tighter leading-none">{intern.name}</h4>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="w-3 h-3 rounded-full bg-[#00a63e] shadow-[0_0_12px_#00a63e]"></div>
                          <p className="text-zinc-400 text-xs font-black uppercase tracking-[0.2em]">{intern.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <a 
                          href={intern.image} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-14 h-14 rounded-2xl bg-zinc-900 text-white flex items-center justify-center hover:bg-[#00a63e] transition-all shadow-lg group/btn"
                          title="View High Resolution"
                        >
                           <ExternalLink size={22} className="group-hover/btn:scale-110 transition-transform" />
                        </a>
                        <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-[#00a63e]">
                           <Award size={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex-shrink-0 w-[10vw]"></div>
              </div>
            ) : (
              <div className="py-20 text-center flex flex-col items-center gap-4 bg-zinc-50 rounded-[3rem] border-2 border-dashed border-zinc-200">
                <X className="text-red-400" size={48} />
                <p className="text-black font-black uppercase text-sm tracking-widest">No Record Found</p>
                <button onClick={() => {setSearchTerm(""); setActiveFilter("All")}} className="px-6 py-3 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#00a63e] transition-all">Reset All Records</button>
              </div>
            )}
          </div>
        )}

        {/* Footer Hint */}
        <div className="mt-12 flex items-center gap-4 justify-center text-zinc-300">
           <div className="h-[1px] w-12 bg-zinc-100"></div>
           <span className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse italic">Swipe to verify credentials</span>
           <div className="h-[1px] w-12 bg-zinc-100"></div>
        </div>
      </div>
    </section>
  );
};

export default CertificateVerifier;