import React, { useState } from "react";
import { ArrowUpRight, Clock, User, Tag, ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedPost = () => {
  const brandColor = "#00a63e";
  const [activeIndex, setActiveIndex] = useState(0);

  // Dynamic Blog Data Array
  const featuredBlogs = [
    {
      title: "How we built Hello 11: A scalable mobility solution for startups.",
      excerpt: "Exploring the technical architecture, real-time tracking logic, and minimalist UI decisions behind our latest taxi service platform.",
      category: "Case Study",
      author: "CodeWebX Team",
      date: "March 2026",
      readTime: "8 min read",
      image: "https://images.pexels.com/photos/3860099/pexels-photo-3860099.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      title: "Jewellery ERP: Managing luxury inventory with Firebase.",
      excerpt: "How we solved the data loss risks and real-time synchronization issues for high-value retail businesses in Gorakhpur.",
      category: "Engineering",
      author: "Development Lead",
      date: "Feb 2026",
      readTime: "12 min read",
      image: "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      title: "The minimalist approach to React & Tailwind CSS.",
      excerpt: "Why we believe 'less is more' when it comes to performance and developer experience in modern web apps.",
      category: "Design",
      author: "UI Specialist",
      date: "Jan 2026",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200"
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % featuredBlogs.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + featuredBlogs.length) % featuredBlogs.length);
  };

  const currentPost = featuredBlogs[activeIndex];

  return (
    <section className="px-6 md:px-16 py-8 md:py-12 bg-black">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header with Navigation Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: brandColor }}></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Editor's Choice</span>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button 
              onClick={handlePrev} 
              className="p-3 border border-white/5 rounded-full hover:bg-white hover:text-black transition-all group"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={handleNext} 
              className="p-3 border border-white/5 rounded-full hover:bg-white hover:text-black transition-all group"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Main Featured Container */}
        <div key={activeIndex} className="group relative flex flex-col lg:flex-row bg-zinc-900/20 border border-white/5 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden hover:bg-zinc-900/30 transition-all duration-700 animate-in fade-in slide-in-from-right-5">
          
          {/* Image Side */}
          <div className="lg:w-1/2 aspect-[16/10] lg:aspect-auto overflow-hidden relative">
            <img 
              src={currentPost.image} 
              alt={currentPost.title} 
              className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            {/* Category Badge */}
            <div className="absolute top-8 left-8 bg-white text-black px-6 py-2 rounded-full flex items-center gap-2 shadow-2xl">
              <Tag size={12} style={{ color: brandColor }} />
              <span className="text-[10px] font-black uppercase tracking-widest">{currentPost.category}</span>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2 p-8 md:p-16 lg:p-20 flex flex-col justify-between">
            <div>
              {/* Meta Info */}
              <div className="flex items-center gap-6 mb-8 text-zinc-500">
                <div className="flex items-center gap-2">
                  <User size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{currentPost.author}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Clock size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{currentPost.readTime}</span>
                </div>
              </div>

              {/* Title & Excerpt */}
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-8">
                {currentPost.title}
              </h2>
              <p className="text-zinc-500 text-base md:text-lg font-light leading-relaxed mb-12">
                {currentPost.excerpt}
              </p>
            </div>

            {/* Action Area */}
            <div className="flex items-center justify-between border-t border-white/5 pt-10">
              <button className="flex items-center gap-4 group/btn">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-white border-b border-zinc-800 pb-1 group-hover/btn:border-[#00a63e] transition-all">
                  Read Full Story
                </span>
                <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                  <ArrowUpRight size={18} />
                </div>
              </button>
              
              {/* Pagination Info */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-black text-zinc-700 uppercase">
                    0{activeIndex + 1} / 0{featuredBlogs.length}
                </span>
              </div>
            </div>
          </div>

          {/* Background Accent Strip */}
          <div 
            className="absolute left-0 top-0 w-1.5 h-full opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ backgroundColor: brandColor }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPost;