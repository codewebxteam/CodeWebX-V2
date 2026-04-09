import React, { useState, useEffect } from "react";
import { ArrowUpRight, Calendar, Hash, ChevronRight, Plus, Loader2 } from "lucide-react";
import { db } from "../../firebase"; 
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const BlogGrid = () => {
  const brandColor = "#00a63e"; 
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBlogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredBlogs = activeTab === "All" 
    ? blogs 
    : blogs.filter(blog => blog.category === activeTab);

  const categories = ["All", ...new Set(blogs.map(b => b.category))];

  if (loading) return (
    <div className="py-20 flex justify-center bg-white">
      <Loader2 className="animate-spin text-[#00a63e]" size={32} />
    </div>
  );

  return (
    <section className="px-6 md:px-16 py-20 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8 border-b border-zinc-100 pb-12">
          <div className="max-w-xl text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#00a63e]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Knowledge Base</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-black tracking-tighter uppercase leading-[0.8]">
              Latest <br /> <span className="text-zinc-200">Insights.</span>
            </h2>
          </div>

          {/* Dynamic Filter System */}
          <div className="flex flex-wrap gap-6 md:gap-10">
            {categories.slice(0, 5).map(tab => (
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
          {filteredBlogs.slice(0, visibleCount).map((post, i) => (
            <div 
              key={post.id} 
              onClick={() => navigate(`/blog/${post.id}`)}
              className="group relative border-b border-zinc-100 py-12 md:py-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 hover:px-8 transition-all duration-700 ease-in-out cursor-pointer"
            >
              {/* Index Number */}
              <span className="hidden md:block text-sm font-black text-zinc-100 group-hover:text-[#00a63e] transition-colors">
                0{i + 1}
              </span>

              {/* Main Content Area */}
              <div className="flex-grow max-w-3xl text-left">
                <div className="flex items-center gap-6 mb-6">
                  <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#00a63e]">
                    <Hash size={12} /> {post.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    <Calendar size={12} /> {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : "Recent"}
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-black mb-6 leading-tight group-hover:italic group-hover:text-[#00a63e] transition-all uppercase">
                  {post.title}
                </h3>
                
                <p className="text-zinc-500 text-sm md:text-lg font-medium leading-relaxed max-w-2xl line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              {/* Action Side */}
              <div className="flex items-center gap-8">
                <div className="hidden lg:flex flex-col items-end opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-700">
                   <span className="text-[10px] font-black uppercase tracking-widest text-black mb-1">Read Story</span>
                   <div className="h-[1px] w-12 bg-[#00a63e]"></div>
                </div>
                
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-zinc-200 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-500 group-hover:rotate-45 shadow-sm">
                  <ArrowUpRight size={32} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredBlogs.length > visibleCount && (
          <div className="mt-16 flex justify-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="group flex items-center gap-4 bg-zinc-50 border border-zinc-100 px-10 py-5 rounded-full hover:bg-black transition-all duration-500"
            >
              <Plus size={16} className="text-[#00a63e] group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black group-hover:text-white">Load More Intelligence</span>
            </button>
          </div>
        )}
      </div>

      {/* Decorative Vertical Text */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 rotate-90 origin-bottom-right opacity-[0.03] pointer-events-none hidden xl:block">
          <span className="text-[12rem] font-black uppercase tracking-tighter text-black">JOURNAL</span>
      </div>
    </section>
  );
};

export default BlogGrid;