import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/Shared/DataTable";
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "inquiries"), orderBy("timestamp", "desc"));
    return onSnapshot(q, (s) => setInquiries(s.docs.map(d => ({
      name: d.data().name,
      contact: d.data().contact,
      service: <span className="text-[#00a63e] uppercase font-black tracking-tighter">{d.data().service}</span>,
      city: d.data().city,
      date: new Date(d.data().timestamp?.seconds * 1000).toLocaleDateString()
    }))));
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Service <span className="text-[#00a63e]">Inquiries</span></h2>
        <DataTable columns={["Client Name", "Contact", "Requested Service", "Location", "Entry Date"]} data={inquiries} />
      </div>
    </AdminLayout>
  );
};

export default Inquiries;