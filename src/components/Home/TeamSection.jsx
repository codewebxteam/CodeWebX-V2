import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, ArrowRight, Loader2 } from "lucide-react";
import { db } from "../../firebase"; 
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Navigation ke liye

const TeamSection = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook initialize kiya
  const constraintsRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "interns"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedInterns = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setInterns(fetchedInterns);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Navigation Function
  const goToCareers = () => {
    navigate("/careers");
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
            {/* 1. JOIN THE SQUAD BUTTON FIX */}
            <button 
              onClick={goToCareers}
              className="group flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full active:scale-95 transition-all shadow-lg"
            >
              <Plus size={14} className="group-hover:rotate-90 transition-transform text-[#00a63e]" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Join the Squad</span>
            </button>
          </div>
        </div>

        {/* --- SCROLLING AREA --- */}
        <div ref={constraintsRef} className="relative w-full overflow-hidden">
          {loading ? (
            <div className="h-64 flex items-center justify-center">
               <Loader2 className="animate-spin text-[#00a63e]" size={32} />
            </div>
          ) : (
            <motion.div
              drag="x"
              dragConstraints={constraintsRef}
              dragElastic={0.1}
              className="flex gap-4 md:gap-8 py-4 w-max cursor-grab active:cursor-grabbing"
            >
              {interns.map((member) => (
                <div
                  key={member.id}
                  className="relative flex-shrink-0 w-[240px] md:w-[320px] aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group border border-zinc-100 bg-zinc-50 shadow-sm"
                >
                  <img
                    src={member.image}
                    className="w-full h-full object-cover grayscale md:group-hover:grayscale-0 transition-all duration-1000 pointer-events-none"
                    alt={member.name}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-10">
                    <span className="text-white text-xl md:text-3xl font-black uppercase tracking-tighter leading-none mb-1">
                      {member.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-[1px] bg-[#00a63e]"></div>
                      <span className="text-[#00a63e] text-[8px] md:text-[9px] font-black uppercase tracking-widest">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* 2. APPLY FOR INTERNSHIP CARD FIX */}
              <div 
                onClick={goToCareers}
                className="flex-shrink-0 w-[240px] md:w-[320px] aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center gap-4 group hover:border-[#00a63e] transition-colors cursor-pointer"
              >
                  <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-[#00a63e] transition-colors">
                    <ArrowRight size={20} className="group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-black text-center px-4">
                    Apply for Internship
                  </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;