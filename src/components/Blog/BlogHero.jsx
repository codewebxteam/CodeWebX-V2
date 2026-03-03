import React from "react";

const BlogHero = () => {
  const brandColor = "#00a63e"; // Aapka Brand Color

  return (
    <section className="relative pt-32 md:pt-44 pb-12 md:pb-20 px-6 md:px-16 bg-black overflow-hidden">
      {/* Background Accent */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 blur-[150px] rounded-full opacity-10 pointer-events-none"
        style={{ backgroundColor: brandColor }}
      ></div>

      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[1px] w-12" style={{ backgroundColor: brandColor }}></span>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-500">
              CodeWebX Journal
            </span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.85] uppercase">
            Stories <br />
            <span className="text-outline-thin opacity-40">&</span> Systems.
          </h1>
        </div>

        <div className="max-w-[280px]">
          <p className="text-zinc-500 text-sm font-light leading-relaxed border-l border-zinc-800 pl-6">
            Explore our thoughts on <span className="text-white">Minimalist Engineering</span>, startup growth, and the future of web.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;