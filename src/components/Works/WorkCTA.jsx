import React, { useState } from "react";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import InquiryModal from "../Common/InquiryModal";

const WorkCTA = () => {
  const brandColor = "#00a63e"; // CodeWebX Green
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="px-6 md:px-16 py-10 md:py-16 bg-black">
      <div 
        className="max-w-[1400px] mx-auto rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 relative overflow-hidden group"
        style={{ backgroundColor: brandColor }}
      >
        {/* Background Decorative Circles - Compact Blur (Matched with ClientCTA) */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-8 -mb-8 blur-2xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Left Side: Content - Matched Spacing */}
          <div className="max-w-2xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <MessageSquare className="text-white" size={18} />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/80">Next Step</span>
            </div>
            
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase mb-6">
              Let's build <br />
              <span className="text-black/20">your legacy.</span>
            </h2>
            
            <p className="text-white/90 text-sm md:text-lg font-medium max-w-sm leading-snug">
              Have a complex project in mind? Our team of 16 experts is ready to scale your vision.
            </p>
          </div>

          {/* Right Side: Action Button - Refined Scale (Matched with ClientCTA) */}
          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-black px-8 py-6 rounded-full flex items-center gap-4 group/btn hover:bg-black hover:text-white transition-all duration-500 shadow-xl scale-100 md:scale-110 active:scale-95"
            >
              <span className="text-[10px] font-black uppercase tracking-widest">Start a Project</span>
              <div className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center group-hover/btn:bg-white/20 transition-all">
                <ArrowRight size={16} />
              </div>
            </button>
            <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.5em]">Available for new projects</span>
          </div>
        </div>
      </div>

      {/* Reusable Inquiry Modal */}
      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Subtle Footer Link for the next page */}
      <div className="max-w-[1400px] mx-auto mt-8 flex justify-center md:justify-end">
        <Link to="/clients" className="group flex items-center gap-3 text-zinc-600 hover:text-white transition-colors">
            <span className="text-[9px] font-bold uppercase tracking-widest">See our trusted clients</span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default WorkCTA;