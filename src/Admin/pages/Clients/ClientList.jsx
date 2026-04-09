import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { db } from "../../../firebase";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { Plus, Trash2, Edit3, Building2, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Note: Collection name should match your Firebase (testimonials or clients)
    // Humne pichle form mein 'testimonials' use kiya tha
    const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setClients(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("CRITICAL: Remove this client feedback from live site?")) {
      try {
        await deleteDoc(doc(db, "testimonials", id));
      } catch (err) {
        alert("Error deleting client data.");
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
              Network <span className="text-[#00a63e]">Hub</span>
            </h2>
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mt-1 italic">
              Managing {clients.length} Trusted Partners & Feedbacks
            </p>
          </div>
          <Link 
            to="/admin/clients/add" 
            className="bg-[#00a63e] text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:bg-white hover:text-black transition-all shadow-lg shadow-[#00a63e]/20"
          >
            <Plus size={18} /> Onboard Client
          </Link>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center text-zinc-800 font-black uppercase tracking-[1em] animate-pulse text-xs">
            Synchronizing Network...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {clients.map((c) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={c.id} 
                  className="group relative bg-zinc-950 border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col hover:border-[#00a63e]/30 transition-all duration-500"
                >
                  {/* Top: Project Image Preview */}
                  <div className="h-44 relative overflow-hidden bg-zinc-900">
                    <img 
                      src={c.projectImage} 
                      alt={c.projectTitle} 
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
                    
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button 
                        onClick={() => navigate(`/admin/clients/add`, { state: { editData: c } })}
                        className="p-3 bg-black/60 text-[#00a63e] rounded-xl hover:bg-[#00a63e] hover:text-white transition-all backdrop-blur-md border border-white/5"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(c.id)} 
                        className="p-3 bg-black/60 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all backdrop-blur-md border border-white/5"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Client Avatar Overlay */}
                    <div className="absolute -bottom-6 left-8 w-16 h-16 rounded-2xl border-4 border-zinc-950 overflow-hidden bg-zinc-800 shadow-2xl">
                        <img src={c.clientImage} className="w-full h-full object-cover" alt={c.clientName} />
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-8 pt-10">
                    <div className="mb-4">
                        <h3 className="text-white font-black uppercase text-lg tracking-tight leading-none mb-1 group-hover:text-[#00a63e] transition-colors">
                            {c.clientName}
                        </h3>
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 italic">
                            {c.projectTitle}
                        </p>
                    </div>

                    <p className="text-zinc-500 text-xs line-clamp-3 font-medium leading-relaxed mb-6 italic">
                        "{c.experience}"
                    </p>

                    <div className="pt-6 border-t border-white/5 flex justify-between items-center mt-auto">
                        {c.liveLink ? (
                            <a href={c.liveLink} target="_blank" rel="noreferrer" className="text-[9px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2 hover:text-[#00a63e] transition-colors">
                                Live Build <ExternalLink size={12}/>
                            </a>
                        ) : (
                            <span className="text-[9px] font-black text-zinc-800 uppercase tracking-widest italic">No Live Link</span>
                        )}
                        <Building2 size={16} className="text-zinc-900" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {clients.length === 0 && (
              <div className="col-span-full border-2 border-dashed border-white/5 rounded-[3rem] py-24 flex flex-col items-center gap-6">
                <div className="p-6 bg-white/5 rounded-full">
                    <Building2 size={48} className="text-zinc-800" />
                </div>
                <div className="text-center">
                    <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.5em]">No Active Partners Found</p>
                    <p className="text-zinc-800 text-[10px] uppercase font-bold mt-2 italic">Onboard your first client to show results</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ClientList;