import React from "react";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-16 pt-32 overflow-hidden">
      {/* Background Grid Layer */}
      <div className="absolute inset-0 bg-grid-pattern z-0 opacity-60"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-end justify-between w-full h-full">
        {/* Left: Main Heading */}
        <div className="w-full lg:w-2/3 flex flex-col items-start">
          <h1 className="hero-title">
            We <br />
            <span className="text-outline">develop</span> <br />
            Apps
          </h1>

          <button className="mt-12 group flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
            Let's Talk!
            <span className="text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </button>
        </div>

        {/* Right: Stats & Branding */}
        <div className="flex flex-col gap-10 mt-20 lg:mt-0 mb-10 items-start lg:items-end">
          <div className="flex gap-4">
            {/* Project Card */}
            <div className="w-40 h-40 md:w-48 md:h-48 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-[2.5rem] p-7 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-4xl font-black italic tracking-tighter">
                  7+
                </span>
                <div className="bg-lime-400 w-6 h-6 rounded-full flex items-center justify-center text-black text-[10px] font-bold">
                  ↗
                </div>
              </div>
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest leading-tight">
                Projects <br /> Delivered
              </p>
            </div>

            {/* Year Card */}
            <div className="w-40 h-40 md:w-48 md:h-48 bg-zinc-100 rounded-[2.5rem] p-7 flex flex-col justify-between text-black">
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Since
              </span>
              <span className="text-5xl font-black tracking-tighter leading-none">
                2026
              </span>
            </div>
          </div>

          <p className="text-zinc-500 text-[13px] font-medium leading-relaxed border-l-2 border-zinc-800 pl-5 max-w-[300px] lg:text-right lg:border-l-0 lg:border-r-2 lg:pr-5">
            Modern tech partners for startups like yours.
            <br />{" "}
            <span className="text-white italic">"Pahle Kaam Firr Paisa"</span>
          </p>
        </div>
      </div>

      {/* Side Watermark Label (Visible on Desktop) */}
      <div className="absolute right-0 top-1/2 -rotate-90 origin-right hidden xl:block translate-x-20">
        <span className="text-zinc-900 text-[120px] font-black tracking-tighter opacity-40 uppercase select-none">
          CodeWebX
        </span>
      </div>
    </section>
  );
};

export default Hero;
