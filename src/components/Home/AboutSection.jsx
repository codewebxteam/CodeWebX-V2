import React from "react";
import { Rocket, Globe, Smartphone, Heart, ArrowUpRight } from "lucide-react";

const AboutSection = () => {
  const stats = [
    {
      number: "05",
      label: "Years of Building",
      icon: <Rocket size={32} strokeWidth={1} />,
    },
    {
      number: "50",
      label: "Websites Delivered",
      icon: <Globe size={32} strokeWidth={1} />,
    },
    {
      number: "20",
      label: "Mobile Apps Delivered",
      icon: <Smartphone size={32} strokeWidth={1} />,
    },
    {
      number: "100",
      label: "Client Satisfaction",
      icon: <Heart size={32} strokeWidth={1} />,
      suffix: "%",
    },
  ];

  return (
    <section className="relative bg-white py-24 md:py-40 px-6 md:px-16 overflow-hidden">
      {/* Light Grid Background */}
      <div className="absolute inset-0 bg-grid-light opacity-30 pointer-events-none"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-32">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[1px] w-16 bg-black"></span>
              <span className="text-[10px] font-black tracking-[0.5em] uppercase text-zinc-400">
                The Studio
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-ultra-thin text-black leading-[0.9]">
              Code is our <br />
              <span className="text-outline-dark italic">Architecture.</span>
            </h2>
          </div>

          <div className="lg:w-[40%] flex flex-col items-start gap-8">
            <p className="text-zinc-500 text-xl font-light leading-relaxed">
              Based in Uttar Pradesh,{" "}
              <span className="text-black font-semibold">
                CodeWebX Technologies
              </span>{" "}
              is where minimalist design meets robust engineering. We craft
              digital legacies for the next generation of startups.
            </p>
            <button className="flex items-center gap-4 border-b border-black pb-2 group hover:gap-8 transition-all duration-500">
              <span className="text-xs font-bold uppercase tracking-widest text-black">
                Learn our Process
              </span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group p-10 md:p-14 transition-all duration-700 hover:bg-zinc-50 border-zinc-100
                            ${index !== 3 ? "md:border-r" : ""} 
                            ${index >= 0 ? "border-b lg:border-b-0" : ""}`}
            >
              <div className="text-zinc-300 group-hover:text-black transition-colors duration-500 mb-12">
                {stat.icon}
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-7xl md:text-9xl font-ultra-thin tracking-tighter text-black">
                  {stat.number}
                </span>
                <span className="text-3xl font-light text-zinc-300 group-hover:text-black transition-colors">
                  {stat.suffix || "+"}
                </span>
              </div>

              <div className="mt-8">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 group-hover:text-black transition-colors">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
