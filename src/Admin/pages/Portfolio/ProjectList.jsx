import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { db } from "../../../firebase";
import { collection, onSnapshot, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { Plus, Trash2, ExternalLink, Grid, Edit3, GripVertical, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Reorder } from "framer-motion";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all without orderBy to avoid missing projects without the order field
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      let fetchedData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      
      // Client-side sort by order. Fallback to createdAt or 0.
      fetchedData.sort((a, b) => {
        const orderA = a.order ?? (a.createdAt?.seconds || 0);
        const orderB = b.order ?? (b.createdAt?.seconds || 0);
        return orderA - orderB;
      });

      setProjects(fetchedData);
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

  const handleReorder = async (newOrder) => {
    setProjects(newOrder); // Instant UI update
    
    // Batch update to Firestore
    const batch = writeBatch(db);
    newOrder.forEach((p, index) => {
      const docRef = doc(db, "projects", p.id);
      batch.update(docRef, { order: index });
    });
    
    try {
      await batch.commit();
    } catch (err) {
      console.error("Batch order update failed:", err);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-10 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Project <span className="text-[#00a63e]">Vault</span></h2>
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mt-1 italic">Drag and Drop to Reorder {projects.length} Operations</p>
          </div>
          <Link to="/admin/portfolio/add" className="bg-[#00a63e] text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:bg-white hover:text-black transition-all shadow-lg shadow-[#00a63e]/20">
            <Plus size={18} /> New Entry
          </Link>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="animate-spin text-[#00a63e]" size={40} />
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-zinc-950 border border-dashed border-white/10 rounded-[2.5rem] py-20 text-center">
            <p className="text-zinc-600 font-black uppercase tracking-widest text-xs">No records found</p>
          </div>
        ) : (
          <Reorder.Group 
            axis="y" 
            values={projects} 
            onReorder={handleReorder} 
            className="flex flex-col gap-4"
          >
            {projects.map((p) => (
              <Reorder.Item 
                key={p.id} 
                value={p} 
                className="relative cursor-grab active:cursor-grabbing"
              >
                <div className="bg-zinc-950 border border-white/5 rounded-[2rem] p-4 flex flex-col md:flex-row items-center gap-6 group hover:border-[#00a63e]/30 transition-all shadow-sm">
                  
                  {/* Drag Grip Icon */}
                  <div className="text-zinc-700 hover:text-white transition-colors px-2 hidden md:block">
                    <GripVertical size={24} />
                  </div>

                  {/* Thumbnail */}
                  <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden relative shrink-0">
                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-2 left-2 flex gap-1">
                      {p.tags?.slice(0, 2).map((t, i) => (
                        <span key={i} className="text-[6px] font-black uppercase tracking-widest bg-black/60 text-white px-2 py-1 rounded backdrop-blur-sm border border-white/10">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-grow w-full text-left">
                    <h3 className="font-black text-white uppercase text-xl tracking-tighter mb-1 leading-none">{p.title}</h3>
                    <p className="text-zinc-500 text-[11px] line-clamp-2 mb-4 font-medium leading-relaxed max-w-xl">{p.desc}</p>
                    
                    <div className="flex items-center gap-4">
                      {p.link ? (
                        <a onPointerDown={(e) => e.stopPropagation()} href={p.link} target="_blank" rel="noreferrer" className="text-[9px] font-black text-[#00a63e] uppercase tracking-widest flex items-center gap-2 hover:underline">
                          Live Preview <ExternalLink size={12}/>
                        </a>
                      ) : (
                        <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                          Internal Build <Grid size={12}/>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                    <button 
                      onPointerDown={(e) => e.stopPropagation()} 
                      onClick={() => navigate(`/admin/portfolio/add`, { state: { editData: p } })}
                      className="flex-1 md:flex-none flex justify-center items-center gap-2 p-3 px-5 bg-zinc-900 text-white rounded-xl hover:bg-white hover:text-black transition-all font-black text-[10px] uppercase"
                    >
                      <Edit3 size={14}/> Edit
                    </button>
                    <button 
                      onPointerDown={(e) => e.stopPropagation()} 
                      onClick={() => handleDelete(p.id)} 
                      className="p-3 bg-zinc-900 text-zinc-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={16}/>
                    </button>
                  </div>

                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>
    </AdminLayout>
  );
};

export default ProjectList;