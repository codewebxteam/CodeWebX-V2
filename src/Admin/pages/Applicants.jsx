import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/Shared/DataTable";
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ExternalLink, Trash2, CheckCircle2, Circle, Mail, Phone, GraduationCap } from "lucide-react";

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "applications"), orderBy("appliedAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const formattedData = snapshot.docs.map(d => {
        const data = d.data();
        const docId = d.id;

        return [
          // 1. Candidate & Contact (Name + Email + Phone)
          <div className="flex flex-col text-left min-w-[150px]">
            <span className="font-black uppercase text-white leading-tight">{data.name}</span>
            <span className="text-[10px] text-zinc-500 flex items-center gap-1 mt-1 lowercase italic">
              <Mail size={10} /> {data.email}
            </span>
            <span className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5">
              <Phone size={10} className="text-[#00a63e]" /> {data.contact}
            </span>
          </div>,

          // 2. Role (Selected Job)
          <span className="text-[#00a63e] font-black uppercase text-[10px] tracking-widest bg-[#00a63e]/5 px-3 py-1.5 rounded border border-[#00a63e]/10">
            {data.role || "INTERN"}
          </span>,

          // 3. Background (Degree + College/Company)
          <div className="flex flex-col text-left max-w-[180px]">
            <span className="text-zinc-200 font-bold text-[11px] uppercase tracking-tighter">
              {data.degree || "N/A"}
            </span>
            <span className="text-[9px] text-zinc-500 uppercase font-black truncate">
              {data.college}
            </span>
          </div>,

          // 4. Experience Level
          <div className="flex items-center gap-2">
             <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
             <span className="text-zinc-300 font-black text-[10px] uppercase">{data.experience}</span>
          </div>,

          // 5. Resume (Direct Link)
          <a 
            href={data.resume} 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 text-[9px] font-black uppercase text-white bg-zinc-900 px-4 py-2 rounded-xl border border-white/5 hover:bg-[#00a63e] hover:border-[#00a63e] transition-all"
          >
            Review <ExternalLink size={12}/>
          </a>,

          // 6. Action (Status Toggle + Delete)
          <div className="flex items-center gap-4 justify-end">
            <button 
              onClick={() => handleStatusToggle(docId, data.status)}
              className={`transition-all ${data.status === 'reviewed' ? 'text-[#00a63e]' : 'text-zinc-700 hover:text-white'}`}
              title="Toggle Review Status"
            >
              {data.status === 'reviewed' ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </button>
            <button 
              onClick={() => handleDelete(docId)} 
              className="text-zinc-700 hover:text-red-500 transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ];
      });
      setApplicants(formattedData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, "applications", id), {
        status: currentStatus === "reviewed" ? "pending" : "reviewed"
      });
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Lead discard kar dein?")) {
      try { await deleteDoc(doc(db, "applications", id)); } 
      catch (err) { console.error(err); }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-10">
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 bg-[#00a63e] rounded-full animate-ping"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Live Talent Hunt</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">
                Talent <span className="text-[#00a63e]">Pipeline</span>
            </h2>
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">
                Total {applicants.length} applications logged in system
            </p>
          </div>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center text-zinc-800 font-black uppercase tracking-[1em] animate-pulse text-xs">
            Syncing Talent Database...
          </div>
        ) : (
          <div className="bg-zinc-950/40 border border-white/5 rounded-[2.5rem] overflow-hidden p-2 backdrop-blur-md shadow-2xl overflow-x-auto">
            <DataTable 
              columns={["Candidate Info", "Role", "Education/Background", "Exp.", "Resume", "Actions"]} 
              data={applicants} 
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Applicants;