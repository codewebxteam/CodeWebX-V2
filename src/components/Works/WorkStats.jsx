import React from "react";

const WorkStats = () => {
  const brandColor = "#00a63e"; // CodeWebX Green

  const stats = [
    { label: "Successful Projects", value: "80+" },
    { label: "Cities Reached", value: "10+" },
    { label: "Tech Stack Expertise", value: "30+" },
    { label: "Client Satisfaction", value: "100%" },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* 1. Background Split Logic: 50% Black (top), 50% White (bottom) */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-black"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>

      <div className="relative z-10 px-6 md:px-16 max-w-[1400px] mx-auto">
        {/* 2. Floating Stats Container (Dark Zinc to stand out on both colors) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 bg-zinc-900 border border-white/10 rounded-[2.5rem] md:rounded-full shadow-2xl overflow-hidden py-10 md:py-16">
          
          {/* Fixed: Yahan 'stats.map' use kiya hai ab */}
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center justify-center px-8 text-center group
                ${index !== stats.length - 1 ? "md:border-r border-zinc-800" : ""}`}
            >
              {/* Value with a subtle scale effect on group hover */}
              <span className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2 group-hover:scale-110 transition-transform duration-500">
                {stat.value}
              </span>
              
              {/* Label in Brand Color */}
              <span 
                className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em]"
                style={{ color: brandColor }}
              >
                {stat.label}
              </span>

              {/* Decorative Dot for mobile layout visibility */}
              <div className="w-1 h-1 rounded-full bg-zinc-700 mt-4 md:hidden"></div>
            </div>
          ))}

        </div>
      </div>

      {/* 3. Subtle Geometric Accents */}
      <div className="absolute top-[45%] left-0 w-full flex justify-between px-20 opacity-20 pointer-events-none">
         <div className="w-20 h-20 border border-dashed border-white rounded-full animate-spin-slow"></div>
         <div className="w-10 h-10 bg-[#00a63e] rounded-full blur-xl"></div>
      </div>
    </section>
  );
};

export default WorkStats;