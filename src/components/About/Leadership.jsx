import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Globe } from "lucide-react";

const Leadership = () => {
  const brandColor = "#00a63e"; // Exact Green from SinceSection

  const leaders = [
    {
      name: "Aditya Kumar",
      role: "Founder & CTO",
      img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Amit Singh",
      role: "Co-Founder & CEO",
      img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Abhishek Chaudhary",
      role: "Co-Founder & MD",
      img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Shivansh Dwivedi",
      role: "Co-Founder & COO",
      img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  return (
    <section className="relative bg-white py-24 md:py-32 px-6 md:px-16 text-black overflow-hidden">
      {/* SinceSection Styled Glow (Always On) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] blur-[120px] md:blur-[180px] rounded-full pointer-events-none opacity-10"
        style={{ backgroundColor: brandColor }}
      ></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* --- HEADER: FAQ Style Typography --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          <div className="lg:w-1/2">
            <h2 className="text-5xl md:text-7xl font-ultra-thin tracking-tighter leading-none mb-6">
              The Minds <br />
              <span className="italic font-light" style={{ color: brandColor }}>
                Behind CodeWebX.
              </span>
            </h2>
          </div>

          <div className="lg:w-1/2">
            <p className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              Leadership at CodeWebX is built on a shared obsession with
              technical excellence and client growth [cite: 2026-01-15]. We
              architect the future of businesses with discipline and speed
              [cite: 2026-02-11].
            </p>
          </div>
        </div>

        {/* --- LEADERS GRID: 4 Photos with Permanent Info & Color --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((leader, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden group shadow-sm border border-zinc-100"
            >
              {/* Profile Image - Full Color and Always Visible */}
              <img
                src={leader.img}
                alt={leader.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Permanent Info Overlay (No Hover Required) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-black uppercase tracking-tighter leading-none mb-1">
                  {leader.name}
                </h3>
                <p
                  className="font-bold uppercase tracking-[0.4em] text-[10px]"
                  style={{ color: brandColor }}
                >
                  {leader.role}
                </p>

                {/* Social icons visible on hover for extra pro feel */}
                <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Linkedin
                    size={16}
                    className="text-white/60 hover:text-white cursor-pointer"
                  />
                  <Twitter
                    size={16}
                    className="text-white/60 hover:text-white cursor-pointer"
                  />
                  <Globe
                    size={16}
                    className="text-white/60 hover:text-white cursor-pointer"
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
