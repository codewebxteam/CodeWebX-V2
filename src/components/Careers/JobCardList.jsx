 import React from "react";
import { ArrowUpRight, Briefcase, Zap, Clock, Code2 } from "lucide-react";

const JobCardList = () => {
  const brandColor = "#00a63e";

  const jobs = [
    { 
      title: "Full-Stack Intern", 
      tech: ["React", "Firebase", "Tailwind"], 
      type: "Hybrid",
      duration: "3-6 Months",
      urgency: "Immediate"
    },
    { 
      title: "UI/UX Designer", 
      tech: ["Figma", "Adobe XD"], 
      type: "Office",
      duration: "6 Months",
      urgency: "Hot"
    },
    { 
        title: "Backend Developer", 
        tech: ["Node.js", "Express", "MongoDB"], 
        type: "Remote",
        duration: "Full-time",
        urgency: "New"
      },
  ];

  return (
    <section className="px-6 md:px-16 py-12 md:py-20 bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {jobs.map((job, i) => (
          <div 
            key={i} 
            className="group relative p-8 md:p-10 bg-zinc-900/20 border border-white/5 rounded-[2.5rem] hover:bg-zinc-900/40 transition-all duration-700 overflow-hidden"
          >
            {/* Top Row: Icon & Action */}
            <div className="flex justify-between items-start mb-12">
              <div className="relative">
                <div className="p-4 bg-black/40 border border-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                  <Briefcase size={22} style={{ color: brandColor }} />
                </div>
                {/* Status Dot */}
                <div 
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-black animate-pulse"
                    style={{ backgroundColor: brandColor }}
                ></div>
              </div>

              <button className="flex items-center justify-center w-12 h-12 rounded-full border border-zinc-800 text-zinc-500 group-hover:border-white group-hover:text-white transition-all duration-500 group-hover:rotate-45">
                <ArrowUpRight size={20} />
              </button>
            </div>

            {/* Middle: Job Content */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 flex items-center gap-1">
                        <Zap size={10} style={{ color: brandColor }} /> {job.urgency}
                    </span>
                    <span className="h-[1px] w-4 bg-zinc-800"></span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 flex items-center gap-1">
                        <Clock size={10} /> {job.duration}
                    </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold tracking-tighter text-white leading-none">
                    {job.title}
                </h3>

                <div className="flex flex-wrap gap-2 pt-4">
                    {job.tech.map((t, idx) => (
                        <span key={idx} className="px-3 py-1 bg-zinc-900/80 border border-white/5 rounded-lg text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            {/* Bottom: Type Label */}
            <div className="mt-12 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Code2 size={14} className="text-zinc-700" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                        {job.type}
                    </span>
                </div>
                <span className="text-[10px] font-bold text-[#00a63e] opacity-0 group-hover:opacity-100 transition-opacity">
                    Apply Now
                </span>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute -bottom-10 -right-10 text-zinc-900/20 group-hover:text-[#00a63e]/5 transition-colors duration-700">
                <Briefcase size={180} strokeWidth={1} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JobCardList;