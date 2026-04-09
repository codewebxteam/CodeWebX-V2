import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { db } from "../../../firebase"; 
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Send, Loader2, PlusCircle, MinusCircle } from "lucide-react";

const TransactionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.editData;

  const [formData, setFormData] = useState({
    title: "", amount: "", paidAmount: "", type: "credit", category: "Manual Entry", date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, amount: Number(formData.amount), paidAmount: Number(formData.paidAmount), dueAmount: Number(formData.amount) - Number(formData.paidAmount), updatedAt: serverTimestamp() };
      if (editData) await updateDoc(doc(db, "finance", editData.id), payload);
      else await addDoc(collection(db, "finance"), { ...payload, createdAt: serverTimestamp() });
      navigate("/admin/accounts");
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl text-left pb-20">
        <button onClick={() => navigate(-1)} className="text-zinc-500 mb-8 uppercase text-[10px] font-black flex items-center gap-2 tracking-widest"><ArrowLeft size={16}/> Go Back</button>
        <h2 className="text-5xl font-black uppercase text-white mb-12">Finance <span className="text-[#00a63e]">Matrix</span></h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2 flex gap-4">
            <button type="button" onClick={() => setFormData({...formData, type: 'credit'})} className={`flex-1 py-5 rounded-2xl font-black uppercase text-[10px] border flex items-center justify-center gap-3 transition-all ${formData.type === 'credit' ? 'bg-[#00a63e]/10 border-[#00a63e] text-[#00a63e]' : 'bg-zinc-950 border-white/5 text-zinc-600'}`}><PlusCircle size={20}/> Cash In</button>
            <button type="button" onClick={() => setFormData({...formData, type: 'debit'})} className={`flex-1 py-5 rounded-2xl font-black uppercase text-[10px] border flex items-center justify-center gap-3 transition-all ${formData.type === 'debit' ? 'bg-red-500/10 border-red-500 text-red-500' : 'bg-zinc-950 border-white/5 text-zinc-600'}`}><MinusCircle size={20}/> Cash Out</button>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase ml-2">Description</label>
            <input type="text" value={formData.title} required className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-[#00a63e]" onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase ml-2">Amount</label>
            <input type="number" value={formData.paidAmount} required className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-[#00a63e]" onChange={(e) => setFormData({...formData, amount: e.target.value, paidAmount: e.target.value})} />
          </div>
          <button type="submit" disabled={loading} className="md:col-span-2 py-6 bg-[#00a63e] text-white rounded-2xl font-black uppercase hover:bg-white hover:text-black transition-all">
            {loading ? <Loader2 className="animate-spin mx-auto" /> : "Save Transaction"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};
export default TransactionForm;