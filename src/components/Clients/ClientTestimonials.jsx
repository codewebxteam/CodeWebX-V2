import React, { useState, useEffect } from "react";
import { Quote, Star, ExternalLink } from "lucide-react";
import { db } from "../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const ClientTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const brandColor = "#00a63e";

  useEffect(() => {
    const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTestimonials(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden border-t border-zinc-100">
      <style dangerouslySetInnerHTML={{__html: `.no-scrollbar::-webkit-scrollbar { display: none; }`}} />

      {/* Header Section */}
      <div className="px-6 md:px-16 mb-12 md:mb-16">
        <div className="flex items-center gap-4">
          <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">Client Feedback</span>
          <div className="h-[1px] w-16 md:w-20 bg-zinc-200"></div>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black mt-4 uppercase italic leading-none">
          Trusted <span className="text-zinc-300">Voices</span>
        </h2>
      </div>

      {/* Horizontal Slider */}
      <div className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 md:px-16 pb-12 cursor-grab active:cursor-grabbing">
        {testimonials.map((item, idx) => (
          <div key={item.id} className={`flex-shrink-0 ${item.width || 'w-[85vw] md:w-[60vw]'} group snap-center relative`}>
            
            {/* --- SPLIT VISUAL CARD (Original Design) --- */}
            <div className="relative aspect-[16/10] md:aspect-video rounded-[2.5rem] md:rounded-[5rem] overflow-hidden border border-zinc-100 shadow-sm grid grid-cols-2 bg-zinc-50">
              
              {/* Left Side: Client Image */}
              <div className="relative h-full overflow-hidden border-r border-zinc-100">
                  <img src={item.clientImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt={item.clientName} />
                  <div className="absolute inset-0 bg-black/5"></div>
              </div>

              {/* Right Side: Project Image */}
              <div className="relative h-full overflow-hidden">
                  <img src={item.projectImage} className="w-full h-full object-cover opacity-80 md:opacity-60 grayscale hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" alt={item.projectTitle} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* --- SMALLER FLOATING ELEMENTS --- */}
              
              {/* Quote Icon - Smaller & Tight to corner */}
              <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
                   <div className="bg-white/95 backdrop-blur-md p-2 md:p-3 rounded-full border border-zinc-200 shadow-sm">
                      <Quote size={12} style={{ color: brandColor }} fill={brandColor} className="rotate-180 md:w-4 md:h-4" />
                   </div>
              </div>
              
              {/* Rating - Smaller & Minimalist */}
              <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20 flex items-center gap-0.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={7} fill={brandColor} stroke={brandColor} className="md:w-2 md:h-2" />
                  ))}
              </div>
            </div>

            {/* Info Section */}
            <div className="mt-8 md:mt-10 px-2 md:px-6">
              <div className="flex justify-between items-start mb-4 text-left">
                <div>
                    <h3 className="text-2xl md:text-5xl font-black text-black tracking-tighter uppercase leading-none group-hover:text-[#00a63e] transition-colors">
                      {item.clientName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">{item.projectTitle}</p>
                        
                        {item.liveLink && (
                            <a 
                                href={item.liveLink} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="flex items-center gap-1 text-[9px] font-black uppercase text-[#00a63e] border-b border-[#00a63e]/20 pb-0.5"
                            >
                                View Project <ExternalLink size={10} />
                            </a>
                        )}
                    </div>
                </div>
                <span className="text-xs font-bold text-zinc-300">0{idx + 1}</span>
              </div>
              
              <p className="text-zinc-700 text-sm md:text-xl font-medium max-w-2xl leading-relaxed italic text-left opacity-90">
                "{item.experience}"
              </p>
            </div>
          </div>
        ))}
        <div className="flex-shrink-0 w-[5vw]"></div>
      </div>
    </section>
  );
};

export default ClientTestimonials;