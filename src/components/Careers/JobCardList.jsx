import React from "react";
import { ArrowUpRight, Zap, Clock, Globe, ChevronRight } from "lucide-react";

const JobCardList = () => {
  const brandColor = "#00a63e";

  const jobs = [
    { 
      title: "Frontend Intern", 
      tech: ["React", "Tailwind"], 
      type: "Hybrid",
      urgency: "Immediate",
      category: "Development"
    },
    { 
      title: "Backend Developer", 
      tech: ["Node.js", "MongoDB"], 
      type: "Remote",
      urgency: "New",
      category: "Engineering"
    },
    { 
      title: "Digital Marketing", 
      tech: ["Meta Ads", "SEO"], 
      type: "Hybrid",
      urgency: "Hot",
      category: "Marketing"
    }
  ];

  return (
    <section id="openings" className="px-6 md:px-16 py-12 md:py-24 bg-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Header with Job Count */}
        <div className="flex items-center justify-between mb-12 border-b border-zinc-900 pb-8">
            <h2 className="text-2xl font-bold tracking-tighter">
                Open <span style={{ color: brandColor }}>Positions</span>
            </h2>
            <span className="px-4 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                {jobs.length} Opportunities
            </span>
        </div>

        {/* Flexible Vertical List (Eliminates Empty Grid Spaces) */}
        <div className="flex flex-col gap-4">
          {jobs.map((job, i) => (
            <div 
              key={i} 
              className="group relative bg-zinc-900/10 border border-white/5 rounded-3xl p-6 md:p-8 hover:bg-zinc-900/30 transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden"
            >
              {/* Left Side: Title & Category */}
              <div className="relative z-10 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: brandColor }}>
                        {job.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase flex items-center gap-1">
                        <Zap size={10} /> {job.urgency}
                    </span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white group-hover:translate-x-2 transition-transform duration-500">
                    {job.title}
                </h3>
              </div>

              {/* Middle: Tech Stack (Visible on Desktop) */}
              <div className="hidden lg:flex items-center gap-2">
                {job.tech.map((t, idx) => (
                    <span key={idx} className="px-4 py-1.5 bg-black/40 border border-white/5 rounded-full text-[10px] font-medium text-zinc-400">
                        {t}
                    </span>
                ))}
              </div>

              {/* Right Side: Meta & Action */}
              <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 border-zinc-900 pt-4 md:pt-0">
                <div className="flex flex-col items-start md:items-end">
                    <div className="flex items-center gap-2 text-zinc-500">
                        <Globe size={12} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{job.type}</span>
                    </div>
                </div>
                
                <button 
                  className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500"
                >
                  <ArrowUpRight size={20} />
                </button>
              </div>

              {/* Background Highlight Effect */}
              <div 
                className="absolute left-0 top-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: brandColor }}
              ></div>
            </div>
          ))}
        </div>

        {/* Dynamic Empty State Support */}
        {jobs.length === 0 && (
            <div className="py-20 text-center border border-dashed border-zinc-800 rounded-[3rem]">
                <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase">
                    No active openings right now. Check back soon!
                </p>
            </div>
        )}
      </div>
    </section>
  );
};

export default JobCardList;