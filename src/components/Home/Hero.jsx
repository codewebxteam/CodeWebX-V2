import React, { useState } from "react";
import { motion } from "framer-motion";
import InquiryModal from "../Common/InquiryModal";
import HeroImage from "../../assets/hero.png"; 

const Hero = () => {
  const brandColor = "#00a63e"; 
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full flex items-center justify-center px-4 md:px-16 pt-10 md:pt-32 pb-10 overflow-hidden bg-black text-white">
      
      {/* --- BACKGROUND DECOR --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <h2 className="absolute top-10 left-1/2 -translate-x-1/2 text-[15vw] font-black opacity-[0.03] whitespace-nowrap lg:hidden">
          CODEWEBX
        </h2>
        
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, ${brandColor} 1px, transparent 0)`,
            backgroundSize: '30px 30px',
          }}
        ></div>
        
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-[#00a63e]/15 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center gap-4 lg:grid lg:grid-cols-12 lg:gap-12">
        
        {/* --- MAIN CONTENT (LEFT SIDE) --- */}
        <div className="w-full lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10rem] font-black uppercase tracking-tighter leading-[0.85]">
              SCALING <br />
              <span 
                className="text-transparent"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}
              >
                BRANDS
              </span> <br />
              <span className="text-[#00a63e]">ONLINE</span>
            </h1>
            
            <p className="mt-4 lg:mt-8 text-zinc-400 text-sm md:text-xl max-w-lg font-medium leading-relaxed px-4 lg:px-0">
              We develop high-performance websites and apps that scale your brand. Pure tech, no fluff.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 px-4 lg:px-0">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto bg-[#00a63e] text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_15px_40px_rgba(0,166,62,0.3)] active:scale-95"
              >
                Start Your Project ↗
              </button>
              
              <div className="flex items-center gap-4 bg-zinc-900/40 p-3 rounded-2xl border border-white/5 backdrop-blur-sm">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="w-7 h-7 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center text-[8px] font-bold">CWX</div>)}
                </div>
                <div className="text-left">
                  <p className="text-white text-[10px] font-black uppercase leading-none">Trusted</p>
                  <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-tighter mt-1">By 50+ Global Brands</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- IMAGE SHOWCASE (RIGHT SIDE) --- */}
        <div className="w-full lg:col-span-5 flex justify-center items-center order-1 lg:order-2 mt-[-20px] lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-[280px] md:max-w-[480px]"
          >
            <motion.img 
              src={HeroImage} 
              alt="CodeWebX Tech Showcase" 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-auto drop-shadow-[0_10px_40px_rgba(0,166,62,0.25)] rounded-2xl relative z-10"
            />
            
            <div className="absolute -top-4 -right-2 bg-zinc-900/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl shadow-2xl z-20">
               <p className="text-[10px] font-black text-[#00a63e] uppercase leading-none">Status</p>
               <p className="text-[14px] font-black text-white italic">Active 🔥</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* BACKGROUND DECORATIVE TEXT */}
      <div className="absolute -bottom-10 -left-10 opacity-[0.02] select-none pointer-events-none hidden lg:block">
        <h2 className="text-[25rem] font-black leading-none">01</h2>
      </div>

      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;