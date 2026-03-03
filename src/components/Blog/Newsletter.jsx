import React from "react";
import { Send, Sparkles, ShieldCheck } from "lucide-react";

const Newsletter = () => {
  const brandColor = "#00a63e"; // Aapka Brand Color

  return (
    <section className="px-6 md:px-16 py-12 md:py-24 bg-black">
      <div className="max-w-[1400px] mx-auto">
        <div className="relative group p-8 md:p-20 bg-zinc-900/20 border border-white/5 rounded-[3rem] md:rounded-[4rem] overflow-hidden flex flex-col items-center text-center">
          
          {/* Decorative Background Glow */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 blur-[120px] rounded-full opacity-10 pointer-events-none transition-all duration-700 group-hover:opacity-20"
            style={{ backgroundColor: brandColor }}
          ></div>

          <div className="relative z-10 max-w-2xl">
            {/* Header Icon */}
            <div className="flex justify-center mb-8">
                <div className="p-4 bg-black/40 border border-white/5 rounded-2xl">
                    <Sparkles size={24} style={{ color: brandColor }} className="animate-pulse" />
                </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight uppercase mb-6">
                Join the <br /> <span className="text-outline-thin opacity-40">Inner Circle.</span>
            </h2>

            <p className="text-zinc-500 text-sm md:text-lg font-medium leading-relaxed mb-12">
                No spam. Just high-signal updates on engineering, <br className="hidden md:block" /> UI/UX, and what we're building at <span className="text-white">CodeWebX.</span>
            </p>

            {/* Smart Input Field */}
            <div className="relative max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Drop your email here" 
                className="w-full bg-black/60 border border-zinc-800 p-5 md:p-6 rounded-2xl outline-none focus:border-[#00a63e] transition-all text-white text-center font-medium placeholder:text-zinc-700"
              />
              <button 
                className="mt-4 md:mt-0 md:absolute md:right-3 md:top-3 md:bottom-3 px-8 py-3 md:py-0 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-500 hover:scale-105 active:scale-95"
                style={{ backgroundColor: brandColor, color: 'white' }}
              >
                Subscribe
              </button>
            </div>

            {/* Security Label */}
            <div className="mt-8 flex items-center justify-center gap-2 text-zinc-600">
                <ShieldCheck size={14} />
                <span className="text-[9px] font-bold uppercase tracking-widest">Your data is encrypted & secure.</span>
            </div>
          </div>

          {/* Graphical Watermark (Subtle) */}
          <div className="absolute -bottom-10 -left-10 text-zinc-900/20 group-hover:text-[#00a63e]/5 transition-all duration-1000">
            <Send size={200} strokeWidth={1} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;