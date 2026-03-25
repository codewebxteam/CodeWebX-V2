import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InquiryModal from "../Common/InquiryModal"; 

const Hero = () => {
  const brandColor = "#00a63e";
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const services = ["Apps", "Websites", "ERP", "AI Tools", "Portals" ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] md:min-h-screen w-full flex flex-col justify-center px-6 md:px-16 pt-32 md:pt-48 pb-20 overflow-hidden bg-black">
      
      {/* 1. LAYER: TECHNICAL GRID */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{ 
          backgroundImage: `radial-gradient(${brandColor} 0.5px, transparent 0.5px), linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)`,
          backgroundSize: '25px 25px',
        }}
      ></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-end justify-between w-full h-full gap-12 lg:gap-0">
        
        {/* --- LEFT: MAIN HEADING (Fixed Clipping & Enhanced UI) --- */}
        <div className="w-full lg:w-2/3 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase select-none">
            <span className="text-white">We</span> <br />
            {/* DEVELOP: Transparent with White Border */}
            <span 
              className="text-transparent"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}
            >
              develop
            </span> <br />
            
            {/* SERVICES: Bold, Visible & Modern 3D Flip */}
            <div className="relative h-[1.1em] flex items-center justify-center lg:justify-start overflow-visible pt-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={services[index]}
                  initial={{ y: "80%", opacity: 0, rotateX: 60 }}
                  animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                  exit={{ y: "-80%", opacity: 0, rotateX: -60 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block text-[#00a63e] italic font-black"
                  style={{ textShadow: `0 0 30px ${brandColor}44` }}
                >
                  {services[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-12 md:mt-16 group flex items-center gap-5 bg-white text-black px-12 py-5 md:px-16 md:py-6 rounded-full font-black text-[11px] md:text-xs uppercase tracking-[0.2em] hover:bg-[#00a63e] hover:text-white transition-all duration-500 shadow-2xl active:scale-95"
          >
            Let's Talk!
            <span className="text-xl transition-transform group-hover:translate-x-2 group-hover:-translate-y-2">
              ↗
            </span>
          </button>
        </div>

        {/* --- RIGHT: STATS & CARDS --- */}
        <div className="flex flex-col gap-8 md:gap-12 items-center lg:items-end w-full lg:w-auto">
          <div className="flex gap-4 md:gap-6">
            {/* Project Card */}
            <div className="w-40 h-40 md:w-52 md:h-52 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between group hover:border-[#00a63e]/30 transition-all duration-500">
              <div className="flex justify-between items-start">
                <span className="text-4xl md:text-6xl font-black italic tracking-tighter text-white group-hover:text-[#00a63e] transition-colors">
                  50+
                </span>
                <div className="bg-[#00a63e] w-8 h-8 rounded-full flex items-center justify-center text-black">
                  <span className="text-xs font-black">↗</span>
                </div>
              </div>
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest leading-tight">
                Architects <br /> & Builders
              </p>
            </div>

            {/* Year Card */}
            <div className="w-40 h-40 md:w-52 md:h-52 bg-zinc-100 rounded-[2.5rem] p-8 flex flex-col justify-between text-black shadow-2xl relative overflow-hidden">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                Legacy
              </span>
              <span className="text-5xl font-black tracking-tighter leading-none relative z-10">
                2024
              </span>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#00a63e]/10 rounded-full"></div>
            </div>
          </div>

          <div className="text-center lg:text-right space-y-3">
            <p className="text-zinc-500 text-[13px] md:text-[14px] font-medium leading-relaxed border-l-0 lg:border-r-2 border-[#00a63e] lg:pr-6 max-w-[280px] md:max-w-[340px]">
              Modern tech partners for startups. <br />
              <span className="text-white font-black uppercase tracking-tighter text-base md:text-lg">
                "we   add   value   in   your   product"
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* 3. LAYER: WATERMARK */}
      <div className="absolute -right-20 top-1/2 -rotate-90 origin-right hidden xl:block pointer-events-none translate-y-20">
        <span className="text-white/[0.03] text-[180px] font-black tracking-tighter uppercase select-none whitespace-nowrap">
          CODEWEBX_ENGINES
        </span>
      </div>

      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;