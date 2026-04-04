import React from "react";
import { motion } from "framer-motion";

const StatCard = ({ label, value, icon, trend }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-zinc-950 border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group transition-all hover:border-[#00a63e]/20"
    >
      {/* Subtle Glow background */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#00a63e]/5 blur-[50px] rounded-full group-hover:bg-[#00a63e]/10 transition-all"></div>
      
      <div className="flex justify-between items-start mb-6">
        <div className="p-4 bg-white/5 rounded-2xl text-[#00a63e] group-hover:bg-[#00a63e] group-hover:text-white transition-all shadow-inner">
          {icon}
        </div>
        {trend && (
          <span className="text-[8px] font-black uppercase tracking-widest text-[#00a63e] bg-[#00a63e]/10 px-3 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      
      <div>
        <h3 className="text-4xl font-black text-white tracking-tighter mb-1">
          {value}
        </h3>
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover:text-zinc-400 transition-colors">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

export default StatCard;