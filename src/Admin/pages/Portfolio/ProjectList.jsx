import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { db } from "../../../firebase";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { Plus, Trash2, ExternalLink, Box, Grid, Edit3 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("CRITICAL: Remove this deployment from live site?")) {
      try {
        await deleteDoc(doc(db, "projects", id));
      } catch (err) {
        alert("Action Denied: Error deleting project.");
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Project <span className="text-[#00a63e]">Vault</span></h2>
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mt-1 italic">Managing {projects.length} Operations</p>
          </div>
          <Link to="/admin/portfolio/add" className="bg-[#00a63e] text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:bg-white hover:text-black transition-all shadow-lg shadow-[#00a63e]/20">
            <Plus size={18} /> New Entry
          </Link>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center text-zinc-800 font-black uppercase tracking-[1em] animate-pulse">Syncing Vault...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <motion.div 
                layout
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                key={p.id} className="bg-zinc-950 border border-white/5 rounded-[2.5rem] overflow-hidden group relative flex flex-col"
              >
                <div className="h-52 overflow-hidden relative">
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  
                  {/* Action Buttons Top Right */}
                  <div className="absolute top-5 right-5 flex gap-2">
                    <button 
                      onClick={() => navigate(`/admin/portfolio/add`, { state: { editData: p } })}
                      className="p-3 bg-black/50 text-[#00a63e] rounded-xl hover:bg-[#00a63e] hover:text-white transition-all backdrop-blur-md border border-white/5 shadow-2xl"
                    >
                      <Edit3 size={16}/>
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id)} 
                      className="p-3 bg-black/50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all backdrop-blur-md border border-white/5 shadow-2xl"
                    >
                      <Trash2 size={16}/>
                    </button>
                  </div>
                </div>

                <div className="p-8 flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags?.slice(0, 2).map((t, i) => (
                      <span key={i} className="text-[7px] font-black uppercase tracking-widest bg-white/5 text-zinc-400 px-3 py-1.5 rounded-lg border border-white/5">{t}</span>
                    ))}
                  </div>
                  <h3 className="font-black text-white uppercase text-xl tracking-tighter mb-2 leading-none">{p.title}</h3>
                  <p className="text-zinc-600 text-[11px] line-clamp-2 mb-6 font-medium leading-relaxed">{p.desc}</p>
                  
                  <div className="pt-6 border-t border-white/5 flex justify-between items-center mt-auto">
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noreferrer" className="text-[9px] font-black text-[#00a63e] uppercase tracking-widest flex items-center gap-2 hover:underline">
                        Live Preview <ExternalLink size={12}/>
                      </a>
                    ) : (
                      <span className="text-[9px] font-black text-zinc-800 uppercase tracking-widest">Internal Build</span>
                    )}
                    <Grid size={14} className="text-zinc-800" />
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