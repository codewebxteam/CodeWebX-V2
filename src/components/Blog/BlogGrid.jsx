import React, { useState } from "react";
import { ArrowUpRight, Calendar, Hash, ChevronRight, Plus } from "lucide-react";

const BlogGrid = () => {
  const brandColor = "#00a63e"; // CodeWebX Green
  const [activeTab, setActiveTab] = useState("All");

  const posts = [
    {
      title: "Optimizing React Performance for Low-End Devices",
      category: "Engineering",
      date: "Feb 24, 2026",
      desc: "How we achieved 60fps in our real estate app using memoization and lazy loading techniques for a smoother user experience."
    },
    {
      title: "The Psychology of Dark UI in Modern SaaS",
      category: "Design",
      date: "Feb 18, 2026",
      desc: "Why we chose a pitch-black theme for CodeWebX and how it affects user retention and cognitive load in professional applications."
    },
    {
      title: "Scaling Firebase for 10k+ Concurrent Users",
      category: "Backend",
      date: "Feb 10, 2026",
      desc: "Lessons learned while scaling the Jewellery ERP system during peak festive season and handling real-time data sync."
    },
    {
      title: "The Future of AI in Local Small Businesses",
      category: "Business",
      date: "Feb 02, 2026",
      desc: "How small enterprises in Gorakhpur are adopting automation to compete with national brands."
    }
  ];

  return (
    <section className="px-6 md:px-16 py-20 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8 border-b border-zinc-100 pb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#00a63e]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Knowledge Base</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-black tracking-tighter uppercase leading-[0.8]">
              Stories <br /> <span className="text-zinc-200">& Insights.</span>
            </h2>
          </div>

          {/* Filter System */}
          <div className="flex flex-wrap gap-6 md:gap-10">
            {["All", "Tech", "Design", "Business"].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`text-[11px] font-black tracking-widest uppercase transition-all relative pb-2
                  ${activeTab === tab ? "text-black" : "text-zinc-300 hover:text-zinc-500"}`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00a63e]"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Blog List */}
        <div className="flex flex-col">
          {posts.map((post, i) => (
            <div 
              key={i} 
              className="group relative border-b border-zinc-100 py-12 md:py-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 hover:px-8 transition-all duration-700 ease-in-out"
            >
              {/* Index Number (Graphical Element) */}
              <span className="hidden md:block text-sm font-black text-zinc-100 group-hover:text-[#00a63e] transition-colors">
                0{i + 1}
              </span>

              {/* Main Content Area */}
              <div className="flex-grow max-w-3xl">
                <div className="flex items-center gap-6 mb-6">
                  <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#00a63e]">
                    <Hash size={12} /> {post.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    <Calendar size={12} /> {post.date}
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-black mb-6 leading-tight group-hover:italic transition-all">
                  {post.title}
                </h3>
                
                <p className="text-zinc-500 text-sm md:text-lg font-medium leading-relaxed max-w-2xl">
                  {post.desc}
                </p>
              </div>

              {/* Action Side */}
              <div className="flex items-center gap-8">
                <div className="hidden lg:flex flex-col items-end opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-700">
                   <span className="text-[10px] font-black uppercase tracking-widest text-black mb-1">Read Story</span>
                   <div className="h-[1px] w-12 bg-[#00a63e]"></div>
                </div>
                
                <button className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-zinc-200 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-500 group-hover:rotate-45 shadow-sm">
                  <ArrowUpRight size={32} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Multi-tier Navigation System for 100+ Blogs */}
        <div className="mt-24 flex flex-col md:flex-row items-center justify-between gap-10">
            {/* 1. Numerical Pagination (For quick jump) */}
            <div className="flex items-center gap-4">
                {[1, 2, 3, "..." , 12].map((num, idx) => (
                    <button key={idx} className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-black transition-all
                        ${num === 1 ? "bg-black text-white" : "text-zinc-400 hover:text-black border border-transparent hover:border-zinc-200"}`}>
                        {num}
                    </button>
                ))}
            </div>

            {/* 2. Load More / Next Visual */}
            <div className="flex items-center gap-8">
                <button className="group flex items-center gap-4 bg-zinc-50 px-10 py-5 rounded-full hover:bg-black transition-all duration-500">
                    <Plus size={16} className="text-[#00a63e] group-hover:rotate-180 transition-transform duration-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black group-hover:text-white">Load More Stories</span>
                </button>

                <button className="w-14 h-14 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-300 hover:text-black hover:border-black transition-all">
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>

      </div>

      {/* Side Decorative Vertical Text */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 rotate-90 origin-bottom-right opacity-[0.03] pointer-events-none hidden xl:block">
          <span className="text-[12rem] font-black uppercase tracking-tighter text-black">JOURNAL</span>
      </div>
    </section>
  );
};

export default BlogGrid;