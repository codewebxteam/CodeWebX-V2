import React, { useState, useEffect } from "react";
import { ArrowUpRight, Clock, User, ChevronLeft, ChevronRight, Loader2, LayoutGrid } from "lucide-react";
import { db } from "../../firebase";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const FeaturedPost = () => {
  const brandColor = "#00a63e";
  const navigate = useNavigate(); 
  const [blogs, setBlogs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBlogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % blogs.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + blogs.length) % blogs.length);

  if (loading) return (
    <div className="h-[450px] flex items-center justify-center bg-black">
      <Loader2 className="animate-spin text-[#00a63e]" size={40} />
    </div>
  );

  if (blogs.length === 0) return null;

  const currentPost = blogs[activeIndex];

  return (
    <section className="relative py-12 overflow-hidden bg-black">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black"></div>

      <div className="relative z-10 px-6 md:px-16 max-w-[1400px] mx-auto">
        <div className="bg-zinc-950 border border-white/10 rounded-[2.5rem] md:rounded-full shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[450px]">
          
          {/* Image Side */}
          <div className="md:w-5/12 relative group h-[280px] md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-white/5 bg-zinc-900">
            <img 
              src={currentPost.coverImg} 
              className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out cursor-pointer"
              alt={currentPost.title}
              onClick={() => navigate(`/blog/${currentPost.id}`)} 
            />
            
            <div className="absolute inset-0 flex items-center justify-between px-4 z-20 pointer-events-none">
              <button onClick={handlePrev} className="pointer-events-auto w-10 h-10 md:w-14 md:h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:bg-[#00a63e] hover:text-white transition-all active:scale-90">
                <ChevronLeft size={24} strokeWidth={3} />
              </button>
              <button onClick={handleNext} className="pointer-events-auto w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#00a63e] text-white flex items-center justify-center shadow-2xl hover:bg-white hover:text-black transition-all active:scale-90">
                <ChevronRight size={24} strokeWidth={3} />
              </button>
            </div>

            <div className="absolute top-8 left-10 md:left-20 z-30 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-black shadow-xl">
              {currentPost.category}
            </div>
          </div>

          {/* Content Side */}
          <div className="md:w-7/12 p-8 md:p-16 md:pr-24 flex flex-col justify-center bg-zinc-950 text-left relative">
            <div className="flex items-center gap-6 mb-6">
               <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                  <User size={14} style={{ color: brandColor }} /> {currentPost.author || "CodeWebX Team"}
               </div>
               <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                  <Clock size={14} /> {currentPost.readTime || "5 min read"}
               </div>
            </div>

            <h2 
              className="text-2xl md:text-5xl font-black text-white tracking-tighter leading-[0.9] mb-6 uppercase line-clamp-2 italic cursor-pointer hover:text-[#00a63e] transition-colors"
              onClick={() => navigate(`/blog/${currentPost.id}`)}
            >
              {currentPost.title}
            </h2>
            
            <p className="text-zinc-500 text-sm md:text-lg font-medium mb-10 max-w-xl line-clamp-2">
              {currentPost.excerpt}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <button 
                onClick={() => navigate(`/blog/${currentPost.id}`)}
                className="flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full hover:bg-[#00a63e] hover:text-white transition-all duration-500 group/btn shadow-lg active:scale-95"
              >
                <span className="text-[11px] font-black uppercase tracking-widest">Read Article</span>
                <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
              
              <div className="flex items-center gap-8">
                {/* Explore All Button - Link to Articles.jsx */}
                <button 
                  onClick={() => navigate('/blog')} 
                  className="hidden md:flex flex-col items-center gap-1 group/all"
                >
                  <LayoutGrid size={20} className="text-zinc-700 group-hover/all:text-[#00a63e] transition-colors" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-700 group-hover/all:text-white transition-colors">All Posts</span>
                </button>

                <div className="flex flex-col items-end md:mr-10">
                  <span className="text-zinc-800 font-black text-5xl italic leading-none">
                    0{activeIndex + 1}
                  </span>
                  <div className="w-12 h-1 bg-zinc-900 mt-1">
                    <div 
                      className="h-full bg-[#00a63e] transition-all duration-500" 
                      style={{ width: `${((activeIndex + 1) / blogs.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPost;