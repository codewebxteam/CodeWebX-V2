import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-dashed border-[#00a63e] rounded-full animate-spin"></div>
      </div>
    );
  }

  // Agar user login nahi hai, toh login page pe bhej do
  if (!user) {
    return <Navigate to="/admin/login" />;
  }

  // Agar login hai, toh sirf 'children' (Dashboard/Applicants etc.) dikhao
  return children;
};

export default ProtectedRoute;