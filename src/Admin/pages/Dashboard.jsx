import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import StatCard from "../components/Shared/StatCard";
import DataTable from "../components/Shared/DataTable";
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { motion } from "framer-motion";
import { MessageSquare, Users, ArrowUpRight, TrendingUp, Zap } from "lucide-react";

const Dashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({
    totalInquiries: 0,
    totalApplicants: 0,
    activeProjects: 0
  });

  useEffect(() => {
    // 1. Fetch Recent Inquiries for the Table (Limit to 5)
    const qInquiries = query(
      collection(db, "inquiries"), 
      orderBy("timestamp", "desc"),
      limit(5)
    );
    
    const unsubInquiries = onSnapshot(qInquiries, (snapshot) => {
      setInquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // 2. Fetch Total Counts for Stat Cards
    const unsubInqCount = onSnapshot(collection(db, "inquiries"), (snap) => {
      setStats(prev => ({ ...prev, totalInquiries: snap.size }));
    });

    const unsubAppCount = onSnapshot(collection(db, "applications"), (snap) => {
      setStats(prev => ({ ...prev, totalApplicants: snap.size }));
    });

    const unsubProjCount = onSnapshot(collection(db, "projects"), (snap) => {
      setStats(prev => ({ ...prev, activeProjects: snap.size }));
    });

    return () => {
      unsubInquiries();
      unsubInqCount();
      unsubAppCount();
      unsubProjCount();
    };
  }, []);

  // Formatting data for the DataTable component
  const tableData = inquiries.map(item => ({
    identity: (
      <div>
        <p className="font-bold text-white uppercase">{item.name}</p>
        <p className="text-[10px] text-zinc-600 lowercase">{item.contact || item.city}</p>
      </div>
    ),
    sector: (
      <span className="px-3 py-1 bg-[#00a63e]/10 text-[#00a63e] rounded-lg text-[9px] font-black uppercase border border-[#00a63e]/20">
        {item.service}
      </span>
    ),
    message: <p className="line-clamp-1 italic text-zinc-500">"{item.message || "No brief provided"}"</p>,
    action: (
      <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-700 hover:text-[#00a63e] transition-all">
        <ArrowUpRight size={18} />
      </button>
    )
  }));

  return (
    <AdminLayout>
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="space-y-12"
      >
        
        {/* WELCOME SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Command <span className="text-[#00a63e]">Center</span>
            </h1>
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.5em] mt-4 flex items-center gap-2">
              <Zap size={12} className="text-[#00a63e]" /> Intelligence Dashboard / v2.4
            </p>
          </div>
          <div className="bg-zinc-900/30 border border-white/5 px-6 py-3 rounded-2xl backdrop-blur-md">
             <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">System Status</p>
             <p className="text-[10px] font-black text-[#00a63e] uppercase tracking-widest mt-1 animate-pulse">Operational / Encrypted</p>
          </div>
        </div>

        {/* STATS TILES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            label="Live Leads" 
            value={stats.totalInquiries} 
            icon={<MessageSquare size={20} />} 
            trend="Active"
          />
          <StatCard 
            label="Talent Pool" 
            value={stats.totalApplicants} 
            icon={<Users size={20} />} 
            trend="Hiring"
          />
          <StatCard 
            label="Live Projects" 
            value={stats.activeProjects} 
            icon={<Zap size={20} />} 
            trend="Deployed"
          />
          <StatCard 
            label="Success Rate" 
            value="100%" 
            icon={<TrendingUp size={20} />} 
            trend="Optimal"
          />
        </div>

        {/* RECENT ACTIVITY TABLE */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
              Recent Intelligence Streams
            </h2>
            <button className="text-[9px] font-black uppercase tracking-widest text-[#00a63e] hover:text-white transition-colors">
              View All Signals
            </button>
          </div>
          
          <DataTable 
            columns={["Client Identity", "Sector", "Intelligence Brief", "Action"]} 
            data={tableData}
            emptyMessage="Waiting for incoming data signals..."
          />
        </div>

      </motion.div>
    </AdminLayout>
  );
};

export default Dashboard;