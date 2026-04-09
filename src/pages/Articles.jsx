import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { ArrowUpRight, Clock, Calendar, User, Search, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Articles = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBlogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-16">
      {/* Header Section */}
      <div className="max-w-[1400px] mx-auto mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="text-left">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none">
              Editorial <span className="text-[#00a63e]">Logs</span>
            </h1>
            <p className="text-zinc-500 text-xs md:text-sm font-bold uppercase tracking-[0.4em] mt-6 italic">
              Intelligence Reports & Technical Narratives
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Search Intelligence..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/5 p-4 pl-12 rounded-2xl outline-none focus:border-[#00a63e] text-white font-bold transition-all"
            />
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="animate-spin text-[#00a63e]" size={40} />
        </div>
      ) : (
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <Link 
              to={`/blog/${blog.id}`} 
              key={blog.id} 
              className="group relative bg-zinc-950 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-[#00a63e]/30 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={blog.coverImg} 
                  alt={blog.title} 
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1s]"
                />
                <div className="absolute top-6 left-6 bg-white text-black text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-xl">
                  {blog.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4">
                  <span className="flex items-center gap-1.5"><Calendar size={12}/> {blog.createdAt ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString() : "Recent"}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12}/> {blog.readTime || "5 min"}</span>
                </div>

                <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight mb-4 group-hover:text-[#00a63e] transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-zinc-500 text-sm font-medium line-clamp-2 mb-8">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                    <User size={14} className="text-[#00a63e]" /> {blog.author || "Team"}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-[#00a63e] group-hover:text-white transition-all">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredBlogs.length === 0 && (
        <div className="text-center py-40">
          <p className="text-zinc-700 font-black uppercase tracking-[0.5em] text-xs">No intelligence reports found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Articles;