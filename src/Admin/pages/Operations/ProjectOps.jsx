import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { db } from "../../../firebase";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Search, ChevronDown } from "lucide-react";

const ProjectOps = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "projects_ops"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredData = projects.filter(p => 
    p.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayData = showAll ? filteredData : filteredData.slice(0, 4);

  return (
    <AdminLayout>
      <div className="space-y-8 text-left pb-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-5xl font-black uppercase text-white">Project <span className="text-[#00a63e]">Ops</span></h2>
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mt-2 italic">Manage your projects here</p>
          </div>
          <button onClick={() => navigate("/admin/operations/add")} className="bg-[#00a63e] text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase flex items-center gap-3">
            <Plus size={18} /> New Project
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16}/>
          <input type="text" placeholder="Search Project..." className="w-full bg-zinc-950 border border-white/5 p-4 pl-12 rounded-2xl text-white font-bold outline-none focus:border-[#00a63e]" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="bg-zinc-950 border border-white/5 rounded-[2.5rem] overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-white/5 uppercase text-[9px] font-black text-zinc-600 bg-zinc-900/30">
                <th className="px-8 py-6">Project & Client</th>
                <th className="px-8 py-6">Total Budget</th>
                <th className="px-8 py-6">Paid</th>
                <th className="px-8 py-6">Due</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors group">
                  <td className="px-8 py-6">
                    <p className="text-white font-black uppercase text-xs">{p.projectName}</p>
                    <p className="text-zinc-600 text-[9px] font-bold mt-1">Client: {p.clientName}</p>
                  </td>
                  <td className="px-8 py-6 text-zinc-400 font-bold text-sm">₹{Number(p.totalBudget || 0).toLocaleString()}</td>
                  <td className="px-8 py-6 text-[#00a63e] font-black text-sm">₹{Number(p.advancePaid || 0).toLocaleString()}</td>
                  <td className="px-8 py-6 text-yellow-500 font-black text-sm">₹{Number(p.dueAmount || 0).toLocaleString()}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => navigate("/admin/operations/add", { state: { editData: p } })} className="p-3 bg-zinc-900 rounded-xl text-zinc-400 hover:text-[#00a63e] border border-white/5 transition-all"><Pencil size={14}/></button>
                      <button onClick={async () => {if(window.confirm("Delete this project?")) await deleteDoc(doc(db,"projects_ops",p.id))}} className="p-3 bg-zinc-900 rounded-xl text-zinc-400 hover:text-red-500 border border-white/5 transition-all"><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!showAll && filteredData.length > 4 && (
            <button onClick={() => setShowAll(true)} className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-[9px] font-black text-zinc-500 hover:text-[#00a63e] transition-all flex items-center justify-center gap-2 uppercase tracking-[0.4em]">Expand View <ChevronDown size={14}/></button>
        )}
      </div>
    </AdminLayout>
  );
};
export default ProjectOps;