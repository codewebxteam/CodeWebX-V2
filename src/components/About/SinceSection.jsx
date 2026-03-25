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

const SinceSection = () => {
  const brandColor = "#00a63e"; 
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full bg-black py-20 md:py-32 px-6 md:px-16 overflow-hidden border-b border-zinc-900">
      
      {/* Subtle Architectural Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00a63e]/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- SECTION HEADER: Compact & Refined --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <History size={16} style={{ color: brandColor }} />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">
                Established Legacy
              </span>
            </div>
            <h2 className="text-4xl md:text-7xl font-light tracking-tighter text-white leading-[1.1]">
              Engineering Growth <br />
              <span className="font-black italic">Since Feb 2013.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-xs md:text-sm font-medium max-w-xs leading-relaxed border-l-2 border-zinc-800 pl-6">
            From our first line of code in Gorakhpur to managing <span className="text-white">500+ global entities.</span> We are the silent engine behind digital success.
          </p>
        </div>

        {/* --- GRID: STORY + STATS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Visual Legacy Element */}
          <div className="lg:col-span-5 relative group">
            <div className="relative aspect-[4/5] bg-zinc-900/40 rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col justify-end p-8 md:p-12 transition-all duration-700 hover:border-[#00a63e]/30">
              
              {/* Abstract Design Overlay */}
              <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
                   style={{ backgroundImage: `radial-gradient(${brandColor} 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
                    <MapPin size={24} className="text-black" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
                    Founded in <br /> <span style={{ color: brandColor }}>Gorakhpur.</span>
                </h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                    A vision that started in Uttar Pradesh, now delivering world-class engineering solutions at scale.
                </p>
              </div>

              {/* Decorative Number */}
              <div className="absolute -top-10 -right-10 text-[12rem] font-black text-white/[0.02] select-none italic">
                13
              </div>
            </div>
          </div>

          {/* RIGHT: The Values & CTA */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            
            {/* Value Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={18} style={{ color: brandColor }} />
                        <h4 className="text-sm font-black uppercase tracking-widest text-white">Trust Centric</h4>
                    </div>
                    <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                        Security is not a feature; it's our foundation. We manage client data with bank-level compliance since day one.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Sparkles size={18} style={{ color: brandColor }} />
                        <h4 className="text-sm font-black uppercase tracking-widest text-white">Innovation Driven</h4>
                    </div>
                    <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                        Transitioning from simple web apps in 2013 to high-performance AI & ERP systems in 2026.
                    </p>
                </div>
            </div>

            {/* --- THE REDESIGNED CTA BAR --- */}
            <div className="mt-8 p-10 bg-zinc-900/50 border border-white/5 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 group hover:bg-zinc-900 transition-colors">
                <div>
                    <h5 className="text-xl font-bold text-white mb-2">Ready to evolve?</h5>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest font-black">Let's build your next chapter together.</p>
                </div>
                
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-4 bg-white text-black px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#00a63e] hover:text-white transition-all duration-500 active:scale-95 whitespace-nowrap"
                >
                    Start a Conversation
                    <ArrowRight size={16} />
                </button>
            </div>

          </div>
        </div>
      </div>

      {/* --- INTEGRATED REUSABLE MODAL --- */}
      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default SinceSection;