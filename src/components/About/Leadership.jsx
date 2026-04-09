import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Globe } from "lucide-react";

// --- ASSETS IMPORT ---
import abhiImg from "../../assets/abhi.webp";
import adityaImg from "../../assets/aditya.webp";
import amitImg from "../../assets/amit.webp";
import shivImg from "../../assets/shiv.webp";

const Leadership = () => {
  const brandColor = "#00a63e"; 

  const leaders = [
    {
      name: "Aditya Kumar",
      role: "Founder & CTO",
      img: adityaImg,
    },
    {
      name: "Amit Singh",
      role: "Co-Founder & CEO",
      img: amitImg,
    },
    {
      name: "Abhishek Chaudhary",
      role: "Co-Founder & MD",
      img: abhiImg,
    },
    {
      name: "Shivansh Dwivedi",
      role: "Co-Founder & COO",
      img: shivImg,
    },
  ];

  return (
    <section className="relative bg-white py-24 md:py-32 px-6 md:px-16 text-black overflow-hidden border-t border-zinc-100">
      {/* SinceSection Styled Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] blur-[120px] md:blur-[180px] rounded-full pointer-events-none opacity-10"
        style={{ backgroundColor: brandColor }}
      ></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* --- HEADER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          <div className="lg:w-1/2 text-left">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-6 uppercase">
              The Minds <br />
              <span className="italic font-light text-zinc-300">
                Behind CWX.
              </span>
            </h2>
          </div>

          <div className="lg:w-1/2 text-left">
            <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
              Leadership at CodeWebX is built on a shared obsession with
              technical excellence and strategic growth. We
              architect the future of businesses with discipline, speed, and 
              uncompromising quality.
            </p>
          </div>
        </div>

        {/* --- LEADERS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((leader, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden group shadow-sm border border-zinc-100 bg-zinc-50"
            >
              {/* Profile Image */}
              <img
                src={leader.img}
                alt={leader.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />

              {/* Permanent Info Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8 text-left">
                <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none mb-1">
                  {leader.name}
                </h3>
                <p
                  className="font-black uppercase tracking-[0.3em] text-[10px]"
                  style={{ color: brandColor }}
                >
                  {leader.role}
                </p>

                {/* Social icons */}
                <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <Linkedin
                    size={16}
                    className="text-white/60 hover:text-[#00a63e] cursor-pointer transition-colors"
                  />
                  <Twitter
                    size={16}
                    className="text-white/60 hover:text-[#00a63e] cursor-pointer transition-colors"
                  />
                  <Globe
                    size={16}
                    className="text-white/60 hover:text-[#00a63e] cursor-pointer transition-colors"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;