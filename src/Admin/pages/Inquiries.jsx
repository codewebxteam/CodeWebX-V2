import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/Shared/DataTable";
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Trash2, CheckCircle2, Circle } from "lucide-react";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "inquiries"), orderBy("timestamp", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const formattedData = snapshot.docs.map(d => {
        const docData = d.data();
        const docId = d.id;

        // Hum yahan array return kar rahe hain jo seedha DataTable ke columns mein baithega
        return [
          // Column 1: Client Name
          docData.name?.toUpperCase() || "UNKNOWN",
          
          // Column 2: City
          docData.city?.toUpperCase() || "N/A",
          
          // Column 3: Contact No.
          docData.contact || "NO NUMBER",
          
          // Column 4: Service
          docData.service?.toUpperCase() || "GENERAL",
          
          // Column 5: Date
          docData.timestamp ? new Date(docData.timestamp.seconds * 1000).toLocaleDateString('en-IN') : "RECENT",
          
          // Column 6: Action (Status + Delete)
          <div className="flex items-center gap-4 justify-end">
            <button 
              onClick={() => handleToggleConnect(docId, docData.connected)}
              className={`transition-all ${docData.connected ? 'text-[#00a63e]' : 'text-zinc-700 hover:text-white'}`}
            >
              {docData.connected ? <CheckCircle2 size={18} /> : <Circle size={18} />}
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
      setInquiries(formattedData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleToggleConnect = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, "inquiries", id), { connected: !currentStatus });
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Lead delete kar dein?")) {
      try { await deleteDoc(doc(db, "inquiries", id)); } catch (err) { console.error(err); }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-10">
        <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
                Service <span className="text-[#00a63e]">Inquiries</span>
            </h2>
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mt-2 italic">
                {inquiries.length} Potential Leads found in vault
            </p>
        </div>

        {loading ? (
          <div className="h-40 flex items-center justify-center text-zinc-800 font-black uppercase tracking-[1em] animate-pulse text-[10px]">
            Syncing Records...
          </div>
        ) : (
          <div className="bg-zinc-950/40 border border-white/5 rounded-[2rem] overflow-hidden p-2 backdrop-blur-md">
            <DataTable 
              columns={["Client Name", "City", "Contact No.", "Requested Service", "Entry Date", "Action"]} 
              data={inquiries} 
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Inquiries;