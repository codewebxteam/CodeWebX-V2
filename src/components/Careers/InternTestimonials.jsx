import React, { useState } from "react";
import { Quote, Sparkles, MoveRight, ChevronRight, ChevronLeft } from "lucide-react";

const InternTestimonials = () => {
  const brandColor = "#00a63e";
  const [activeIndex, setActiveIndex] = useState(0);

  // Dynamic Reviews for Left Side
  const dynamicReviews = [
    {
      name: "Rahul Verma",
      role: "React Intern",
      project: "Hello 11 (Taxi App)",
      text: "CodeWebX mein live traffic handle karna sikhna mere liye ek life-changing experience tha. Real scalability aur performance optimization ki value samjhi.",
      img: "https://i.pravatar.cc/150?u=rahul"
    },
    {
      name: "Sandeep Gupta",
      role: "UI/UX Intern",
      project: "Graphic Portfolio",
      text: "Minimalist design aur user psychology ka perfect mix sikhne ko mila yahan ke studio culture mein. Architecture level design par focus karna seekha.",
      img: "https://i.pravatar.cc/150?u=sandeep"
    },
    {
        name: "Vikram Raj",
        role: "Full Stack Intern",
        project: "ID Verification",
        text: "Database optimization aur security features par focus karna mere liye naya tha. Mentors ne complex things ko easy bna diya.",
        img: "https://i.pravatar.cc/150?u=vikram"
    }
  ];

  // Static Reviews for Right Side
  const staticReviews = [
    {
      name: "Anjali Singh",
      role: "Backend Intern",
      text: "Complex Inventory management logic ko break karna challenging tha par mazaa aaya.",
      img: "https://i.pravatar.cc/150?u=anjali"
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % dynamicReviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + dynamicReviews.length) % dynamicReviews.length);
  };

  return (
    <section className="relative py-12 md:py-32 bg-black overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        
        {/* Header Section: Reduced Margins for Mobile */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-20 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <Sparkles size={16} style={{ color: brandColor }} />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">
                Wall of Fame
              </span>
            </div>
            <h2 className="text-4xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] uppercase">
              The <span className="text-outline-thin opacity-40">Intern</span> <br />
              <span className="italic font-serif" style={{ color: brandColor }}>Legacy.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-xs md:text-lg max-w-[300px] font-light leading-relaxed border-l border-zinc-800 pl-6">
            Stories from our past builders in <span className="text-white">Gorakhpur.</span>
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
          
          {/* LEFT: Dynamic Testimonial Container */}
          <div className="md:col-span-7 group relative p-8 md:p-16 bg-zinc-900/20 border border-white/5 rounded-[2rem] md:rounded-[3rem] flex flex-col justify-between overflow-hidden min-h-[400px] md:min-h-[500px]">
            
            <div className="relative z-10">
              <Quote size={40} style={{ color: brandColor }} className="opacity-20 mb-8 md:mb-10" />
              
              {/* Animated Content Switcher */}
              <div key={activeIndex} className="animate-in fade-in slide-in-from-right-4 duration-500">
                <p className="text-xl md:text-4xl font-light text-white leading-tight mb-12 md:mb-16 italic">
                  "{dynamicReviews[activeIndex].text}"
                </p>
                
                <div className="flex items-center justify-between border-t border-white/5 pt-8 md:pt-10">
                    <div className="flex items-center gap-4 md:gap-5">
                        <img src={dynamicReviews[activeIndex].img} alt={dynamicReviews[activeIndex].name} className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white/10 object-cover" />
                        <div>
                            <h4 className="text-lg md:text-xl font-bold text-white">{dynamicReviews[activeIndex].name}</h4>
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{dynamicReviews[activeIndex].role}</p>
                        </div>
                    </div>
                    <div className="text-right hidden sm:block">
                        <span className="text-[9px] font-black text-zinc-600 uppercase tracking-tighter">Project</span>
                        <p className="text-xs font-bold" style={{ color: brandColor }}>{dynamicReviews[activeIndex].project}</p>
                    </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows inside Left Part */}
            <div className="absolute top-8 right-8 flex gap-2 z-20">
              <button onClick={handlePrev} className="p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                <ChevronLeft size={18} />
              </button>
              <button onClick={handleNext} className="p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* RIGHT: Static Reviews & CTA */}
          <div className="md:col-span-5 flex flex-col gap-4 md:gap-8">
            
            {/* 1 Static Review Card */}
            {staticReviews.map((item, i) => (
                <div key={i} className="group p-6 md:p-10 bg-zinc-900/20 border border-white/5 rounded-[2rem] hover:bg-zinc-900/40 transition-all duration-700 relative overflow-hidden">
                    <p className="text-base md:text-xl font-light text-zinc-300 leading-relaxed mb-8 italic">
                        "{item.text}"
                    </p>
                    <div className="flex items-center gap-4">
                        <img src={item.img} alt={item.name} className="w-10 h-10 rounded-full grayscale group-hover:grayscale-0 transition-all object-cover" />
                        <div>
                            <h4 className="text-sm font-bold text-white">{item.name}</h4>
                            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{item.role}</p>
                        </div>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-[2px] bg-[#00a63e] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            ))}

            {/* Final CTA Card */}
            <div className="flex-grow p-8 md:p-10 bg-[#00a63e] rounded-[2rem] flex flex-col justify-between group cursor-pointer active:scale-95 transition-all min-h-[200px]">
                <h4 className="text-2xl font-black text-white uppercase leading-none tracking-tighter">
                    Ready to <br /> write yours?
                </h4>
                <div className="flex justify-between items-end mt-4">
                    <span className="text-[9px] font-black text-black/60 uppercase tracking-widest">Join the squad</span>
                    <MoveRight className="text-white group-hover:translate-x-2 transition-transform" />
                </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default InternTestimonials;