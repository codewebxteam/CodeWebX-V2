import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Zap, Globe2 } from "lucide-react";
import InquiryModal from "../Common/InquiryModal";

const BrandsCarousel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const brands = [
    { name: "Google", url: "https://www.vectorlogo.zone/logos/google/google-ar21.svg" },
    { name: "Amazon", url: "https://www.vectorlogo.zone/logos/amazon/amazon-ar21.svg" },
    { name: "Microsoft", url: "https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg" },
    { name: "Meta", url: "https://www.vectorlogo.zone/logos/facebook/facebook-ar21.svg" },
    { name: "Netflix", url: "https://www.vectorlogo.zone/logos/netflix/netflix-ar21.svg" },
    { name: "Apple", url: "https://www.vectorlogo.zone/logos/apple/apple-ar21.svg" },
  ];

  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden border-y border-zinc-100">
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          
          {/* --- LEFT: TEXT CONTENT --- */}
          <div className="w-full lg:w-1/3 space-y-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
               <span className="w-8 h-[1px] bg-[#00a63e]"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00a63e]">Direct Partners</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-black text-black tracking-tighter leading-[0.9] uppercase">
              Trusted <br /> <span className="text-zinc-300">By Giants.</span>
            </h3>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00a63e] transition-all"
            >
              Start Partnership <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* --- RIGHT: HIGH-VISIBILITY CAROUSEL --- */}
          <div className="w-full lg:w-2/3 relative group">
            {/* Edge Fading Effect */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex overflow-hidden relative py-6">
              <motion.div 
                animate={{ x: [0, -1500] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="flex gap-20 md:gap-32 items-center flex-none"
              >
                {[...brands, ...brands, ...brands].map((brand, i) => (
                  <div key={i} className="flex-shrink-0 group/logo relative">
                    {/* Brand Image - Size Increased (h-10 to h-16) */}
                    <img 
                      src={brand.url} 
                      alt={brand.name} 
                      className="h-10 md:h-16 w-auto grayscale opacity-40 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-500 transform group-hover/logo:scale-110" 
                    />
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute -inset-4 bg-[#00a63e]/5 blur-xl rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity -z-10"></div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Tactical Status Badges */}
            <div className="mt-10 flex flex-wrap justify-center lg:justify-start items-center gap-6 md:gap-10 border-t border-zinc-100 pt-8 opacity-60">
               <div className="flex items-center gap-2">
                  <Globe2 size={16} className="text-[#00a63e]" /> 
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 whitespace-nowrap">Global Infrastructure</span>
               </div>
               <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#00a63e]" /> 
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 whitespace-nowrap">Enterprise Compliance</span>
               </div>
               <div className="flex items-center gap-2">
                  <Zap size={16} className="text-[#00a63e]" /> 
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 whitespace-nowrap">High-Velocity Core</span>
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Technical Mesh */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:15px_15px] opacity-40"></div>

      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default BrandsCarousel;