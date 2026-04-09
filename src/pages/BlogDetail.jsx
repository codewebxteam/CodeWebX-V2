import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase"; 
import { doc, getDoc } from "firebase/firestore";
import { ArrowLeft, Clock, Loader2 } from "lucide-react";

const BlogDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBlog(docSnap.data());
      }
      setLoading(false);
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center bg-black"><Loader2 className="animate-spin text-[#00a63e]" size={40} /></div>;
  if (!blog) return <div className="text-white text-center py-20">Blog Not Found!</div>;

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-16 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-zinc-500 hover:text-[#00a63e] transition-colors text-xs font-bold uppercase tracking-widest">
          <ArrowLeft size={18} /> Back to Articles
        </button>
        
        {/* Banner Image */}
        <div className="w-full h-[250px] md:h-[450px] overflow-hidden rounded-[2rem] mb-10 border border-white/10 shadow-2xl">
          <img src={blog.coverImg} className="w-full h-full object-cover" alt={blog.title} />
        </div>
        
        {/* Meta Info */}
        <div className="flex items-center flex-wrap gap-4 mb-6 text-[#00a63e] font-black uppercase tracking-widest text-[10px]">
          <span className="bg-[#00a63e]/10 px-3 py-1 rounded-md">{blog.category}</span>
          <span className="text-zinc-700 hidden md:block">•</span>
          <span className="flex items-center gap-2 text-zinc-500">
            <Clock size={14}/> {blog.readTime || '5 min read'}
          </span>
        </div>

        {/* Title - break-words added to prevent overflow */}
        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-10 italic break-words">
          {blog.title}
        </h1>
        
        {/* Content Body - break-words and prose-p styling */}
        <div 
          className="prose prose-invert prose-green max-w-none 
          text-zinc-300 text-lg leading-relaxed 
          break-words overflow-hidden
          prose-p:mb-6 prose-p:break-words
          prose-headings:text-white prose-headings:italic
          prose-strong:text-[#00a63e]"
          dangerouslySetInnerHTML={{ __html: blog.content }} 
        />
      </div>
    </div>
  );
};

export default BlogDetail;