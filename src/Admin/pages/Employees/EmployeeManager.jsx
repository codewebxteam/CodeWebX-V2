import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { db } from "../../../firebase";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Loader2, Users2, IndianRupee, ChevronDown } from "lucide-react";

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "employees"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEmployees(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Remove this personnel?")) {
      await deleteDoc(doc(db, "employees", id));
    }
  };

  const filteredData = employees.filter(emp => filter === "all" ? true : emp.type === filter);
  const displayData = showAll ? filteredData : filteredData.slice(0, 4);

  return (
    <AdminLayout>
      <div className="space-y-8 text-left pb-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">Staff <span className="text-[#00a63e]">Matrix</span></h2>
            <div className="flex items-center gap-4 mt-2">
                <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] italic">Operational Personnel</p>
                <span className="bg-[#00a63e]/10 text-[#00a63e] text-[10px] font-black px-3 py-1 rounded-full border border-[#00a63e]/20">
                    TOTAL: {employees.length}
                </span>
            </div>
          </div>
          <button onClick={() => navigate("/admin/employees/add")} className="w-full md:w-auto bg-[#00a63e] text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all">
            <Plus size={18} /> Add New Entry
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="flex gap-2 bg-zinc-950 p-1.5 rounded-2xl border border-white/5 w-fit overflow-x-auto no-scrollbar">
          {["all", "paid", "unpaid"].map((type) => (
            <button 
              key={type}
              onClick={() => {setFilter(type); setShowAll(false);}}
              className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === type ? "bg-[#00a63e] text-white" : "text-zinc-500 hover:text-white"}`}
            >
              {type}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-[#00a63e]" size={40} /></div>
        ) : (
          <div className="space-y-4">
            <div className={`bg-zinc-950 border border-white/5 rounded-[2rem] overflow-x-auto no-scrollbar ${showAll ? 'max-h-[600px] overflow-y-auto' : ''}`}>
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/5 bg-zinc-900/30">
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Identity</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Assignment</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Payment</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayData.map((emp) => (
                    <tr key={emp.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                      <td className="p-6">
                        <p className="text-sm font-black text-white uppercase">{emp.name}</p>
                        <p className="text-[10px] text-zinc-600 font-bold tracking-tight">{emp.contact}</p>
                      </td>
                      <td className="p-6">
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider bg-zinc-900 px-3 py-1.5 rounded-lg border border-white/5">
                            {emp.role}
                        </span>
                      </td>
                      <td className="p-6">
                        {emp.type === 'paid' ? (
                            <div className="flex flex-col">
                                <span className="text-white font-black text-sm">₹{Number(emp.salary).toLocaleString('en-IN')}</span>
                                <span className="text-[8px] text-[#00a63e] font-black uppercase">Paid Basis</span>
                            </div>
                        ) : (
                            <span className="text-zinc-600 font-black text-[10px] uppercase">Non-Compensated</span>
                        )}
                      </td>
                      <td className="p-6">
                        {/* FIX: Mobile pe buttons hamesha dikhenge, Desktop pe hover pe */}
                        <div className="flex justify-end gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300">
                          <button onClick={() => navigate("/admin/employees/add", { state: { editData: emp } })} className="p-3 bg-zinc-900 rounded-xl text-zinc-400 hover:text-[#00a63e] border border-white/5">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => handleDelete(emp.id)} className="p-3 bg-zinc-900 rounded-xl text-zinc-400 hover:text-red-500 border border-white/5">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!showAll && filteredData.length > 4 && (
                <button 
                    onClick={() => setShowAll(true)}
                    className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-[10px] font-black text-zinc-500 hover:text-[#00a63e] transition-all flex items-center justify-center gap-2 uppercase tracking-[0.3em]"
                >
                    Expand Matrix <ChevronDown size={14}/>
                </button>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default EmployeeManager;