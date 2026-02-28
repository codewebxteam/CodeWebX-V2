import React from "react";
import { ArrowUpRight, Zap, Target, Sparkles, Code2 } from "lucide-react";

const CareerHero = () => {
  const brandColor = "#00a63e"; // Aapka Brand Color

  return (
    <section className="relative flex flex-col items-center justify-center px-6 md:px-16 bg-black overflow-hidden pt-24 md:pt-32 pb-12 md:pb-20">
      
      {/* Smart Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] blur-[100px] md:blur-[130px] rounded-full pointer-events-none opacity-20"
        style={{ backgroundColor: brandColor }}
      ></div>
      
      <div className="relative z-10 w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col gap-6 order-2 lg:order-1 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 px-3 py-1 bg-zinc-900/80 border border-zinc-800 rounded-md w-fit mx-auto lg:mx-0">
            <Sparkles size={12} style={{ color: brandColor }} />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">
              Future-Proof Your Career
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] uppercase">
            Work <span className="text-outline-thin opacity-50">Hard.</span> <br />
            Ship <span className="italic font-serif" style={{ color: brandColor }}>Fast.</span>
          </h1>

          <div className="mt-2 flex flex-col md:flex-row items-center gap-8">
            {/* Rectangular Modern CTA (Non-Circular) */}
            <button 
               onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
               className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#00a63e] hover:text-white transition-all duration-500 shadow-xl active:scale-95"
            >
              Explore Openings
              <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={16} />
            </button>
            
            <p className="text-zinc-500 text-xs md:text-sm max-w-[250px] font-medium leading-snug">
              Don't just join a company. <br />
              Join a <span className="text-white italic">High-Performance Engine</span>.
            </p>
          </div>
        </div>

        {/* Right Content: Dashboard Card */}
        <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 scale-90 md:scale-100">
          
          <div className="relative w-full max-w-[320px] md:max-w-sm aspect-square bg-zinc-900/30 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between overflow-hidden group">
             
             <div className="flex justify-between items-start">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <Code2 size={20} style={{ color: brandColor }} />
                </div>
                <Zap size={28} style={{ color: brandColor }} className="opacity-50 group-hover:opacity-100 transition-opacity" />
             </div>
             
             <div className="mt-auto">
                <div className="flex -space-x-3 mb-5">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="dev" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div 
                    className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center text-white font-black text-[10px]"
                    style={{ backgroundColor: brandColor }}
                  >
                    +10
                  </div>
                </div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">Elite <br/>Developer Hub</h2>
                <div className="mt-3 h-[2px] w-10 rounded-full" style={{ backgroundColor: brandColor }}></div>
             </div>

             <div className="absolute -bottom-6 -right-6 opacity-5">
                <Target size={140} />
             </div>
          </div>

          {/* Mentorship Badge */}
          <div className="absolute -top-4 -left-2 bg-white text-black py-3 px-5 rounded-xl rotate-[-6deg] shadow-2xl hidden sm:block">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: brandColor }}></div>
                <p className="text-[9px] font-black leading-none uppercase tracking-tighter">Mentorship-First <br/> Culture</p>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CareerHero;