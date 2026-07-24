import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { db } from "../../../firebase";
import { collection, onSnapshot, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Loader2, GripVertical } from "lucide-react";
import { Reorder } from "framer-motion";

const InternList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    // Fetch all interns without Firestore orderBy so we don't miss legacy records
    const unsubscribe = onSnapshot(collection(db, "interns"), (snapshot) => {
      let fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Client-side sort by order. Fallback to createdAt or 0 if missing.
      fetchedData.sort((a, b) => {
        const orderA = a.order ?? (a.createdAt?.seconds || 0);
        const orderB = b.order ?? (b.createdAt?.seconds || 0);
        return orderA - orderB;
      });

      setData(fetchedData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(`Bhai, pakka ye intern delete karna hai?`)) {
      try {
        await deleteDoc(doc(db, "interns", id));
      } catch (err) {
        alert("Error: " + err.message);
      }
    }
  };

  const handleReorder = async (newOrder) => {
    setData(newOrder); // Instant UI update
    
    // Batch update to Firestore
    const batch = writeBatch(db);
    newOrder.forEach((item, index) => {
      const docRef = doc(db, "interns", item.id);
      batch.update(docRef, { order: index });
    });
    
    try {
      await batch.commit();
    } catch (err) {
      console.error("Batch order update failed:", err);
      // Wait for next snapshot to fix UI if it fails
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl text-left">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-5xl font-black uppercase text-white tracking-tighter">
              Team <span className="text-[#00a63e]">Squad</span>
            </h2>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-2">
              Drag and Drop to Reorder Interns
            </p>
          </div>
          
          <button 
            onClick={() => navigate("/admin/interns/add")}
            className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-[11px] hover:bg-[#00a63e] hover:text-white transition-all shadow-lg active:scale-95"
          >
            <Plus size={18} /> Add New Intern
          </button>
        </div>

        {/* List Section */}
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="animate-spin text-[#00a63e]" size={40} />
          </div>
        ) : data.length === 0 ? (
          <div className="bg-zinc-950 border border-dashed border-white/10 rounded-[2.5rem] py-20 text-center">
            <p className="text-zinc-600 font-black uppercase tracking-widest text-xs">No records found</p>
          </div>
        ) : (
          <Reorder.Group 
            axis="y" 
            values={data} 
            onReorder={handleReorder} 
            className="flex flex-col gap-4"
          >
            {data.map((item) => (
              <Reorder.Item 
                key={item.id} 
                value={item} 
                className="relative cursor-grab active:cursor-grabbing"
              >
                <div className="group bg-zinc-950 border border-white/5 p-4 md:p-6 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#00a63e]/30 transition-all shadow-sm hover:shadow-lg">
                  <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                    
                    {/* Drag Grip Icon */}
                    <div className="text-zinc-700 hover:text-white transition-colors cursor-grab active:cursor-grabbing px-2 hidden md:block">
                      <GripVertical size={24} />
                    </div>

                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                      {item.image ? (
                        <img src={item.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[8px] font-mono text-zinc-600">NO_PIC</div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tight">{item.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[#00a63e] text-[9px] font-black uppercase tracking-widest">{item.role}</span>
                        <span className="text-zinc-700 text-[9px]">•</span>
                        <span className="text-zinc-500 text-[9px] font-bold uppercase">{item.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                    <button 
                      onPointerDown={(e) => e.stopPropagation()} // Prevent dragging when clicking buttons
                      onClick={() => navigate("/admin/interns/add", { state: { editData: item } })} 
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-xl font-black uppercase text-[10px] hover:bg-white hover:text-black transition-all"
                    >
                      <Pencil size={14} /> Edit
                    </button>
                    <button 
                      onPointerDown={(e) => e.stopPropagation()} 
                      onClick={() => handleDelete(item.id)} 
                      className="p-3 bg-zinc-900 text-zinc-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>
    </AdminLayout>
  );
};

export default InternList;