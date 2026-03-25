import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";

const TeamSection = () => {
  const team = [
    { id: 1, name: "Amit Singh", role: "CEO & Co-Founder", img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 2, name: "Abhishek Chaudhary", role: "Managing Director", img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 3, name: "Shivansh Diwedi", role: "COO", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 4, name: "Aditya Kumar Gond", role: "Product Lead", img: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=800" },
  ];

  // 12 Items for a rich manual scroll experience
  const extendedTeam = [...team, ...team, ...team];

  return (
    <section className="bg-white py-12 md:py-20 px-5 md:px-16 text-black overflow-hidden select-none border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- COMPACT HEADER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#00a63e] rounded-full"></div>
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">The Architects</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase">
              Team <span className="text-zinc-200 italic font-medium">CWX</span>
            </h2>
          </div>

          <div className="lg:w-1/3 space-y-6">
            <p className="text-zinc-500 text-sm md:text-lg font-medium leading-relaxed">
              Our core collective of 16+ engineers building <span className="text-black font-bold">next-gen infrastructure</span>.
            </p>
            <button className="group flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full active:scale-95 transition-all shadow-lg">
              <Plus size={14} className="group-hover:rotate-90 transition-transform text-[#00a63e]" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Join the Squad</span>
            </button>
          </div>
        </div>

        {/* --- PURE MANUAL DRAG CAROUSEL --- */}
        <div className="relative w-full cursor-grab active:cursor-grabbing overflow-visible">
          <motion.div
            className="flex gap-4 md:gap-8 py-2 w-max"
            drag="x"
            // Constraints set karein taaki user end tak hi scroll kar sake
            dragConstraints={{ right: 0, left: -2500 }} 
            dragElastic={0.1}
            whileTap={{ cursor: "grabbing" }}
          >
            {extendedTeam.map((member, idx) => (
              <div
                key={idx}
                className="relative flex-shrink-0 w-[200px] md:w-[320px] aspect-square md:aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group border border-zinc-100 bg-zinc-50 shadow-sm"
              >
                <img
                  src={member.img}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
                  alt={member.name}
                />
                
                {/* Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-10">
                  <span className="text-white text-xl md:text-3xl font-black uppercase tracking-tighter leading-none mb-1">
                    {member.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-[1px] bg-[#00a63e]"></div>
                    <span className="text-[#00a63e] text-[8px] md:text-[9px] font-black uppercase tracking-widest">
                      {member.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* End of List "More" Card */}
            <div className="flex-shrink-0 w-[200px] md:w-[320px] aspect-square md:aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center gap-4 group hover:border-[#00a63e] transition-colors cursor-pointer">
               <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-[#00a63e] transition-colors">
                  <ArrowRight size={20} className="group-hover:text-white transition-colors" />
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-black">View All Members</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;