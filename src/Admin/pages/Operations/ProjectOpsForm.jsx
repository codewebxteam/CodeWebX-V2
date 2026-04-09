import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { db } from "../../../firebase"; 
import { collection, addDoc, updateDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Send, Loader2 } from "lucide-react";

const ProjectOpsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.editData;

  const [formData, setFormData] = useState({
    projectName: "", clientName: "", totalBudget: "", advancePaid: "", deadline: "", status: "Planning"
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const total = Number(formData.totalBudget);
      const paidNow = Number(formData.advancePaid);
      const due = total - paidNow;

      const payload = { ...formData, totalBudget: total, advancePaid: paidNow, dueAmount: due, updatedAt: serverTimestamp() };

      if (editData) {
        // Edit Logic
        const oldDoc = await getDoc(doc(db, "projects_ops", editData.id));
        const oldPaid = Number(oldDoc.data()?.advancePaid || 0);
        await updateDoc(doc(db, "projects_ops", editData.id), payload);

        // Agar paisa update hua hai toh Finance mein entry
        if (paidNow > oldPaid) {
          const diff = paidNow - oldPaid;
          await addDoc(collection(db, "finance"), {
            title: `Payment Update: ${formData.projectName}`,
            amount: diff, paidAmount: diff, dueAmount: 0,
            type: "credit", category: "Project Payment",
            date: new Date().toISOString().split('T')[0],
            createdAt: serverTimestamp()
          });
        }
      } else {
        // New Onboard Logic
        const docRef = await addDoc(collection(db, "projects_ops"), { ...payload, createdAt: serverTimestamp() });
        await addDoc(collection(db, "finance"), {
          title: `New Project: ${formData.projectName}`,
          amount: total, paidAmount: paidNow, dueAmount: due,
          type: "credit", category: "Project Payment",
          date: new Date().toISOString().split('T')[0],
          createdAt: serverTimestamp()
        });
      }
      navigate("/admin/operations");
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl text-left">
        <button onClick={() => navigate(-1)} className="text-zinc-500 mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><ArrowLeft size={16} /> Back</button>
        <h2 className="text-5xl font-black uppercase text-white mb-12">{editData ? 'Edit' : 'Onboard'} <span className="text-[#00a63e]">Project</span></h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase ml-2">Project Title</label>
            <input type="text" value={formData.projectName} required className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-[#00a63e]" onChange={(e) => setFormData({...formData, projectName: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase ml-2">Total Budget (Deal)</label>
            <input type="number" value={formData.totalBudget} required className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-[#00a63e]" onChange={(e) => setFormData({...formData, totalBudget: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase ml-2">Amount Received</label>
            <input type="number" value={formData.advancePaid} required className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-[#00a63e]" onChange={(e) => setFormData({...formData, advancePaid: e.target.value})} />
          </div>
          <button type="submit" disabled={loading} className="md:col-span-2 py-6 bg-[#00a63e] text-white rounded-2xl font-black uppercase hover:bg-white hover:text-black transition-all">
            {loading ? <Loader2 className="animate-spin mx-auto" /> : "Authorize & Sync Project"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};
export default ProjectOpsForm;