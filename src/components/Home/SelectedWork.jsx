import React from "react";
import {
  ArrowUpRight,
  Monitor,
  Smartphone,
  ShoppingBag,
  Landmark,
} from "lucide-react";

const SelectedWork = () => {
  const projects = [
    {
      id: "01",
      title: "Hello 11",
      category: "Mobility & Cab App",
      year: "2026",
      icon: <Smartphone size={20} strokeWidth={1.5} />,
      image:
        "https://images.pexels.com/photos/3860099/pexels-photo-3860099.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "02",
      title: "Raj Enterprises",
      category: "Industrial Solutions",
      year: "2025",
      icon: <Landmark size={20} strokeWidth={1.5} />,
      image:
        "https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "03",
      title: "Swarnam Jewels",
      category: "Luxury E-Commerce",
      year: "2026",
      icon: <ShoppingBag size={20} strokeWidth={1.5} />,
      image:
        "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "04",
      title: "Real Estate Pro",
      category: "Property Tech",
      year: "2025",
      icon: <Monitor size={20} strokeWidth={1.5} />,
      image:
        "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  return (
    <section className="bg-black py-24 md:py-40 px-6 md:px-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
                Portfolio
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-ultra-thin leading-none tracking-tighter">
              Selected <span className="text-outline italic">Works</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm max-w-[300px] font-light leading-relaxed border-l border-zinc-800 pl-6">
            A curated selection of digital products built by{" "}
            <span className="text-white">CodeWebX Technologies</span>.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {projects.map((project) => (
            <div key={project.id} className="group flex flex-col gap-8">
              {/* Image Container */}
              <div className="relative aspect-[16/11] overflow-hidden rounded-[3rem] bg-zinc-900 border border-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-110 group-hover:rotate-1"
                />

                {/* ID Tag */}
                <div className="absolute top-8 left-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <span className="text-xs font-bold text-white tracking-widest">
                    {project.id}
                  </span>
                </div>

                {/* Arrow Icon on Hover */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                    <ArrowUpRight className="text-black" size={32} />
                  </div>
                </div>
              </div>

              {/* Text Meta Info */}
              <div className="flex flex-col gap-4 px-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-lime-500">
                    {project.icon}
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                      {project.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-zinc-700 tracking-widest">
                    {project.year}
                  </span>
                </div>

                <h3 className="text-4xl font-light text-white tracking-tight flex items-baseline gap-4 group-hover:translate-x-2 transition-transform duration-500">
                  {project.title}
                  <span className="h-[1px] flex-grow bg-zinc-900 group-hover:bg-zinc-700 transition-colors"></span>
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Explore More Button */}
        <div className="mt-32 w-full h-[1px] bg-zinc-900 relative flex justify-center items-center">
          <button className="absolute bg-black px-12 py-4 border border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">
            Explore All 7+ Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
