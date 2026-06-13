import React from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

// --- ASSETS IMPORT ---
import abhiImg from "../../assets/abhi.webp";
import adityaImg from "../../assets/aditya.webp";
import amitImg from "../../assets/amit.webp";

const Leadership = () => {
  const brandColor = "#00a63e"; 

  const leaders = [
    {
      name: "Aditya Kumar",
      role: "Founder & CTO",
      img: adityaImg,
      linkedin: "https://www.linkedin.com/in/thead76",
    },
    {
      name: "Amit Singh",
      role: "Co-Founder & CEO",
      img: amitImg,
      linkedin: "https://www.linkedin.com/in/amitrodz",
    },
    {
      name: "Abhishek Chaudhary",
      role: "Co-Founder & MD",
      img: abhiImg,
      linkedin: "https://www.linkedin.com/in/abhishek-chaudhary-aa08b3360",
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

        {/* --- LEADERS GRID (3 Members Layout) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {leaders.map((leader, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl group"
            >
              {/* Profile Image - Hard Grayscale Matching the Screenshot */}
              <img
                src={leader.img}
                alt={leader.name}
                className="w-full h-full object-cover grayscale contrast-[1.05] brightness-[0.95]"
              />

              {/* Exact Screenshot Gradient Match (Bottom Smooth Black Overlay) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-8 text-left">
                
                {/* Name Styling - Large, Bold, White, Tight Tracking */}
                <h3 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tighter leading-[0.9] mb-1.5 whitespace-pre-line break-words max-w-[90%]">
                  {leader.name}
                </h3>
                
                {/* Role Styling - Bright Green, Small, High Letter Spacing */}
                <p className="font-black uppercase tracking-[0.2em] text-[10px] text-[#00a63e]">
                  {leader.role}
                </p>

                {/* LinkedIn Button Integration */}
                {leader.linkedin && (
                  <div className="mt-4">
                    <a 
                      href={leader.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title="LinkedIn Profile"
                      className="inline-flex p-2 bg-white/10 rounded-xl hover:bg-[#00a63e] transition-colors duration-300 backdrop-blur-sm group-hover:scale-105 transform active:scale-95"
                    >
                      <Linkedin
                        size={15}
                        className="text-white"
                      />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;