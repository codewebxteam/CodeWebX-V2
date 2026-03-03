import React, { useState } from "react";
import { ArrowUpRight, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedPost = () => {
  const brandColor = "#00a63e";
  const [activeIndex, setActiveIndex] = useState(0);

  const featuredBlogs = [
    {
      title: "How we built Hello 11: Scalable mobility.",
      excerpt: "Technical architecture and real-time tracking logic behind our latest taxi service platform.",
      category: "Case Study",
      author: "CodeWebX Team",
      readTime: "8 min read",
      image: "https://images.pexels.com/photos/3860099/pexels-photo-3860099.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      title: "Jewellery ERP: Luxury inventory with Firebase.",
      excerpt: "Solving data loss risks and real-time sync issues for high-value retail businesses.",
      category: "Engineering",
      author: "Dev Lead",
      readTime: "12 min read",
      image: "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=1200"
    }
  ];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % featuredBlogs.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + featuredBlogs.length) % featuredBlogs.length);

  const currentPost = featuredBlogs[activeIndex];

  return (
    <section className="relative py-12 overflow-hidden">
      {/* 1. Background Split Transition */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black"></div>

      <div className="relative z-10 px-6 md:px-16 max-w-[1400px] mx-auto">
        {/* Main Card: Fixed Height & Layout */}
        <div className="bg-zinc-950 border border-white/10 rounded-[2.5rem] md:rounded-full shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[450px]">
          
          {/* Image Side: Aspect Ratio Fixed */}
          <div className="md:w-5/12 relative group h-[280px] md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
            <img 
              src={currentPost.image} 
              // Fixed Layout: Object-cover ensures image doesn't distort or shift layout
              className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
              alt="Featured"
            />
            
            {/* FLOATING NAVIGATION: High Visibility Controls */}
            <div className="absolute inset-0 flex items-center justify-between px-4 z-20">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:bg-[#00a63e] hover:text-white transition-all active:scale-95"
              >
                <ChevronLeft size={28} strokeWidth={3} />
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#00a63e] text-white flex items-center justify-center shadow-2xl hover:bg-white hover:text-black transition-all active:scale-95"
              >
                <ChevronRight size={28} strokeWidth={3} />
              </button>
            </div>

            {/* Category Tag */}
            <div className="absolute top-6 left-6 z-30 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-black">
              {currentPost.category}
            </div>
          </div>

          {/* Content Side: Fixed Padding & Structure */}
          <div className="md:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-zinc-950">
            <div className="flex items-center gap-6 mb-6">
               <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                  <User size={14} style={{ color: brandColor }} /> {currentPost.author}
               </div>
               <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                  <Clock size={14} /> {currentPost.readTime}
               </div>
            </div>

            {/* Fixed Title Height: Line clamp ensures layout stability */}
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[0.9] mb-6 uppercase line-clamp-2">
              {currentPost.title}
            </h2>
            
            <p className="text-zinc-500 text-sm md:text-lg font-medium mb-10 max-w-xl line-clamp-2">
              {currentPost.excerpt}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <button className="flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full hover:bg-[#00a63e] hover:text-white transition-all duration-500 group/btn">
                <span className="text-[11px] font-black uppercase tracking-widest">Read Article</span>
                <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
              
              {/* Progress Index (Visual Stability) */}
              <div className="flex flex-col items-end">
                <span className="text-zinc-800 font-black text-5xl italic leading-none">
                  0{activeIndex + 1}
                </span>
                <div className="w-12 h-1 bg-zinc-900 mt-1">
                  <div 
                    className="h-full bg-[#00a63e] transition-all duration-500" 
                    style={{ width: `${((activeIndex + 1) / featuredBlogs.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedPost;