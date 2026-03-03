import React from "react";
import { ArrowRight, Handshake, Stars } from "lucide-react";
import { Link } from "react-router-dom";

const ClientCTA = () => {
  const brandColor = "#00a63e"; // CodeWebX Green

  return (
    <section className="px-6 md:px-16 py-20 bg-black">
      <div 
        className="max-w-[1400px] mx-auto rounded-[3rem] md:rounded-[5rem] p-10 md:p-24 relative overflow-hidden group"
        style={{ backgroundColor: brandColor }}
      >
        {/* Background Decorative Circles - WorkCTA Style */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Side: Content */}
          <div className="max-w-2xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <Stars className="text-white" size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">Collaborate</span>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase mb-8">
              Ready to scale <br />
              <span className="text-black/20">your business?</span>
            </h2>
            
            <p className="text-white/80 text-lg md:text-xl font-medium max-w-md leading-relaxed">
              Join the elite group of businesses that chose <span className="text-white">CodeWebX</span> to lead their digital transformation.
            </p>
          </div>

          {/* Right Side: Action Buttons */}
          <div className="flex flex-col items-center gap-6">
            <Link 
              to="/contact" 
              className="bg-white text-black px-10 py-8 rounded-full flex items-center gap-4 group/btn hover:bg-black hover:text-white transition-all duration-500 shadow-2xl scale-110 md:scale-125"
            >
              <span className="text-xs font-black uppercase tracking-widest">Start Partnership</span>
              <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover/btn:bg-white/20 transition-all">
                <Handshake size={18} />
              </div>
            </Link>
            <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.5em]">Global scale solutions</span>
          </div>
        </div>
      </div>

      {/* Subtle Footer Link - Navigating back to Portfolio or Services */}
      <div className="max-w-[1400px] mx-auto mt-12 flex justify-center md:justify-end">
        <Link to="/works" className="group flex items-center gap-3 text-zinc-600 hover:text-white transition-colors">
            <span className="text-[10px] font-bold uppercase tracking-widest">Explore our tech portfolio</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default ClientCTA;