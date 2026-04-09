import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  History 
} from "lucide-react";
import InquiryModal from "../Common/InquiryModal";
// Image Import (Path check kar lena)
import officeImg from "../../assets/office.webp";

const SinceSection = () => {
  const brandColor = "#00a63e"; 
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full bg-black py-20 md:py-32 px-6 md:px-16 overflow-hidden border-b border-zinc-900">
      
      {/* Subtle Glow Overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00a63e]/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-3 mb-6">
              <History size={16} style={{ color: brandColor }} />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">
                The Inception
              </span>
            </div>
            <h2 className="text-4xl md:text-7xl font-light tracking-tighter text-white leading-[1.1]">
              Engineering Growth <br />
              <span className="font-black italic">Since Feb 2024.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-xs md:text-sm font-medium max-w-xs leading-relaxed border-l-2 border-zinc-800 pl-6 text-left">
            From our headquarters in GIDA to managing <span className="text-white">high-performance digital assets.</span> We are the engine behind modern digital success.
          </p>
        </div>

        {/* --- GRID: IMAGE + STATS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Office Visual with Overlay */}
          <div className="lg:col-span-6 relative group">
            <div className="relative aspect-video lg:aspect-square rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl transition-all duration-700 hover:border-[#00a63e]/30">
              
              {/* Actual Office Image */}
              <img 
                src={officeImg} 
                alt="CodeWebX Office" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              <div className="absolute bottom-8 left-8 right-8 z-10 text-left">
                <div className="w-10 h-10 bg-[#00a63e] rounded-xl flex items-center justify-center mb-4 shadow-2xl">
                    <MapPin size={20} className="text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-2 leading-none">
                    GIDA <span className="text-zinc-400">Sector 5,</span> <br /> 
                    <span style={{ color: brandColor }}>Gorakhpur.</span>
                </h3>
                <p className="text-zinc-300 text-[10px] font-bold uppercase tracking-widest opacity-60">
                    Regional Headquarters & Innovation Lab
                </p>
              </div>

              {/* Decorative "24" Year Label */}
              <div className="absolute -top-6 -right-6 text-[10rem] font-black text-white/[0.03] select-none italic">
                24
              </div>
            </div>
          </div>

          {/* RIGHT: Values & CTA */}
          <div className="lg:col-span-6 flex flex-col gap-12">
            
            {/* Value Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={18} style={{ color: brandColor }} />
                        <h4 className="text-sm font-black uppercase tracking-widest text-white">Trust Foundation</h4>
                    </div>
                    <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                        Establishing secure, scalable systems in GIDA Sector 5. We manage enterprise data with military-grade precision.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Sparkles size={18} style={{ color: brandColor }} />
                        <h4 className="text-sm font-black uppercase tracking-widest text-white">Local Pride</h4>
                    </div>
                    <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                        Empowering Uttar Pradesh's digital ecosystem by bringing global-standard software engineering to Gorakhpur.
                    </p>
                </div>
            </div>

            {/* --- THE CTA BAR --- */}
            <div className="p-8 md:p-10 bg-zinc-900/40 border border-white/5 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 group hover:bg-zinc-900 transition-all duration-500">
                <div className="text-left">
                    <h5 className="text-xl font-bold text-white mb-1">Ready to scale?</h5>
                    <p className="text-zinc-500 text-[9px] uppercase tracking-widest font-black">Join our GIDA ecosystem today.</p>
                </div>
                
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-4 bg-white text-black px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#00a63e] hover:text-white transition-all duration-500 active:scale-95 whitespace-nowrap shadow-xl"
                >
                    Start Project
                    <ArrowRight size={16} />
                </button>
            </div>

          </div>
        </div>
      </div>

      {/* --- MODAL --- */}
      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default SinceSection;