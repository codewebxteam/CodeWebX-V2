import React from "react";
import { ArrowUpRight, Calendar, Hash } from "lucide-react";

const BlogGrid = () => {
  const brandColor = "#00a63e";

  const posts = [
    {
      title: "Optimizing React Performance for Low-End Devices",
      category: "Engineering",
      date: "Feb 24, 2026",
      desc: "How we achieved 60fps in our real estate app using memoization and lazy loading."
    },
    {
      title: "The Psychology of Dark UI in Modern SaaS",
      category: "Design",
      date: "Feb 18, 2026",
      desc: "Why we chose a pitch-black theme for CodeWebX and how it affects user retention."
    },
    {
      title: "Scaling Firebase for 10k+ Concurrent Users",
      category: "Backend",
      date: "Feb 10, 2026",
      desc: "Lessons learned while scaling the Jewellery ERP system during peak festive season."
    }
  ];

  return (
    <section className="px-6 md:px-16 py-12 md:py-20 bg-black">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Grid Header */}
        <div className="flex items-center justify-between mb-12 border-b border-zinc-900 pb-8">
            <h2 className="text-2xl font-bold tracking-tighter uppercase">
                Latest <span style={{ color: brandColor }}>Articles</span>
            </h2>
            <div className="hidden md:flex gap-4">
                {["All", "Tech", "Design", "Business"].map(tab => (
                    <button key={tab} className="text-[10px] font-black text-zinc-500 hover:text-white tracking-widest uppercase transition-colors">
                        {tab}
                    </button>
                ))}
            </div>
        </div>

        {/* Flexible List Layout (To avoid empty grid gaps) */}
        <div className="flex flex-col gap-4 md:gap-6">
          {posts.map((post, i) => (
            <div 
              key={i} 
              className="group relative bg-zinc-900/10 border border-white/5 rounded-[2rem] p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 hover:bg-zinc-900/30 transition-all duration-500 overflow-hidden"
            >
              {/* Left Side: Category & Title */}
              <div className="flex-grow max-w-2xl">
                <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest" style={{ color: brandColor }}>
                        <Hash size={10} /> {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
                        <Calendar size={10} /> {post.date}
                    </span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-4 group-hover:translate-x-2 transition-transform duration-500">
                    {post.title}
                </h3>
                <p className="text-zinc-500 text-sm md:text-base font-light line-clamp-2">
                    {post.desc}
                </p>
              </div>

              {/* Right Side: Action Button */}
              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-zinc-900 pt-6 md:pt-0">
                <span className="text-[10px] font-bold text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                    Read Article
                </span>
                <button 
                  className="w-14 h-14 rounded-full border border-zinc-800 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:rotate-45"
                >
                  <ArrowUpRight size={24} />
                </button>
              </div>

              {/* Background Accent Strip */}
              <div 
                className="absolute left-0 top-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: brandColor }}
              ></div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-16 flex justify-center">
            <button className="px-10 py-4 border border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                Load More Stories
            </button>
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;