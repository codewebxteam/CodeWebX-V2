import React from "react";
import { motion } from "framer-motion";
import { Send, Code, Users, Rocket } from "lucide-react";

const HiringProcess = () => {
  const brandColor = "#00a63e";

  const steps = [
    { title: "Apply", icon: <Send size={20} />, desc: "Drop CV" },
    { title: "Task", icon: <Code size={20} />, desc: "Code Test" },
    { title: "Interview", icon: <Users size={20} />, desc: "Face Time" },
    { title: "Join", icon: <Rocket size={20} />, desc: "Onboard" }
  ];

  return (
    <section className="py-10 md:py-14 px-6 md:px-16 bg-white overflow-hidden relative border-b border-zinc-50">
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* --- COMPACT HEADER --- */}
        <div className="flex items-center gap-4 mb-10 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-black uppercase shrink-0">
            The <span className="text-zinc-300 italic">Pathway</span>
          </h2>
          <div className="h-[1px] flex-grow bg-zinc-100 hidden md:block"></div>
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-400 shrink-0">
            4-Step Protocol
          </span>
        </div>

        {/* --- TIGHT GRAPHICAL ROADMAP --- */}
        <div className="relative">
          
          {/* Connector Line (Desktop) */}
          <div className="absolute top-[32px] left-[5%] w-[90%] h-[1px] bg-zinc-100 hidden md:block">
            <motion.div 
              initial={{ left: "-10%" }}
              animate={{ left: "110%" }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 w-24 h-full bg-[#00a63e] shadow-[0_0_8px_#00a63e]"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="group relative flex flex-col items-center md:items-start"
              >
                
                {/* Node & Icon (w-14 h-14 for ultra-compact) */}
                <div className="relative mb-3">
                  <div className="relative w-14 h-14 bg-white border border-zinc-100 rounded-xl flex items-center justify-center group-hover:border-[#00a63e] group-hover:shadow-md transition-all duration-500 z-10">
                    <div className="text-zinc-400 group-hover:text-[#00a63e] transition-transform group-hover:scale-105">
                      {step.icon}
                    </div>
                  </div>

                  {/* Step No. Badge */}
                  <div className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded bg-black text-white text-[7px] font-black flex items-center justify-center z-20 border border-white">
                    0{i + 1}
                  </div>
                </div>

                {/* Content Area */}
                <div className="text-center md:text-left">
                  <h4 className="text-xs md:text-sm font-black uppercase tracking-tighter text-black mb-0.5">
                    {step.title}
                  </h4>
                  <p className="text-[8px] md:text-[9px] font-bold text-zinc-400 uppercase tracking-widest leading-none">
                    {step.desc}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

        {/* --- SUPER COMPACT CTA BAR --- */}
        <div className="mt-10 p-4 border border-zinc-100 rounded-xl bg-zinc-50/50 flex items-center justify-between gap-4">
           <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-black flex items-center justify-center text-white">
                 <Rocket size={12} />
              </div>
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-tight hidden sm:block">
                Recruiting builders for <span className="text-black">2026</span>
              </p>
           </div>
           
           {/* --- UPDATED BUTTON: Green to Black Hover --- */}
           <button 
             onClick={() => document.getElementById('openings').scrollIntoView({ behavior: 'smooth' })}
             className="px-6 py-3 bg-[#00a63e] border border-[#00a63e] rounded-lg text-[9px] font-black uppercase tracking-widest text-white hover:bg-black hover:border-black transition-all shadow-lg active:scale-95"
           >
             Apply Now
           </button>
        </div>

      </div>
    </section>
  );
};

export default HiringProcess;