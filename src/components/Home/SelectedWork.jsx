import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Smartphone,
  Globe,
  ShoppingBag,
  Landmark,
  Code2
} from "lucide-react";
// Firebase Imports
import { db } from "../../firebase"; 
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";

const SelectedWork = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH LATEST 4 PROJECTS FROM ADMIN PANEL (FIREBASE) ---
  useEffect(() => {
    const q = query(
      collection(db, "projects"), 
      orderBy("createdAt", "desc"), 
      limit(4) 
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Icon Selector based on Admin Panel Tags
  const getIcon = (tags) => {
    const t = tags?.join(" ").toLowerCase() || "";
    if (t.includes("app")) return <Smartphone size={18} strokeWidth={1.5} />;
    if (t.includes("web")) return <Globe size={18} strokeWidth={1.5} />;
    if (t.includes("e-commerce")) return <ShoppingBag size={18} strokeWidth={1.5} />;
    if (t.includes("industrial")) return <Landmark size={18} strokeWidth={1.5} />;
    return <Code2 size={18} strokeWidth={1.5} />;
  };

  if (loading) return null;

  return (
    <section className="bg-black py-20 md:py-40 px-6 md:px-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">
                Portfolio
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-ultra-thin leading-none tracking-tighter text-white uppercase">
              Selected <span className="text-outline italic">Works</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-xs md:text-sm max-w-[280px] font-medium leading-relaxed border-l border-zinc-800 pl-5">
            Crafting digital products with <span className="text-white italic">brutal precision</span>.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
          {projects.map((project, idx) => (
            <div 
              key={project.id} 
              // CLICK LOGIC: Direct redirect to Live Link
              onClick={() => {
                if (project.link) {
                  window.open(project.link, "_blank");
                }
              }}
              className="group flex flex-col gap-6 cursor-pointer active:scale-[0.98] transition-transform duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] md:aspect-[16/11] overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-zinc-900 border border-white/5">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale md:grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />

                {/* ID Tag */}
                <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-black/60 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10">
                  <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                    Ref_0{idx + 1}
                  </span>
                </div>

                {/* Hover Arrow */}
                <div className="absolute inset-0 flex items-center justify-center md:bg-black/20 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-6 right-6 md:relative md:bottom-0 md:right-0 w-12 h-12 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-500">
                    <ArrowUpRight className="text-black" size={24} />
                  </div>
                </div>
              </div>

              {/* Text Meta Info (No Description) */}
              <div className="flex flex-col gap-3 px-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-lime-500">
                    {getIcon(project.tags)}
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                      {project.tags?.[0] || "Live Project"}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-700 tracking-widest font-mono">
                    {project.year || "2026"}
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl font-light text-white tracking-tight flex items-baseline gap-4">
                  {project.title}
                  <span className="h-[1px] flex-grow bg-zinc-900 group-hover:bg-lime-500/20 transition-all duration-700"></span>
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button - Redirects to All Projects Page */}
        <div className="mt-20 md:mt-32 w-full h-[1px] bg-zinc-900 relative flex justify-center items-center">
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Card click se bachane ke liye
              navigate("/allprojects");
            }}
            className="absolute bg-black px-10 py-4 border border-zinc-800 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black hover:border-white transition-all active:scale-90"
          >
            VIEW All PROJECTS
          </button>
        </div>

      </div>
    </section>
  );
};

export default SelectedWork;