import React, { useState, useEffect } from "react";
import { ArrowUpRight, Smartphone, Globe, Code2, Plus, Minus, ExternalLink } from "lucide-react";
import { db } from "../firebase"; // Firebase path check kar lena
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const ProjectGrid = () => {
  const [projects, setProjects] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // Accordion state
  const brandColor = "#00a63e";

  // --- FETCH DATA FROM FIREBASE ---
  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Icon selector based on category (optional logic)
  const getIcon = (tags) => {
    const tagStr = tags?.join(" ").toLowerCase() || "";
    if (tagStr.includes("app") || tagStr.includes("mobile")) return <Smartphone size={16} />;
    if (tagStr.includes("web")) return <Globe size={16} />;
    return <Code2 size={16} />;
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;  
          overflow: hidden;
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

      <div 
        className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 md:px-16 pb-10 cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((item, idx) => (
          <div 
            key={item.id} 
            className={`flex-shrink-0 w-[85vw] md:w-[50vw] group snap-center`}
          >
            {/* Project Image Card */}
            <div className="relative aspect-[16/10] md:aspect-video rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-zinc-100 border border-zinc-100 shadow-sm">
              <img 
                src={item.imageUrl} 
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[1.5s] ease-out grayscale hover:grayscale-0" 
                alt={item.title} 
              />
              
              <a 
                href={item.link} 
                target="_blank" 
                rel="noreferrer"
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-500">
                  <ArrowUpRight size={32} />
                </div>
              </a>

              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full flex items-center gap-2 border border-zinc-200 shadow-sm">
                <span style={{ color: brandColor }}>{getIcon(item.tags)}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-black">
                    {item.tags?.[0] || "Innovation"}
                </span>
              </div>
            </div>

            {/* Project Details */}
            <div className="mt-8 px-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl md:text-5xl font-black text-black tracking-tighter uppercase group-hover:text-[#00a63e] transition-colors leading-none">
                  {item.title}
                </h3>
                <span className="text-xs font-bold text-zinc-300">0{idx + 1}</span>
              </div>

              {/* Description with Accordion Logic */}
              <div className="relative max-w-2xl">
                <p className={`text-zinc-500 text-sm md:text-base font-medium leading-relaxed transition-all duration-500 ${expandedId === item.id ? "" : "line-clamp-3"}`}>
                  {item.desc}
                </p>
                
                <button 
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black hover:text-[#00a63e] transition-colors"
                >
                  {expandedId === item.id ? (
                    <><Minus size={14} strokeWidth={3} /> Show Less</>
                  ) : (
                    <><Plus size={14} strokeWidth={3} /> Read Intelligence</>
                  )}
                </button>
              </div>

              {/* Live Link Button */}
              {item.link && (
                <div className="mt-6">
                    <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] py-3 px-6 bg-zinc-950 text-white rounded-full hover:bg-[#00a63e] transition-all active:scale-95 shadow-xl shadow-black/10"
                    >
                        Explore Project <ExternalLink size={12} />
                    </a>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Empty space for scroll padding */}
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