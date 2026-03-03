import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  History,
  Globe,
  ShieldCheck,
} from "lucide-react";

const SinceSection = () => {
  const brandColor = "#00a63e"; // CodeWebX Brand Green [cite: 2026-02-19]

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-16 bg-black overflow-hidden py-20">
      {/* Background Glow - Positioned strictly for full screen center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] blur-[120px] md:blur-[180px] rounded-full pointer-events-none opacity-20"
        style={{ backgroundColor: brandColor }}
      ></div>

      <div className="relative z-10 w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Content: The Legacy Text (Centered vertically for laptop) */}
        <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center lg:justify-start gap-2 px-4 py-2 bg-zinc-900/80 border border-zinc-800 rounded-md w-fit mx-auto lg:mx-0"
          >
            <Sparkles size={14} style={{ color: brandColor }} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
              A Decade of Innovation
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.85] uppercase text-white"
          >
            Since <br />
            <span className="text-outline-thin opacity-30">2013</span>
            <span className="italic font-serif" style={{ color: brandColor }}>
              .
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 flex flex-col md:flex-row items-center gap-8 md:gap-12"
          >
            <button className="group w-full md:w-auto flex items-center justify-center gap-5 bg-white text-black px-10 py-5 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#00a63e] hover:text-white transition-all duration-500 shadow-2xl active:scale-95">
              Our Journey
              <ArrowUpRight
                className="transition-transform group-hover:rotate-45"
                size={18}
              />
            </button>

            <p className="text-zinc-500 text-sm md:text-base max-w-[320px] font-light leading-relaxed tracking-tight text-center lg:text-left">
              From a small vision in{" "}
              <span className="text-white font-medium italic">
                Uttar Pradesh
              </span>{" "}
              to a high-performance tech partner [cite: 2026-02-11]. We scale
              legacies.
            </p>
          </motion.div>
        </div>

        {/* Right Content: The Legacy Dashboard Card (Amit Bhai Style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center lg:justify-end order-1 lg:order-2"
        >
          <div className="relative w-full max-w-[350px] md:max-w-lg aspect-square bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 md:p-14 flex flex-col justify-between overflow-hidden group shadow-[0_0_80px_rgba(0,0,0,0.6)]">
            <div className="flex justify-between items-start">
              <div className="p-4 rounded-2xl bg-black/60 border border-white/5 shadow-inner">
                <History size={26} style={{ color: brandColor }} />
              </div>
              <Globe
                size={36}
                style={{ color: brandColor }}
                className="opacity-40 group-hover:opacity-100 group-hover:rotate-[360deg] transition-all duration-1000"
              />
            </div>

            <div className="mt-auto relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full border-4 border-zinc-900 bg-zinc-800 overflow-hidden shadow-2xl"
                    >
                      <img
                        src={`https://i.pravatar.cc/100?img=${i + 15}`}
                        alt="client"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-800/50 px-3 py-1 rounded-full">
                  +500 Clients [cite: 2026-02-23]
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-tight uppercase">
                Proven <br /> Excellence
              </h2>
              <div
                className="mt-5 h-[4px] w-20 rounded-full"
                style={{ backgroundColor: brandColor }}
              ></div>
            </div>

            {/* Shield Decor */}
            <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldCheck size={250} />
            </div>
          </div>

          {/* Floating Legacy Badge */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -left-4 bg-white text-black py-4 px-8 rounded-2xl rotate-[-8deg] shadow-[0_30px_60px_rgba(0,0,0,0.5)] hidden sm:block border-b-8 border-zinc-200"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-3 h-3 rounded-full animate-ping"
                style={{ backgroundColor: brandColor }}
              ></div>
              <p className="text-[11px] font-black leading-tight uppercase tracking-tighter">
                Operating Since <br />{" "}
                <span style={{ color: brandColor }} className="text-xs">
                  February 2013
                </span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SinceSection;
