// src/Admin/pages/Applicants.jsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/Shared/DataTable";
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { ExternalLink } from "lucide-react";

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "applications"), orderBy("appliedAt", "desc"));
    return onSnapshot(q, (s) => setApplicants(s.docs.map(d => ({
      name: d.data().name,
      role: <span className="text-[#00a63e] font-black uppercase tracking-tighter">{d.data().role}</span>,
      exp: d.data().experience,
      resume: <a href={d.data().resume} target="_blank" className="flex items-center gap-2 text-blue-400 hover:underline">View <ExternalLink size={12}/></a>,
      date: new Date(d.data().appliedAt?.seconds * 1000).toLocaleDateString()
    }))));
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Talent <span className="text-[#00a63e]">Pipeline</span></h2>
        <DataTable columns={["Candidate", "Role", "Experience", "Resume", "Applied On"]} data={applicants} />
      </div>
    </AdminLayout>
  );
};

export default Applicants;