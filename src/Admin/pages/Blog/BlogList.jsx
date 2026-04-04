import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { db } from "../../../firebase";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { Plus, Trash2, Edit3, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (s) => setBlogs(s.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, []);

  const handleDelete = async (id) => {
    if(window.confirm("Archive this intelligence report (Delete Blog)?")) {
      await deleteDoc(doc(db, "blogs", id));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-10">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Editorial <span className="text-[#00a63e]">Logs</span></h2>
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mt-1">CodeWebX Thought Leadership</p>
          </div>
          <Link to="/admin/blogs/add" className="bg-[#00a63e] text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-white hover:text-black transition-all">
            <Plus size={18} /> Write New Post
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-zinc-950 border border-white/5 p-6 rounded-[2rem] flex items-center gap-6 group hover:border-[#00a63e]/30 transition-all">
              <img src={blog.coverImg} className="w-24 h-24 rounded-2xl object-cover opacity-60 group-hover:opacity-100 transition-all" />
              <div className="flex-1">
                <h3 className="font-bold text-lg uppercase tracking-tight text-white mb-1">{blog.title}</h3>
                <div className="flex items-center gap-4 text-zinc-600 text-[9px] font-black uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(blog.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                  <span className="text-[#00a63e]">{blog.category}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleDelete(blog.id)} className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default BlogList;