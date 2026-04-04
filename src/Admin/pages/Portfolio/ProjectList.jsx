import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { db } from "../../../firebase";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { Plus, Trash2, ExternalLink, Box } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This project will be removed from the live website.")) {
      try {
        await deleteDoc(doc(db, "projects", id));
      } catch (err) {
        alert("Error deleting project.");
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Project <span className="text-[#00a63e]">Vault</span></h2>
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mt-1 italic">Managing {projects.length} Live Deployments</p>
          </div>
          <Link to="/admin/portfolio/add" className="bg-[#00a63e] text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:bg-white hover:text-black transition-all shadow-lg shadow-[#00a63e]/20">
            <Plus size={18} /> Add New Project
          </Link>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center text-zinc-800 font-black uppercase tracking-[1em] animate-pulse">Synchronizing...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                key={p.id} className="bg-zinc-950 border border-white/5 rounded-[2.5rem] overflow-hidden group relative"
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-50 group-hover:opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  <button onClick={() => handleDelete(p.id)} className="absolute top-6 right-6 p-3 bg-black/50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all backdrop-blur-md border border-white/5">
                    <Trash2 size={18}/>
                  </button>
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags?.map((t, i) => (
                      <span key={i} className="text-[7px] font-black uppercase tracking-widest bg-[#00a63e]/10 text-[#00a63e] px-3 py-1 rounded-full border border-[#00a63e]/20">{t}</span>
                    ))}
                  </div>
                  <h3 className="font-black text-white uppercase text-lg tracking-tight mb-2 leading-none">{p.title}</h3>
                  <p className="text-zinc-500 text-xs line-clamp-2 mb-6 font-medium leading-relaxed">{p.desc}</p>
                  <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                    <a href={p.link} target="_blank" rel="noreferrer" className="text-[9px] font-black text-white uppercase tracking-widest flex items-center gap-2 hover:text-[#00a63e] transition-colors">
                      Live Preview <ExternalLink size={14}/>
                    </a>
                    <Box size={16} className="text-zinc-800" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ProjectList;