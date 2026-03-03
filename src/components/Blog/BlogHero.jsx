import React from "react";

const BlogHero = () => {
  const brandColor = "#00a63e"; // CodeWebX Green

  return (
    // Fixed padding: pt-20 for mobile and pt-32 for desktop to align with navbar
    <section className="relative pt-20 md:pt-32 pb-24 px-6 md:px-16 bg-black overflow-hidden">
      
      {/* 1. ADVANCED GRAPHICAL BACKDROP */}
      <div className="absolute inset-0 z-0">
        {/* Deep Texture: Grainy Gradient */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        
        {/* Large Kinetic Shape: Rotating Square Border */}
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] border border-[#00a63e]/10 rounded-[100px] rotate-12 animate-spin-slow pointer-events-none"></div>

        {/* Major Light Source: Neon Glow */}
        <div 
          className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] blur-[180px] rounded-full opacity-30 animate-pulse"
          style={{ backgroundColor: brandColor }}
        ></div>

        {/* Floating Measurement Grid (Architecture Feel) */}
        <div className="absolute bottom-10 left-16 hidden lg:block opacity-20">
          <div className="flex items-end gap-2 font-mono text-[8px] text-[#00a63e] uppercase tracking-[0.5em]">
            <div className="h-20 w-[1px] bg-gradient-to-t from-[#00a63e] to-transparent"></div>
            <span className="rotate-90 origin-bottom-left pb-1">Scale_Reference_v2.0</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12">
          
          {/* 2. OVERLAPPING TYPOGRAPHY */}
          <div className="relative">
            {/* Minimalist Tech Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-[#00a63e]/30 bg-[#00a63e]/5 mb-10">
              <div className="w-1.5 h-1.5 bg-[#00a63e] rounded-full animate-ping"></div>
              <span className="text-[9px] font-black tracking-[0.6em] uppercase text-white/60">
                Core Systems / Open Source
              </span>
            </div>

            <h1 className="text-7xl md:text-[13rem] font-black tracking-tighter text-white leading-[0.75] uppercase relative">
              JOURNAL <br />
              <div className="flex items-baseline">
                 <span className="text-zinc-900 text-outline-thin">OF</span>
                 <span className="ml-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00a63e] to-[#00a63e]">LABS</span>
              </div>
              
              {/* Graphical Tag floating on Text */}
              <div className="absolute -bottom-6 left-1/2 md:left-full md:-translate-x-full bg-white text-black px-4 py-1 text-[10px] font-black rotate-[-2deg] shadow-[10px_10px_0px_#00a63e]">
                EST. 2026
              </div>
            </h1>
          </div>

          {/* 3. FLOATING DATA CARD (Instead of just text) */}
          <div className="w-full lg:w-80 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00a63e] to-zinc-800 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-zinc-900/80 border border-white/10 p-8 rounded-2xl backdrop-blur-xl">
               <div className="flex justify-between items-start mb-6">
                  <div className="w-8 h-[2px] bg-[#00a63e]"></div>
                  <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">Description_v1</span>
               </div>
               <p className="text-zinc-300 text-sm md:text-base font-medium leading-snug">
                 Where complex <span className="text-[#00a63e]">algorithms</span> meet <span className="text-white italic">brutal</span> minimalism. Exploring the architecture of tomorrow.
               </p>
               
               {/* Tiny Chart Graphic */}
               <div className="mt-8 flex items-end gap-1 h-8">
                  <div className="w-1 bg-zinc-800 h-[20%]"></div>
                  <div className="w-1 bg-[#00a63e] h-[60%]"></div>
                  <div className="w-1 bg-zinc-800 h-[40%]"></div>
                  <div className="w-1 bg-white h-[90%]"></div>
                  <div className="w-1 bg-zinc-800 h-[30%]"></div>
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. SCANNER LINE ANIMATION (Bottom Decoration) */}
      <div className="absolute bottom-0 left-0 w-full h-24 overflow-hidden pointer-events-none opacity-20">
         <div className="w-full h-[1px] bg-[#00a63e] animate-scan-y shadow-[0_0_20px_#00a63e]"></div>
      </div>
    </section>
  );
};

export default BlogHero;