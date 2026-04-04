import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { db } from "../../../firebase";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { Plus, Trash2, Globe, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "clients"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setClients(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Remove this client from CodeWebX network?")) {
      await deleteDoc(doc(db, "clients", id));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-10">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Network <span className="text-[#00a63e]">Hub</span></h2>
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mt-1">Managing {clients.length} Trusted Partners</p>
          </div>
          <Link to="/admin/clients/add" className="bg-[#00a63e] text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-white hover:text-black transition-all shadow-lg shadow-[#00a63e]/10">
            <Plus size={18} /> Onboard Client
          </Link>
        </div>

        {loading ? (
          <div className="h-40 flex items-center justify-center text-zinc-800 font-black uppercase tracking-[1em] animate-pulse text-[10px]">Syncing Network...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {clients.map((c) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                key={c.id} className="group relative bg-zinc-950 border border-white/5 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 hover:border-[#00a63e]/30 transition-all"
              >
                <div className="h-16 w-full flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src={c.logo} alt={c.name} className="max-h-full max-w-full object-contain opacity-40 group-hover:opacity-100" />
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-white transition-colors">{c.name}</p>
                
                <button onClick={() => handleDelete(c.id)} className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:scale-110">
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))}

            {clients.length === 0 && (
              <div className="col-span-full border-2 border-dashed border-white/5 rounded-[2rem] p-20 flex flex-col items-center gap-4">
                <Building2 size={40} className="text-zinc-800" />
                <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.5em]">No Active Partners</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ClientList;