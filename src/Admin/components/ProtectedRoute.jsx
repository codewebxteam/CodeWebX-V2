import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth"; // npm install react-firebase-hooks

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <span className="text-[10px] font-black text-[#00a63e] animate-pulse tracking-[1em]">CWX / AUTHENTICATING...</span>
    </div>
  );

  if (!user) return <Navigate to="/admin/login" />;

  return children;
};

export default ProtectedRoute;