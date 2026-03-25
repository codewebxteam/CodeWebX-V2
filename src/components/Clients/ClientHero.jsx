import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Globe, Activity, Cpu, Zap, Radio } from "lucide-react";

const ClientHero = () => {
  const brandColor = "#00a63e";

  return (
    // FIX: Added pt-32 (Mobile) and md:pt-40 (Desktop) for Navbar safety. 
    // Reduced overall py (padding-vertical) to keep height tight.
    <section className="relative w-full pt-32 md:pt-40 pb-12 md:pb-20 bg-black overflow-hidden border-b border-zinc-900 flex items-center">
      
      {/* --- LAYER 1: GRID & LIGHT BEAM --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `linear-gradient(${brandColor} 1px, transparent 1px), linear-gradient(90deg, ${brandColor} 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* --- LEFT: REFINED CONTENT (No Massive Text) --- */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/30 mb-6"
            >
              <Radio size={10} className="text-[#00a63e] animate-pulse" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-500">Network Status: Online</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[1.1] mb-6">
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-[#00a63e]">
                Global Dominance.
              </span>
            </h1>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                <p className="text-zinc-500 text-xs md:text-sm max-w-sm font-medium leading-relaxed border-l-2 border-[#00a63e] pl-5">
                    Connecting Gorakhpur’s ambition with high-performance <span className="text-white italic">engineering horsepower.</span>
                </p>
                
                {/* Compact Client Stack */}
                <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-900 overflow-hidden shadow-xl">
                            <img src={`https://i.pravatar.cc/100?img=${i+15}`} alt="client" className="w-full h-full object-cover grayscale" />
                        </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-black bg-[#00a63e] flex items-center justify-center text-[8px] font-black text-white">
                        50+
                    </div>
                </div>
            </div>
          </div>

          {/* --- RIGHT: TACTICAL METRICS (Tight & Clean) --- */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {/* Node: Security */}
            <div className="flex items-center gap-4 p-4 bg-zinc-900/20 border border-white/5 rounded-2xl backdrop-blur-md transition-all hover:border-[#00a63e]/30">
              <div className="p-2.5 bg-black/40 rounded-xl border border-white/5">
                <ShieldCheck size={18} className="text-[#00a63e]" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Protocol</span>
                 <span className="text-xs font-bold text-white uppercase tracking-tight">Enterprise Security</span>
              </div>
            </div>

            {/* Node: Speed */}
            <div className="flex items-center gap-4 p-4 bg-zinc-900/20 border border-white/5 rounded-2xl backdrop-blur-md transition-all hover:border-[#00a63e]/30 md:ml-8">
              <div className="p-2.5 bg-black/40 rounded-xl border border-white/5">
                <Zap size={18} className="text-[#00a63e]" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Velocity</span>
                 <span className="text-xs font-bold text-white uppercase tracking-tight">Zero Lag Performance</span>
              </div>
            </div>

            {/* Node: Global */}
            <div className="flex items-center gap-4 p-4 bg-zinc-900/20 border border-white/5 rounded-2xl backdrop-blur-md transition-all hover:border-[#00a63e]/30">
              <div className="p-2.5 bg-black/40 rounded-xl border border-white/5">
                <Globe size={18} className="text-[#00a63e]" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Network</span>
                 <span className="text-xs font-bold text-white uppercase tracking-tight">Worldwide Scalability</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Subtle Glow - Positioned strictly to avoid vertical bloat */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00a63e]/5 blur-[100px] rounded-full pointer-events-none"></div>
    </section>
  );
};

export default ClientHero;