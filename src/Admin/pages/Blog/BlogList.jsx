import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { db } from "../../../firebase";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { Plus, Trash2, Edit3, Calendar, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (s) => setBlogs(s.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, []);

  const handleDelete = async (id) => {
    if(window.confirm("Archive this intelligence report (Delete Blog)?")) {
      try {
        await deleteDoc(doc(db, "blogs", id));
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-10">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Editorial <span className="text-[#00a63e]">Logs</span></h2>
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mt-1 italic">CodeWebX Thought Leadership</p>
          </div>
          <Link to="/admin/blogs/add" className="bg-[#00a63e] text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:bg-white hover:text-black transition-all shadow-xl shadow-[#00a63e]/20">
            <Plus size={18} /> Write New Post
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-zinc-950 border border-white/5 p-6 rounded-[2.5rem] flex items-center gap-6 group hover:border-[#00a63e]/30 transition-all duration-500">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                <img src={blog.coverImg} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" alt="Cover" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-xl uppercase tracking-tight text-white mb-2 group-hover:text-[#00a63e] transition-colors">{blog.title}</h3>
                <div className="flex items-center gap-6 text-zinc-600 text-[10px] font-black uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Calendar size={14} className="text-zinc-700"/> {blog.createdAt ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString() : "Just Now"}</span>
                  <span className="bg-[#00a63e]/10 text-[#00a63e] px-3 py-1 rounded-full border border-[#00a63e]/10">{blog.category}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => navigate("/admin/blogs/add", { state: { editData: blog } })}
                  className="p-4 bg-zinc-900 text-zinc-400 rounded-2xl hover:bg-white hover:text-black transition-all"
                  title="Edit Post"
                >
                  <Edit3 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(blog.id)} 
                  className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                  title="Delete Post"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {blogs.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                <p className="text-zinc-700 font-black uppercase tracking-[0.5em] text-xs">No editorial logs found</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default BlogList;