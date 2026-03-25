import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, ShieldCheck, ArrowRight, Zap } from "lucide-react";
import InquiryModal from "../Common/InquiryModal";

const StoryCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mouse tilt effect logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="px-6 py-12 md:py-20 bg-black overflow-hidden flex justify-center items-center">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full max-w-6xl group"
      >
        {/* --- DYNAMIC GLOW (Refined) --- */}
        <motion.div 
          className="absolute -inset-10 bg-[#00a63e]/15 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ x: mouseXSpring, y: mouseYSpring }}
        />

        {/* --- MAIN CONTAINER: Reduced Padding & Height --- */}
        <div className="relative z-10 bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-16 overflow-hidden">
          
          {/* --- TOP LEFT: BADGE --- */}
          <div className="absolute top-8 left-8 flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00a63e] animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 text-outline-thin">Innovation Lab</span>
          </div>

          <div className="flex flex-col items-center text-center max-w-4xl mx-auto" style={{ transform: "translateZ(50px)" }}>
            
            {/* --- ANIMATED ICON: Scaled Down --- */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="mb-6 p-4 bg-zinc-800/50 rounded-2xl border border-white/5 shadow-xl"
            >
              <Zap size={32} className="text-[#00a63e]" />
            </motion.div>

            {/* --- TYPOGRAPHY: Adjusted Leading & Size --- */}
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] uppercase mb-8">
              Scale <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-[#00a63e]">
                Fast.
              </span>
            </h2>

            <p className="text-zinc-400 text-sm md:text-lg font-medium max-w-xl mb-10 leading-relaxed opacity-80">
              Engineering <span className="text-white italic underline decoration-[#00a63e] decoration-2 underline-offset-4">Modern Legacies</span>. 
              High-performance builds for high-growth businesses.
            </p>

            {/* --- ACTION BUTTON: Compact Scaling --- */}
            <div className="relative">
              <div className="absolute -inset-1 bg-[#00a63e]/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-700"></div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="relative flex items-center gap-4 bg-white text-black px-10 py-6 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:bg-[#00a63e] hover:text-white active:scale-95"
              >
                Start Your Project
                <ArrowRight size={18} />
              </button>
            </div>

            {/* --- TRUST BAR: Compact --- */}
            <div className="mt-12 flex items-center gap-8 opacity-20 text-[9px] font-bold tracking-[0.2em]">
               <div className="flex items-center gap-2"><ShieldCheck size={14}/> MIL-SPEC SECURITY</div>
               <div className="flex items-center gap-2"><Sparkles size={14}/> AI INTEGRATED</div>
            </div>
          </div>

          {/* --- BACKGROUND TEXT: Reduced Size --- */}
          <div className="absolute -bottom-6 -right-4 text-[8rem] font-black text-white/[0.03] select-none pointer-events-none uppercase italic">
            CWX
          </div>
        </div>
      </motion.div>

      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default StoryCTA;