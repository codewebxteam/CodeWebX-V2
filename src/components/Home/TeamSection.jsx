import React, { useState, useEffect } from "react";
import { Plus, ArrowRight, Loader2 } from "lucide-react";
import { db } from "../../firebase"; 
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const TeamSection = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(7);
  const navigate = useNavigate();

  useEffect(() => {
    // Run once on mount to set initial visible count (3 for mobile, 7 for desktop)
    if (window.innerWidth < 768) {
      setVisibleCount(3);
    } else {
      setVisibleCount(7);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "interns"), (snapshot) => {
      const fetchedInterns = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(member => member.image && member.image.trim() !== "")
        .sort((a, b) => {
          const orderA = a.order ?? (a.createdAt?.seconds || 0);
          const orderB = b.order ?? (b.createdAt?.seconds || 0);
          return orderA - orderB;
        });
      setInterns(fetchedInterns);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const goToCareers = () => {
    navigate("/careers");
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <section className="bg-white py-12 md:py-20 px-5 md:px-16 text-black overflow-hidden select-none border-t border-zinc-100 text-left">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#00a63e] rounded-full"></div>
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">Next-Gen Talent</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase">
              Our <span className="text-zinc-200 italic font-medium">Interns</span>
            </h2>
          </div>

          <div className="lg:w-1/3 space-y-6">
            <p className="text-zinc-500 text-sm md:text-lg font-medium leading-relaxed">
              Meet the rising stars of <span className="text-black font-bold">CodeWebX</span> building the future of tech.
            </p>
            <button 
              onClick={goToCareers}
              className="group flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full active:scale-95 transition-all shadow-lg"
            >
              <Plus size={14} className="group-hover:rotate-90 transition-transform text-[#00a63e]" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Join the Squad</span>
            </button>
          </div>
        </div>

        {/* --- GRID AREA --- */}
        <div className="w-full">
          {loading ? (
            <div className="h-64 flex items-center justify-center">
               <Loader2 className="animate-spin text-[#00a63e]" size={32} />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {interns.slice(0, visibleCount).map((member) => (
                  <div
                    key={member.id}
                    className="relative w-full aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group border border-zinc-100 bg-zinc-50 shadow-sm"
                  >
                    <img
                      src={member.image}
                      className="w-full h-full object-cover grayscale md:group-hover:grayscale-0 transition-all duration-700"
                      alt={member.name}
                    />
                    
                    {/* Always visible gradient, gets darker on hover to make text pop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/90"></div>
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
                      {/* Text always visible, gets fully bright (opacity-100) on hover, always bright on mobile */}
                      <div className="opacity-100 md:opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none mb-1 block">
                          {member.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-[1px] bg-[#00a63e]"></div>
                          <span className="text-[#00a63e] text-[9px] md:text-[10px] font-black uppercase tracking-widest drop-shadow-md">
                            {member.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* APPLY FOR INTERNSHIP CARD */}
                <div 
                  onClick={goToCareers}
                  className="w-full aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center gap-4 group hover:border-[#00a63e] hover:bg-zinc-50 transition-colors cursor-pointer"
                >
                    <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-[#00a63e] transition-colors">
                      <ArrowRight size={20} className="group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-black text-center px-4">
                      Apply for Internship
                    </span>
                </div>
              </div>

              {/* LOAD MORE BUTTON */}
              {visibleCount < interns.length && (
                <div className="flex justify-center mt-12">
                  <button 
                    onClick={handleLoadMore}
                    className="border border-zinc-200 text-black px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all shadow-sm active:scale-95 flex items-center gap-2"
                  >
                    <Plus size={14} /> Load More Interns
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;