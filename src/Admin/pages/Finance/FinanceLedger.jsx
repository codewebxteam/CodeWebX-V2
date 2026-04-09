import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { db } from "../../../firebase";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus, Loader2, ArrowUpCircle, ArrowDownCircle, Clock, Wallet } from "lucide-react";

const FinanceLedger = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all"); // all, credit, debit, due
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "finance"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      setTransactions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
  }, []);

  // Stats Calculation
  const stats = transactions.reduce((acc, t) => {
    acc.in += Number(t.type === 'credit' ? (t.paidAmount || 0) : 0);
    acc.out += Number(t.type === 'debit' ? (t.paidAmount || 0) : 0);
    acc.due += Number(t.dueAmount || 0);
    return acc;
  }, { in: 0, out: 0, due: 0 });

  // Filter Logic
  const filteredData = transactions.filter(t => {
    if (activeFilter === "all") return true;
    if (activeFilter === "due") return (t.dueAmount || 0) > 0;
    return t.type === activeFilter;
  });

  return (
    <AdminLayout>
      <div className="space-y-10 text-left pb-20">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter leading-none">
            Finance <span className="text-[#00a63e]">Hub</span>
          </h2>
          <button onClick={() => navigate("/admin/accounts/add")} className="bg-[#00a63e] text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase flex items-center gap-2 shadow-lg shadow-[#00a63e]/20 transition-all hover:bg-white hover:text-black">
            <Plus size={18}/> New Entry
          </button>
        </div>

        {/* --- 4 KPI CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Cash In" value={stats.in} color="#00a63e" icon={<ArrowUpCircle size={14}/>} />
          <StatCard label="Cash Out" value={stats.out} color="#ef4444" icon={<ArrowDownCircle size={14}/>} />
          <StatCard label="Market Due" value={stats.due} color="#facc15" icon={<Clock size={14}/>} />
          <StatCard label="Net Balance" value={stats.in - stats.out} color="#fff" icon={<Wallet size={14}/>} />
        </div>

        {/* --- FILTER TABS --- */}
        <div className="flex flex-wrap gap-2 bg-zinc-950 p-1.5 rounded-2xl border border-white/5 w-fit">
          {[
            { id: "all", label: "Full History" },
            { id: "credit", label: "Cash In Details" },
            { id: "debit", label: "Expense Details" },
            { id: "due", label: "Due Payments" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === tab.id ? "bg-[#00a63e] text-white shadow-lg" : "text-zinc-500 hover:text-white"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* --- DATA TABLE --- */}
        <div className="bg-zinc-950 border border-white/5 rounded-[2.5rem] overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-zinc-900/50 text-[9px] font-black uppercase text-zinc-500 border-b border-white/5 tracking-[0.2em]">
              <tr>
                <th className="px-8 py-6">Timeline / Date</th>
                <th className="px-8 py-6">Particulars / Project</th>
                <th className="px-8 py-6">Category</th>
                <th className="px-8 py-6">Paid Amount</th>
                <th className="px-8 py-6 text-center">Due Balance</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan="6" className="py-20 text-center"><Loader2 className="animate-spin text-[#00a63e] mx-auto" /></td></tr>
              ) : (
                filteredData.map(t => (
                  <tr key={t.id} className="hover:bg-white/[0.01] group transition-all">
                    <td className="px-8 py-6 text-[10px] font-black text-zinc-600 uppercase">{t.date}</td>
                    <td className="px-8 py-6">
                      <p className="text-white font-black uppercase text-xs tracking-tight">{t.title}</p>
                      <p className="text-zinc-600 text-[8px] font-black uppercase mt-1 italic opacity-60">ID: {t.id.slice(-6)}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[9px] font-black text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-lg border border-white/5 uppercase">
                        {t.category}
                      </span>
                    </td>
                    <td className={`px-8 py-6 font-black text-sm ${t.type === 'credit' ? 'text-[#00a63e]' : 'text-red-500'}`}>
                      {t.type === 'credit' ? '+' : '-'} ₹{Number(t.paidAmount || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`text-[10px] font-black px-4 py-1 rounded-full border ${Number(t.dueAmount || 0) > 0 ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-zinc-900 text-zinc-700 border-transparent'}`}>
                        ₹{Number(t.dueAmount || 0).toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
                        <button onClick={() => navigate("/admin/accounts/add", { state: { editData: t } })} className="p-2.5 bg-zinc-900 text-zinc-500 hover:text-[#00a63e] rounded-xl border border-white/5 transition-all">
                          <Pencil size={14}/>
                        </button>
                        <button onClick={async () => {if(window.confirm("Purge this record?")) await deleteDoc(doc(db,"finance",t.id))}} className="p-2.5 bg-zinc-900 text-zinc-500 hover:text-red-500 rounded-xl border border-white/5 transition-all">
                          <Trash2 size={14}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {!loading && filteredData.length === 0 && (
            <div className="py-20 text-center text-zinc-800 font-black uppercase tracking-[0.5em] text-[10px]">No Data Streams Found</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

// --- KPI CARD COMPONENT ---
const StatCard = ({ label, value, color, icon }) => (
  <div className="bg-zinc-950 border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-white/10 transition-all">
    <div className="flex items-center gap-2 mb-4">
      <div className="p-2 bg-white/5 rounded-lg" style={{ color }}>{icon}</div>
      <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">{label}</p>
    </div>
    <h3 className="text-3xl font-black tracking-tighter" style={{ color }}>
      ₹{Number(value || 0).toLocaleString('en-IN')}
    </h3>
    {/* Decorative Background Icon */}
    <div className="absolute -bottom-4 -right-4 opacity-[0.02] text-white rotate-12 group-hover:scale-110 transition-transform">
        <Wallet size={100} />
    </div>
  </div>
);

export default FinanceLedger;