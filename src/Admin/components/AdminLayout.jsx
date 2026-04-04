import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Briefcase, 
  Image as ImageIcon, 
  Newspaper, 
  LogOut, 
  ShieldCheck, 
  ExternalLink 
} from "lucide-react";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    if (window.confirm("Terminate secure session?")) {
      await signOut(auth);
      navigate("/admin/login");
    }
  };

  // --- MENU ITEMS UPDATED WITH NEW SECTIONS ---
  const menuItems = [
    { name: "DASHBOARD", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "INQUIRIES", path: "/admin/inquiries", icon: <MessageSquare size={18} /> },
    { name: "APPLICANTS", path: "/admin/applicants", icon: <Users size={18} /> },
    { name: "PORTFOLIO", path: "/admin/portfolio", icon: <Briefcase size={18} /> },
    { name: "CLIENTS", path: "/admin/clients", icon: <ImageIcon size={18} /> },
    { name: "BLOGS", path: "/admin/blogs", icon: <Newspaper size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex text-white font-sans selection:bg-[#00a63e] selection:text-white">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 border-r border-white/5 bg-zinc-950/50 hidden lg:flex flex-col p-6 sticky top-0 h-screen">
        
        {/* BRAND LOGO AREA */}
        <div className="mb-10 flex items-center gap-3 px-2">
          <div className="p-2 bg-[#00a63e]/10 rounded-xl text-[#00a63e] shadow-[0_0_20px_rgba(0,166,62,0.1)]">
            <ShieldCheck size={22} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-[13px] tracking-tighter uppercase leading-none">
              CODEWEBX <span className="text-zinc-600 italic">HQ</span>
            </span>
            <span className="text-[7px] font-bold text-[#00a63e] tracking-[0.3em] mt-1 uppercase">Admin Protocol</span>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-[10px] font-black tracking-widest transition-all duration-300 group ${
                  isActive 
                    ? "bg-[#00a63e] text-white shadow-[0_10px_20px_rgba(0,166,62,0.15)]" 
                    : "text-zinc-500 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className={`${isActive ? "text-white" : "group-hover:text-[#00a63e]"} transition-colors`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
          
          <div className="pt-4 mt-4 border-t border-white/5">
            <a 
              href="/" 
              target="_blank" 
              className="flex items-center gap-4 px-4 py-4 rounded-2xl text-[10px] font-black tracking-widest text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
            >
              <ExternalLink size={18} /> LIVE SITE
            </a>
          </div>
        </nav>

        {/* LOGOUT BUTTON */}
        <button 
          onClick={handleLogout} 
          className="mt-auto flex items-center gap-4 px-4 py-4 rounded-2xl text-[10px] font-black tracking-widest text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
        >
          <LogOut size={18} /> TERMINATE SESSION
        </button>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <header className="p-6 flex justify-between items-center border-b border-white/5 lg:hidden bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#00a63e] rounded-full animate-pulse"></div>
                <span className="font-black text-[10px] tracking-widest uppercase">CWX / COMMAND</span>
            </div>
            <button onClick={handleLogout} className="text-red-500 p-2 hover:bg-red-500/10 rounded-full transition-all">
                <LogOut size={20}/>
            </button>
        </header>

        {/* Dynamic Content Container */}
        <div className="p-6 md:p-10 lg:p-14 max-w-[1600px] mx-auto">
            {children}
        </div>

        {/* Subtle Footer for Admin */}
        <footer className="p-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-20">
             <p className="text-[8px] font-black uppercase tracking-widest text-white italic">
               Developed by CodeWebX Dev Team
             </p>
             <p className="text-[8px] font-black uppercase tracking-widest text-white">
               Version 2.4.0-Stable
             </p>
        </footer>
      </main>
    </div>
  );
};

export default AdminLayout;