import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { db } from "../../../firebase";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Loader2, Award, Users, ExternalLink } from "lucide-react";

const InternList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("interns"); // interns or certificates
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, activeTab), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [activeTab]);

  const handleDelete = async (id) => {
    if (window.confirm(`Bhai, pakka ye ${activeTab === 'interns' ? 'intern' : 'certificate'} delete karna hai?`)) {
      try {
        await deleteDoc(doc(db, activeTab, id));
      } catch (err) {
        alert("Error: " + err.message);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl text-left">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-5xl font-black uppercase text-white tracking-tighter">
              Team <span className="text-[#00a63e]">{activeTab === 'interns' ? 'Squad' : 'Alumni'}</span>
            </h2>
            {/* Category Tabs */}
            <div className="flex gap-4 mt-6">
                <button onClick={() => setActiveTab("interns")} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'interns' ? 'bg-[#00a63e] text-white' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}>
                   Active Interns
                </button>
                <button onClick={() => setActiveTab("certificates")} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'certificates' ? 'bg-[#00a63e] text-white' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}>
                   Certificates
                </button>
            </div>
          </div>
          
          <button 
            onClick={() => navigate("/admin/interns/add", { state: { type: activeTab === 'interns' ? 'intern' : 'certificate' } })}
            className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-[11px] hover:bg-[#00a63e] hover:text-white transition-all shadow-lg active:scale-95"
          >
            {activeTab === 'interns' ? <Plus size={18} /> : <Award size={18} />} 
            Add New {activeTab === 'interns' ? 'Intern' : 'Certificate'}
          </button>
        </div>

        {/* List Section */}
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="animate-spin text-[#00a63e]" size={40} />
          </div>
        ) : data.length === 0 ? (
          <div className="bg-zinc-950 border border-dashed border-white/10 rounded-[2.5rem] py-20 text-center">
            <p className="text-zinc-600 font-black uppercase tracking-widest text-xs">No records found in {activeTab}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {data.map((item) => (
              <div key={item.id} className="group bg-zinc-950 border border-white/5 p-4 md:p-6 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#00a63e]/30 transition-all">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
                    <img src={item.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{item.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[#00a63e] text-[9px] font-black uppercase tracking-widest">{item.role}</span>
                      <span className="text-zinc-700 text-[9px]">•</span>
                      <span className="text-zinc-500 text-[9px] font-bold uppercase">{activeTab === 'interns' ? item.duration : item.certId}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                  <button onClick={() => navigate("/admin/interns/add", { state: { editData: item, type: activeTab === 'interns' ? 'intern' : 'certificate' } })} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-xl font-black uppercase text-[10px] hover:bg-white hover:text-black transition-all">
                    <Pencil size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-3 bg-zinc-900 text-zinc-500 hover:bg-red-500 hover:text-white rounded-xl transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default InternList;