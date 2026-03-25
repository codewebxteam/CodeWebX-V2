import React from "react";
import { motion } from "framer-motion";

const BlogHero = () => {
  const brandColor = "#00a63e"; // CodeWebX Green

  return (
    // Reduced height: pb-12 and flex-col for better mobile stack
    <section className="relative pt-20 md:pt-28 pb-12 px-6 md:px-16 bg-black overflow-hidden border-b border-white/5">
      
      {/* 1. MINIMALIST SYSTEM GRAPHICS */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        
        {/* Dynamic Scanline - Tightened range */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00a63e]/5 to-transparent h-20 w-full animate-scan-y pointer-events-none"></div>

        {/* Technical Coordinate Node */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden xl:block opacity-20">
          <div className="flex flex-col items-end gap-2 font-mono text-[9px] text-[#00a63e] tracking-[0.4em] rotate-90">
            <span>INDEX_REF_0392</span>
            <div className="w-32 h-[1px] bg-[#00a63e]"></div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* 2. CORE TITLE - Scaled for tighter height */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-3 mb-6 bg-white/[0.03] border border-white/10 px-3 py-1 rounded-sm">
              <span className="w-1.5 h-1.5 bg-[#00a63e] animate-pulse"></span>
              <span className="text-[8px] md:text-[10px] font-black tracking-[0.5em] uppercase text-zinc-500">
                Insights / Research / 026
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-none uppercase">
              THE <span className="text-zinc-900 text-outline-thin">LAB</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00a63e] to-[#00a63e]">
                JOURNAL
              </span>
            </h1>
          </div>

          {/* 3. TIGHT DATA INFO (Right Aligned) */}
          <div className="lg:col-span-4 flex flex-col lg:items-end justify-center">
            <div className="relative p-6 border-l-2 border-[#00a63e] bg-zinc-900/20 backdrop-blur-sm max-w-sm">
              <div className="flex items-center gap-2 mb-3">
                 <div className="h-[1px] w-4 bg-[#00a63e]"></div>
                 <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Tech_Stream_v1.0</span>
              </div>
              <p className="text-zinc-400 text-xs md:text-sm font-medium leading-relaxed">
                Exploring the <span className="text-white">architecture</span> of performance engineering and the future of <span className="text-[#00a63e]">bespoke software.</span>
              </p>
              
              {/* Animated Progress Bar Decor */}
              <div className="mt-4 w-full h-[1px] bg-zinc-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-[#00a63e] w-1/3 animate-progress-slide"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. DECORATIVE CORNER DATA */}
      <div className="absolute bottom-4 left-6 md:left-16 flex gap-6 opacity-30 pointer-events-none">
          <div className="flex flex-col gap-1">
            <span className="text-[7px] text-zinc-600 font-bold uppercase tracking-tighter">Status</span>
            <span className="text-[9px] text-white font-mono uppercase tracking-widest">Sync_Active</span>
          </div>
          <div className="flex flex-col gap-1 border-l border-zinc-800 pl-6">
            <span className="text-[7px] text-zinc-600 font-bold uppercase tracking-tighter">Lat</span>
            <span className="text-[9px] text-white font-mono uppercase tracking-widest">26.7606° N</span>
          </div>
      </div>
    </section>
  );
};

export default BlogHero;