import React from "react";
import { Globe, Users, ShieldCheck } from "lucide-react";

const ClientHero = () => {
  const brandColor = "#00a63e";

  return (
    <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center pt-20 bg-black overflow-hidden">
      
      {/* 1. Graphical Connectors (Abstract Lines) */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={brandColor} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path d="M-100,200 Q400,100 800,400 T1800,200" fill="none" stroke="url(#lineGrad)" strokeWidth="0.5" />
        <path d="M-100,500 Q600,300 1000,600 T2000,400" fill="none" stroke="url(#lineGrad)" strokeWidth="0.5" />
      </svg>

      {/* 2. Floating Graphical Nodes */}
      <div className="absolute top-1/4 left-10 md:left-32 animate-pulse hidden md:block">
        <div className="flex items-center gap-3 bg-zinc-900/80 border border-white/10 p-3 rounded-2xl backdrop-blur-xl">
          <Globe size={18} className="text-[#00a63e]" />
          <div className="flex flex-col">
            <span className="text-[8px] text-zinc-500 font-bold uppercase">Network</span>
            <span className="text-[10px] text-white font-black tracking-widest">GLOBAL</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1/4 right-10 md:right-32 animate-bounce-slow hidden md:block">
        <div className="flex items-center gap-3 bg-zinc-900/80 border border-white/10 p-3 rounded-2xl backdrop-blur-xl">
          <Users size={18} className="text-[#00a63e]" />
          <div className="flex flex-col">
            <span className="text-[8px] text-zinc-500 font-bold uppercase">Partners</span>
            <span className="text-[10px] text-white font-black tracking-widest">50+ SCALE</span>
          </div>
        </div>
      </div>

      {/* 3. Main Content Wrapper */}
      <div className="max-w-[1200px] mx-auto text-center relative z-10 px-6">
        
        {/* Compact Badge */}
        <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/50 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00a63e]"></div>
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">Client Ecosystem</span>
        </div>
        
        {/* Graphical Typography */}
        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
          Global <span className="relative">
            Trust.
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#00a63e]/30 blur-sm"></span>
          </span>
          <br /> 
          <span className="text-zinc-600 italic">Local Impact.</span>
        </h1>
        
        {/* Smart Graphic Divider */}
        <div className="flex justify-center items-center gap-4 my-8">
           <div className="h-[1px] w-12 bg-zinc-800"></div>
           <ShieldCheck size={20} className="text-zinc-700" />
           <div className="h-[1px] w-12 bg-zinc-800"></div>
        </div>

        <p className="text-zinc-500 text-sm md:text-lg max-w-xl mx-auto font-medium leading-relaxed">
          Connecting <span className="text-white">Gorakhpur's</span> ambition with world-class <span className="text-white">engineering</span>. We don't just work for you, we evolve with you.
        </p>

      </div>

      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00a63e]/5 blur-[100px] rounded-full -z-10"></div>
    </section>
  );
};

export default ClientHero;