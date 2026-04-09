import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  MessageSquare, 
  ArrowUpRight, 
  TrendingUp, 
  Zap, 
  UserPlus,
  Loader2,
  ShieldCheck
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalInquiries: 0,
    totalApplicants: 0,
    activeProjects: 0,
    totalInterns: 0
  });

  useEffect(() => {
    // 1. RECENT INQUIRIES (Last 3 Records)
    const qInquiries = query(
      collection(db, "inquiries"), 
      orderBy("timestamp", "desc"),
      limit(3)
    );
    
    const unsubInquiries = onSnapshot(qInquiries, (snapshot) => {
      setInquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    // 2. LIVE STATS COUNTERS (Separate Listeners for Accuracy)
    
    // Inquiries Sync
    const unsubInqCount = onSnapshot(collection(db, "inquiries"), (snap) => {
      setStats(prev => ({ ...prev, totalInquiries: snap.size }));
    });

    // Applications Sync
    const unsubAppCount = onSnapshot(collection(db, "applications"), (snap) => {
      setStats(prev => ({ ...prev, totalApplicants: snap.size }));
    });

    // Projects Sync
    const unsubProjCount = onSnapshot(collection(db, "projects"), (snap) => {
      setStats(prev => ({ ...prev, activeProjects: snap.size }));
    });

    // Interns Sync (Fixing the 11 vs 2 issue)
    const unsubInternCount = onSnapshot(collection(db, "interns"), (snap) => {
      setStats(prev => ({ ...prev, totalInterns: snap.size }));
    });

    // Clean up all listeners when component unmounts
    return () => {
      unsubInquiries();
      unsubInqCount();
      unsubAppCount();
      unsubProjCount();
      unsubInternCount();
    };
  }, []);

  // Date Formatter Helper
  const formatDate = (ts) => {
    if (!ts) return "N/A";
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <AdminLayout>
      {/* Scrollbar Hider for Mobile View */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="space-y-10 md:space-y-12 text-left"
      >
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white text-left">
              Command <span className="text-[#00a63e]">Center</span>
            </h1>
            <p className="text-zinc-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] mt-4 flex items-center gap-2 text-left">
              <Zap size={12} className="text-[#00a63e]" /> Intelligence Dashboard / v2.4
            </p>
          </div>
          <div className="bg-zinc-950 border border-white/5 px-5 py-3 rounded-2xl backdrop-blur-md hidden sm:block">
             <p className="text-[10px] font-black text-[#00a63e] uppercase tracking-widest animate-pulse flex items-center gap-2">
               <ShieldCheck size={12} /> Operational / Encrypted
             </p>
          </div>
        </div>

        {/* --- STATS TILES (Fixed Live Mapping) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatTile 
            label="Live Leads" 
            value={stats.totalInquiries} 
            icon={<MessageSquare size={20} />} 
            trend="Active" 
            onClick={() => navigate("/admin/inquiries")} 
          />
          <StatTile 
            label="Live Interns" 
            value={stats.totalInterns} 
            icon={<UserPlus size={20} />} 
            trend="Active Squad" 
            onClick={() => navigate("/admin/interns")} 
          />
          <StatTile 
            label="Live Projects" 
            value={stats.activeProjects} 
            icon={<Zap size={20} />} 
            trend="Deployed" 
            onClick={() => navigate("/admin/portfolio")} 
          />
          <StatTile 
            label="Success Rate" 
            value="100%" 
            icon={<TrendingUp size={20} />} 
            trend="Optimal" 
          />
        </div>

        {/* --- RECENT ACTIVITY TABLE (Top 3 Records Only) --- */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
              Latest 03 Intelligence Streams
            </h2>
            <button 
              onClick={() => navigate("/admin/inquiries")}
              className="text-[9px] font-black uppercase tracking-widest text-[#00a63e] hover:text-white transition-colors underline underline-offset-4"
            >
              Access Full Archive
            </button>
          </div>
          
          <div className="bg-zinc-950/50 border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-white/5 uppercase text-[9px] font-black text-zinc-600 tracking-widest bg-zinc-900/20">
                  <th className="px-8 py-6">Client Name</th>
                  <th className="px-8 py-6">City</th>
                  <th className="px-8 py-6">Contact No.</th>
                  <th className="px-8 py-6">Requested Service</th>
                  <th className="px-8 py-6">Entry Date</th>
                  <th className="px-8 py-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="animate-spin text-[#00a63e]" size={30} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Syncing Intelligence...</span>
                      </div>
                    </td>
                  </tr>
                ) : inquiries.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-20 text-center text-zinc-600 uppercase text-[9px] font-bold tracking-widest">
                      No incoming data signals detected
                    </td>
                  </tr>
                ) : (
                  inquiries.map((item) => (
                    <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-6 font-black text-white uppercase text-xs tracking-tight whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-8 py-6 font-black text-zinc-400 uppercase text-[10px]">
                        {item.city || "Remote"}
                      </td>
                      <td className="px-8 py-6 font-black text-zinc-400 text-[10px]">
                        {item.contact || item.phone || "Private"}
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-[#00a63e]/10 text-[#00a63e] rounded-lg text-[9px] font-black uppercase border border-[#00a63e]/20">
                          {item.service || "Dev Operation"}
                        </span>
                      </td>
                      <td className="px-8 py-6 font-black text-zinc-500 text-[10px]">
                        {formatDate(item.timestamp)}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => navigate("/admin/inquiries")}
                          className="p-2.5 bg-zinc-900 text-zinc-600 rounded-xl hover:text-[#00a63e] hover:bg-zinc-800 transition-all shadow-lg active:scale-95"
                        >
                          <ArrowUpRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </motion.div>
    </AdminLayout>
  );
};

// --- Stat Tile Sub-Component ---
const StatTile = ({ label, value, icon, trend, onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-zinc-950/60 border border-white/5 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden group transition-all duration-500 ${onClick ? 'cursor-pointer hover:border-[#00a63e]/40' : ''}`}
  >
    <div className="relative z-10 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-[#00a63e]/10 group-hover:text-[#00a63e] transition-all">
          {icon}
        </div>
        <span className="px-3 py-1 bg-zinc-900 text-zinc-500 rounded-lg text-[8px] font-black uppercase tracking-widest border border-white/5 group-hover:text-[#00a63e] group-hover:border-[#00a63e]/20">
          {trend}
        </span>
      </div>
      <div className="text-left">
        <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-1">{value}</h3>
        <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">{label}</p>
      </div>
    </div>
    <div className="absolute -bottom-4 -right-4 text-white/[0.02] group-hover:text-[#00a63e]/5 transition-all duration-700 pointer-events-none">
       {React.cloneElement(icon, { size: 100 })}
    </div>
  </div>
);

export default Dashboard;