import React, { useState, useEffect } from "react";
import { ArrowUpRight, Smartphone, Globe, Code2, ExternalLink, X, Info, ChevronRight, Plus } from "lucide-react";
import { db } from "../../firebase"; 
import { collection, onSnapshot } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

const ProjectGrid = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); 
  const [visibleCount, setVisibleCount] = useState(4); // Load 4 initially
  const brandColor = "#00a63e";

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      let fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Client-side sort by order. Fallback to createdAt or 0.
      fetchedData.sort((a, b) => {
        const orderA = a.order ?? (a.createdAt?.seconds || 0);
        const orderB = b.order ?? (b.createdAt?.seconds || 0);
        return orderA - orderB;
      });

      setProjects(fetchedData);
    });
    return () => unsubscribe();
  }, []);

  // --- PRECISE SCROLL LOCK ---
  useEffect(() => {
    if (selectedProject) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
    };
  }, [selectedProject]);

  const getIcon = (tags) => {
    const tagStr = tags?.join(" ").toLowerCase() || "";
    if (tagStr.includes("app") || tagStr.includes("mobile")) return <Smartphone size={16} />;
    if (tagStr.includes("web") || tagStr.includes("site")) return <Globe size={16} />;
    return <Code2 size={16} />;
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <section className="py-24 bg-white overflow-hidden relative text-left">
      <style dangerouslySetInnerHTML={{__html: `
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
        .modal-scroll-area {
          overflow-y: scroll !important;
          height: 100%;
          max-height: 100%;
          -webkit-overflow-scrolling: touch;
          pointer-events: auto !important; 
        }
        .modal-scroll-area::-webkit-scrollbar { width: 5px; }
        .modal-scroll-area::-webkit-scrollbar-thumb { background: #00a63e; border-radius: 10px; }
      `}} />

      {/* Header */}
      <div className="px-6 md:px-16 mb-16">
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">Our Work</span>
          <div className="h-[1px] w-20 bg-zinc-200"></div>
        </div>
        <div className="flex justify-between items-end">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black mt-4 uppercase italic leading-none">
            Featured <span className="text-zinc-300">Creations</span>
            </h2>
        </div>
      </div>

      {/* Project Grid */}
      <div className="px-6 md:px-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {projects.slice(0, visibleCount).map((item, idx) => (
            <div key={item.id} className="w-full group">
                <div className="relative aspect-[16/10] md:aspect-video rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-zinc-50 border border-zinc-100 shadow-sm hover:shadow-xl transition-shadow duration-500">
                <img src={item.imageUrl} className="w-full h-full object-cover transition-all duration-[1.5s] ease-out group-hover:scale-105" alt={item.title} />
                <button onClick={() => setSelectedProject(item)} className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white text-black flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                    <ArrowUpRight size={28} />
                    </div>
                </button>
                </div>
                <div className="mt-8 px-2 md:px-4">
                  <div className="flex justify-between items-start mb-3">
                      <h3 className="text-3xl md:text-5xl font-black text-black tracking-tighter uppercase leading-none group-hover:text-[#00a63e] transition-colors duration-500">{item.title}</h3>
                      <span className="text-[10px] font-bold text-zinc-300 mt-1">0{idx + 1}</span>
                  </div>
                  <p className="text-zinc-500 text-xs md:text-sm font-medium leading-relaxed line-clamp-2 mb-6">{item.desc}</p>
                  <div className="flex flex-wrap items-center gap-4">
                      <button onClick={() => setSelectedProject(item)} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-black hover:text-[#00a63e] transition-colors">
                      <Info size={14} strokeWidth={3} /> View Intelligence
                      </button>
                      {item.link && (
                      <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] py-3 px-6 bg-zinc-950 text-white rounded-full hover:bg-[#00a63e] transition-all">
                          Live Link <ExternalLink size={12} />
                      </a>
                      )}
                  </div>
                </div>
            </div>
            ))}
        </div>

        {/* Load More Button */}
        {visibleCount < projects.length && (
            <div className="flex justify-center mt-20">
                <button 
                onClick={handleLoadMore}
                className="group flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full active:scale-95 transition-all shadow-lg hover:bg-[#00a63e]"
                >
                <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Load More Projects</span>
                </button>
            </div>
        )}
      </div>

      {/* QUICKVIEW MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="relative bg-white w-full max-w-6xl h-full md:h-[80vh] rounded-[2rem] md:rounded-[4rem] shadow-2xl overflow-hidden flex flex-col md:flex-row z-[1010]"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-5 right-5 z-[1100] bg-black text-white p-2.5 rounded-full hover:bg-red-600 transition-all active:scale-90"><X size={20} /></button>

              {/* Left Side: Image */}
              <div className="md:w-1/2 w-full h-[35%] md:h-full shrink-0 bg-zinc-50">
                <img src={selectedProject.imageUrl} className="w-full h-full object-cover" alt={selectedProject.title} />
              </div>

              {/* Right Side: Scrollable Info */}
              <div className="md:w-1/2 w-full bg-white flex flex-col h-auto max-h-full overflow-y-auto md:overflow-hidden relative pointer-events-auto">
                <div className="modal-scroll-area flex-1 p-6 md:p-14">
                  <div className="space-y-10 pb-12">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                          <span style={{color: brandColor}}>{getIcon(selectedProject.tags)}</span>
                          <div className="h-[1px] w-12 bg-zinc-200"></div>
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Intelligence Brief</span>
                      </div>
                      <h2 className="text-3xl md:text-6xl font-black text-black tracking-tighter uppercase italic leading-[0.85]">{selectedProject.title}</h2>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00a63e]">Deployment Meta</h4>
                      <div className="flex flex-wrap gap-2">
                          {selectedProject.tags?.map(t => (
                              <span key={t} className="text-[9px] font-bold uppercase border border-zinc-100 px-4 py-2 rounded-xl bg-zinc-50">{t}</span>
                          ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00a63e]">Architecture Intelligence</h4>
                      <p className="text-zinc-700 text-sm md:text-xl font-medium leading-relaxed whitespace-pre-wrap">
                        {selectedProject.desc}
                      </p>
                    </div>

                    {selectedProject.link && (
                      <div className="pt-6">
                        <a href={selectedProject.link} target="_blank" rel="noreferrer" className="w-full bg-black text-white py-5 rounded-3xl font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-[#00a63e] shadow-2xl transition-all">
                            Explore Live Project <ExternalLink size={18} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectGrid;