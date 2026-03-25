import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { Rocket, Globe, Smartphone, Heart, ArrowUpRight, ShieldCheck, Zap } from "lucide-react";

const AboutSection = () => {
  const navigate = useNavigate();

  const stats = [
    {
      number: "13",
      label: "Years",
      icon: <Rocket size={20} />,
      color: "from-blue-500/20 to-blue-600/5",
      accent: "#3b82f6"
    },
    {
      number: "500",
      label: "Assets",
      icon: <Globe size={20} />,
      color: "from-emerald-500/20 to-emerald-600/5",
      accent: "#10b981"
    },
    {
      number: "50",
      label: "Apps",
      icon: <Smartphone size={20} />,
      color: "from-orange-500/20 to-orange-600/5",
      accent: "#f59e0b"
    },
    {
      number: "100",
      label: "Success",
      icon: <Heart size={20} />,
      suffix: "%",
      color: "from-rose-500/20 to-rose-600/5",
      accent: "#f43f5e"
    },
  ];

  return (
    <section className="relative bg-[#fafafa] py-12 md:py-32 px-5 md:px-16 overflow-hidden">
      
      {/* Background Micro-Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none"
           style={{ backgroundImage: `radial-gradient(#e5e7eb 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 mb-10 md:mb-20 items-start md:items-end justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 bg-white w-fit px-3 py-1 rounded-full border border-zinc-200 shadow-sm">
              <Zap size={12} className="text-[#00a63e]" />
              <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">
                Studio Intelligence
              </span>
            </div>
            <h2 className="text-4xl md:text-8xl font-black text-black leading-[0.9] uppercase tracking-tighter">
              Engineering <br />
              <span className="text-zinc-300">Pure Legacy.</span>
            </h2>
          </div>

          <div className="max-w-sm space-y-4 md:space-y-6">
            <p className="text-zinc-500 text-sm md:text-lg font-medium leading-relaxed">
              We architect <span className="text-black italic font-bold">high-velocity systems</span> for startups that demand excellence.
            </p>
            <button 
              onClick={() => navigate("/works")} 
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:shadow-lg transition-all active:scale-95"
            >
              Explore DNA
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* --- COMPACT DASHBOARD GRID (2x2 on Mobile) --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative group bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 md:group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="relative z-10">
                {/* Smaller Icon for Mobile */}
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-zinc-50 flex items-center justify-center mb-4 md:mb-10 shadow-inner"
                     style={{ color: stat.accent }}>
                  {stat.icon}
                </div>

                {/* Scaled Number */}
                <div className="flex items-baseline gap-0.5 mb-1">
                  <span className="text-3xl md:text-6xl font-black tracking-tighter text-black leading-none">
                    {stat.number}
                  </span>
                  <span className="text-sm md:text-2xl font-black" style={{ color: stat.accent }}>
                    {stat.suffix || "+"}
                  </span>
                </div>

                <h4 className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-black transition-colors">
                  {stat.label}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- SLIM TRUST BADGE --- */}
        <div className="mt-10 md:mt-20 flex items-center justify-center gap-6 md:gap-10 opacity-20 grayscale">
           <div className="flex items-center gap-2">
              <ShieldCheck size={14} />
              <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Secure Systems</span>
           </div>
           <div className="w-1 h-1 rounded-full bg-zinc-400"></div>
           <div className="flex items-center gap-2">
              <Zap size={14} />
              <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest whitespace-nowrap">High-Perf Core</span>
           </div>
        </div>

      </div>

      {/* Tighter Glow for Mobile */}
      <div className="absolute top-1/2 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#00a63e]/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
    </section>
  );
};

export default AboutSection;