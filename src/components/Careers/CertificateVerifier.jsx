import React, { useState, useMemo, useRef } from "react";
import { Search, Award, ShieldCheck, ArrowUpRight, X, ChevronRight, Info } from "lucide-react";

const CertificateVerifier = () => {
  const scrollRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const brandColor = "#00a63e";
  const categories = ["All", "Frontend", "Backend", "Full Stack", "Sales", "UI/UX"];

  const interns = [
    { id: "CWX-26-01", name: "Rahul V.", stack: "Frontend", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop" },
    { id: "CWX-26-02", name: "Anjali G.", stack: "UI/UX", img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop" },
    { id: "CWX-26-03", name: "Sameer K.", stack: "Backend", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" },
    { id: "CWX-26-04", name: "Priya S.", stack: "Sales", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" },
    { id: "CWX-26-05", name: "Vikram R.", stack: "Full Stack", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop" },
    { id: "CWX-26-06", name: "Sanya M.", stack: "Frontend", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop" },
  ];

  const filteredInterns = useMemo(() => {
    return interns.filter((item) => {
      const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStack = activeFilter === "All" || item.stack === activeFilter;
      return matchesSearch && matchesStack;
    });
  }, [searchTerm, activeFilter]);

  return (
    <section className="py-24 px-6 md:px-16 bg-white overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div className="max-w-xl text-left">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="text-[#00a63e]" size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Credential Registry</span>
            </div>
            <h2 className="text-4xl md:text-8xl font-black text-black tracking-tighter uppercase leading-[0.8]">
              Verify <br /> <span className="text-zinc-200">Authenticity.</span>
            </h2>
          </div>

          {/* Search Box - Fixed Text Color to Black */}
          <div className="w-full md:w-96 flex flex-col gap-3">
             <div className="relative">
                <input 
                    type="text"
                    placeholder="e.g. CWX-26-01"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 p-5 rounded-2xl outline-none focus:border-[#00a63e] transition-all font-bold text-sm text-black placeholder:text-zinc-400"
                />
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-300" size={20} />
             </div>
             <p className="flex items-center gap-2 text-[9px] font-bold text-zinc-400 uppercase tracking-widest pl-2 text-left">
                <Info size={12} className="text-[#00a63e]" /> Search by Certificate ID to highlight specific records
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

        {/* Horizontal Slider */}
        <div className="relative group/container">
          {filteredInterns.length > 0 ? (
            <div 
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-10 cursor-grab active:cursor-grabbing"
            >
              {filteredInterns.map((intern) => (
                <div key={intern.id} className="flex-shrink-0 w-[85vw] md:w-[600px] group flex flex-col gap-6 snap-center">
                  
                  {/* Certificate Frame */}
                  <div className="relative aspect-[1.4/1] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-zinc-100 border border-zinc-100 shadow-sm">
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5 z-0">
                        <span className="text-[8rem] font-black text-black opacity-[0.03] uppercase select-none">CERTIFICATE</span>
                    </div>

                    <img 
                      src={intern.img} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 relative z-10"
                      alt={intern.name} 
                    />
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center z-20">
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4 transform scale-50 group-hover:scale-100 transition-all duration-500">
                          <ArrowUpRight size={32} className="text-black" />
                        </div>
                        <span className="text-white text-[10px] font-black uppercase tracking-[0.5em]">View Full Credential</span>
                    </div>

                    <div className="absolute top-8 left-8 bg-black text-white px-5 py-2 rounded-full border border-white/20 z-30 shadow-2xl">
                        <span className="text-[10px] font-black tracking-widest uppercase">{intern.id}</span>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="px-6 flex justify-between items-center">
                    <div className="text-left">
                      <h4 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tighter">{intern.name}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="w-3 h-3 rounded-full bg-[#00a63e] shadow-[0_0_10px_#00a63e]"></div>
                        <p className="text-zinc-400 text-xs font-black uppercase tracking-widest">{intern.stack}</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-200 group-hover:text-[#00a63e] group-hover:border-[#00a63e]/20 transition-all">
                       <Award size={24} />
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex-shrink-0 w-[10vw]"></div>
            </div>
          ) : (
            <div className="py-20 text-center flex flex-col items-center gap-4 bg-zinc-50 rounded-[3rem] border-2 border-dashed border-zinc-200">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                <X className="text-red-400" size={24} />
              </div>
              <div>
                <p className="text-black font-black uppercase text-sm tracking-widest">No Record Found</p>
                <p className="text-zinc-400 text-[10px] mt-1 uppercase font-bold tracking-widest">Check the ID and try again</p>
              </div>
              <button onClick={() => {setSearchTerm(""); setActiveFilter("All")}} className="mt-4 px-6 py-3 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#00a63e] transition-all">Reset All Records</button>
            </div>
          )}

          {/* Desktop Hints */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none px-4 opacity-0 group-hover/container:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center border border-zinc-100"><ChevronRight size={20} className="rotate-180 text-zinc-400" /></div>
              <div className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center border border-zinc-100"><ChevronRight size={20} className="text-zinc-400" /></div>
          </div>
        </div>

        {/* Global Interaction Hint */}
        <div className="mt-12 flex items-center gap-4 justify-center text-zinc-300">
           <div className="h-[1px] w-12 bg-zinc-100"></div>
           <span className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse italic">Hold and Drag to Explore Registry</span>
           <div className="h-[1px] w-12 bg-zinc-100"></div>
        </div>
      </div>
    </section>
  );
};

export default CertificateVerifier;