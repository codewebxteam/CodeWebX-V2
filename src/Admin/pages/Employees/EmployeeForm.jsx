import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Send, Loader2, Users2, IndianRupee, Phone, Briefcase, CreditCard } from "lucide-react";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.editData;

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    type: "paid", // New Field: paid or unpaid
    salary: "",
    contact: "",
    status: "active"
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { 
        ...formData, 
        // Agar unpaid hai toh salary 0 save hogi
        salary: formData.type === "paid" ? Number(formData.salary) : 0,
        updatedAt: serverTimestamp() 
      };

      if (editData) {
        await updateDoc(doc(db, "employees", editData.id), payload);
      } else {
        await addDoc(collection(db, "employees"), { ...payload, createdAt: serverTimestamp() });
      }
      navigate("/admin/employees");
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl text-left">
        <button onClick={() => navigate(-1)} className="text-zinc-500 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase mb-8">
          <ArrowLeft size={16} /> Back to Matrix
        </button>

        <h2 className="text-5xl font-black uppercase text-white mb-12">
          {editData ? "Update" : "Onboard"} <span className="text-[#00a63e]">Personnel</span>
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-500 ml-2 flex items-center gap-2"><Users2 size={12}/> Full Identity</label>
            <input type="text" value={formData.name} required placeholder="Name" className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-[#00a63e]" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-500 ml-2 flex items-center gap-2"><Briefcase size={12}/> Role</label>
            <input type="text" value={formData.role} required placeholder="Role" className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-[#00a63e]" 
              onChange={(e) => setFormData({...formData, role: e.target.value})} />
          </div>

          {/* Type Selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-500 ml-2 flex items-center gap-2"><CreditCard size={12}/> Payment Type</label>
            <select value={formData.type} className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-[#00a63e]"
              onChange={(e) => setFormData({...formData, type: e.target.value})}>
              <option value="paid">Paid Employee</option>
              <option value="unpaid">Unpaid / Intern</option>
            </select>
          </div>

          {/* Conditional Salary Field */}
          {formData.type === "paid" && (
            <div className="space-y-2 animate-in fade-in duration-500">
              <label className="text-[10px] font-black uppercase text-zinc-500 ml-2 flex items-center gap-2"><IndianRupee size={12}/> Monthly Salary</label>
              <input type="number" value={formData.salary} required={formData.type === "paid"} placeholder="Amount" className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-[#00a63e]" 
                onChange={(e) => setFormData({...formData, salary: e.target.value})} />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-500 ml-2 flex items-center gap-2"><Phone size={12}/> Contact</label>
            <input type="text" value={formData.contact} required placeholder="Contact Number" className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-[#00a63e]" 
              onChange={(e) => setFormData({...formData, contact: e.target.value})} />
          </div>

          <div className="md:col-span-2 pt-4">
            <button type="submit" disabled={loading} className="w-full py-6 bg-[#00a63e] text-white rounded-2xl font-black uppercase text-[11px] flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all">
              {loading ? <Loader2 className="animate-spin" /> : <>{editData ? "Authorize Update" : "Deploy Staff Entry"} <Send size={16} /></>}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EmployeeForm;