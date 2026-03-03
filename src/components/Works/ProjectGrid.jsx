import React, { useRef } from "react";
import { ArrowUpRight, Smartphone, Globe, Code2 } from "lucide-react";

const ProjectGrid = () => {
  const scrollRef = useRef(null);
  const brandColor = "#00a63e";

  const projects = [
    {
      title: "Hello 11",
      tag: "Mobility & Logistics",
      details: "A comprehensive taxi hailing and delivery system built with real-time tracking logic for urban startups.",
      image: "https://images.pexels.com/photos/4606344/pexels-photo-4606344.jpeg?auto=compress&cs=tinysrgb&w=1200",
      width: "w-[80vw] md:w-[60vw]", 
      icon: <Smartphone size={16} />
    },
    {
      title: "Jewellery ERP",
      tag: "Enterprise Solution",
      details: "Advanced inventory management and billing system for high-value retail businesses in Gorakhpur.",
      image: "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=1200",
      width: "w-[70vw] md:w-[35vw]", 
      icon: <Code2 size={16} />
    },
    {
      title: "Mice Academy",
      tag: "EdTech Platform",
      details: "A full-scale Learning Management System (LMS) designed for coaching institutes to manage classes and students.",
      image: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=1200",
      width: "w-[80vw] md:w-[55vw]",
      icon: <Globe size={16} />
    },
    {
      title: "Real Estate App",
      tag: "Property Portal",
      details: "Streamlining property discovery and management with a sleek, minimalist UI and powerful search filters.",
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200",
      width: "w-[70vw] md:w-[40vw]",
      icon: <Smartphone size={16} />
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      {/* Scrollbar Hiding Style Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />

      <div className="px-6 md:px-16 mb-16">
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">Our Work</span>
          <div className="h-[1px] w-20 bg-zinc-200"></div>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black mt-4 uppercase italic">
          Featured <span className="text-zinc-300">Creations</span>
        </h2>
      </div>

      {/* Container with scrollbar hiding properties */}
      <div 
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 md:px-16 pb-10 cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* IE/Edge */
        }}
      >
        {projects.map((item, idx) => (
          <div 
            key={idx} 
            className={`flex-shrink-0 ${item.width} group snap-center`}
          >
            <div className="relative aspect-[16/10] md:aspect-video rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-zinc-100 border border-zinc-100 shadow-sm">
              <img 
                src={item.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[1.5s] ease-out grayscale hover:grayscale-0" 
                alt={item.title} 
              />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-500">
                  <ArrowUpRight size={32} />
                </div>
              </div>

              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full flex items-center gap-2 border border-zinc-200">
                <span style={{ color: brandColor }}>{item.icon}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-black">{item.tag}</span>
              </div>
            </div>

            <div className="mt-8 px-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl md:text-5xl font-black text-black tracking-tighter uppercase group-hover:text-[#00a63e] transition-colors">
                  {item.title}
                </h3>
                <span className="text-xs font-bold text-zinc-300">0{idx + 1}</span>
              </div>
              <p className="text-zinc-500 text-sm md:text-base font-medium max-w-xl leading-relaxed">
                {item.details}
              </p>
            </div>
          </div>
        ))}

        <div className="flex-shrink-0 w-[10vw]"></div>
      </div>

      <div className="px-6 md:px-16 mt-6">
        <div className="flex items-center gap-2 text-zinc-400">
           <div className="w-10 h-[1px] bg-zinc-200"></div>
           <span className="text-[9px] font-bold uppercase tracking-widest">Swipe or scroll to explore more</span>
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;