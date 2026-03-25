import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Zap, ShieldCheck, Cpu, Terminal } from "lucide-react";

const CareerHero = () => {
  const brandColor = "#00a63e";

  return (
    // FIX: pt-32 for mobile and pt-48 for desktop to ensure navbar clearance
    <section className="relative pt-32 md:pt-48 pb-12 md:pb-24 bg-black overflow-hidden border-b border-zinc-900 min-h-[65vh] md:min-h-[75vh] flex items-center">
      
      {/* 1. TECHNICAL BACKDROP */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `linear-gradient(${brandColor} 1px, transparent 1px), linear-gradient(90deg, ${brandColor} 1px, transparent 1px)`, backgroundSize: '45px 45px' }}>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#00a63e]/10 to-transparent blur-[120px] pointer-events-none"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* 2. LEFT CONTENT: Mobile Optimized Spacing */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6 bg-zinc-900/50 border border-white/5 px-4 py-1.5 rounded-full"
            >
              <Terminal size={12} className="text-[#00a63e]" />
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-zinc-400">
                System_Status: Hiring_Active
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-light tracking-tighter text-white leading-none uppercase mb-8">
              Work Hard. <br />
              <span className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00a63e] to-[#00a63e]">
                Ship Fast.
              </span>
            </h1>

            <div className="flex flex-col md:flex-row items-center gap-8 border-l-0 lg:border-l-2 border-[#00a63e]/30 lg:pl-10">
              <p className="text-zinc-500 text-xs md:text-lg font-medium max-w-sm leading-relaxed">
                Join a high-performance engine where your code builds 
                <span className="text-white italic"> market-leading legacies</span>.
              </p>
              
              <button 
                onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative flex items-center gap-4 bg-white text-black px-10 py-5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#00a63e] hover:text-white transition-all duration-500 shadow-xl active:scale-95"
              >
                View Roles
                <ArrowDown size={14} className="animate-bounce" />
              </button>
            </div>
          </div>

          {/* 3. RIGHT CONTENT: Visible only on Desktop to save vertical space on mobile */}
          <div className="lg:col-span-5 hidden lg:flex flex-col gap-8 items-end">
            <div className="flex items-center gap-5 p-5 bg-zinc-950 border border-white/5 rounded-2xl w-full max-w-xs transition-colors hover:border-[#00a63e]/30">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center border border-white/5">
                <Cpu size={18} className="text-[#00a63e]" />
              </div>
              <div className="text-left">
                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Environment</span>
                <p className="text-xs font-bold text-white uppercase">Bleeding-Edge Stack</p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-5 bg-zinc-950 border border-white/5 rounded-2xl w-full max-w-xs transition-colors hover:border-[#00a63e]/30 mr-12">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center border border-white/5">
                <Zap size={18} className="text-[#00a63e]" />
              </div>
              <div className="text-left">
                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Culture</span>
                <p className="text-xs font-bold text-white uppercase">Fast-Cycle Shipping</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. SCANNER LINE */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00a63e]/20 to-transparent"></div>
      </div>
    </section>
  );
};

export default CareerHero;