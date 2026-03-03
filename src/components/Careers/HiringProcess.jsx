import React from "react";
import { Send, Code, Users, Rocket } from "lucide-react";

const HiringProcess = () => {
  const brandColor = "#00a63e";

  const steps = [
    { title: "Apply", icon: <Send size={20} />, desc: "Drop your CV" },
    { title: "Task", icon: <Code size={20} />, desc: "Code Challenge" },
    { title: "Interview", icon: <Users size={20} />, desc: "Face to Face" },
    { title: "Onboarding", icon: <Rocket size={20} />, desc: "Join Team" }
  ];

  return (
    <section className="py-16 px-6 md:px-16 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase leading-none">
            Our <span className="text-zinc-200 italic">Pathway</span>
          </h2>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 border-l-2 border-[#00a63e] pl-4">
            4 Steps to CodeWebX
          </span>
        </div>

        {/* Graphical Roadmap Container */}
        <div className="relative">
          
          {/* Main Connector Line (SVG for precision) */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-zinc-100 -translate-y-1/2 hidden md:block">
            {/* Animated Progress Overlay */}
            <div className="absolute top-0 left-0 h-full w-1/3 bg-[#00a63e] shadow-[0_0_10px_#00a63e] animate-pulse"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="group flex flex-col items-center text-center">
                
                {/* Graphical Node */}
                <div className="relative mb-6">
                  {/* Outer Ring */}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white border-2 border-zinc-100 flex items-center justify-center group-hover:border-[#00a63e] group-hover:rotate-6 transition-all duration-500 shadow-sm relative z-10">
                    <div className="text-zinc-400 group-hover:text-[#00a63e] transition-colors">
                      {step.icon}
                    </div>
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-black text-white text-[10px] font-black flex items-center justify-center z-20 border-2 border-white">
                    {i + 1}
                  </div>

                  {/* Connecting Pulse (Mobile only connector) */}
                  <div className="absolute top-1/2 left-full w-full h-[1px] bg-zinc-100 md:hidden -z-10"></div>
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h4 className="text-sm md:text-lg font-black uppercase tracking-tighter text-black">
                    {step.title}
                  </h4>
                  <p className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest">
                    {step.desc}
                  </p>
                </div>

                {/* Impact Glow on Hover */}
                <div className="mt-4 w-2 h-2 rounded-full bg-[#00a63e] opacity-0 group-hover:opacity-100 blur-sm transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HiringProcess;