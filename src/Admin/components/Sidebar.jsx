import React, { useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { 
  LayoutDashboard, MessageSquare, Users, Briefcase, 
  Image as ImageIcon, Newspaper, LogOut, ShieldCheck, 
  ExternalLink, UserPlus, Users2, Wallet, Activity 
} from "lucide-react";

const Sidebar = ({ closeMobileMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const publicItems = [
    { name: "DASHBOARD", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "INQUIRIES", path: "/admin/inquiries", icon: <MessageSquare size={18} /> },
    { name: "APPLICANTS", path: "/admin/applicants", icon: <Users size={18} /> },
    { name: "INTERNS", path: "/admin/interns", icon: <UserPlus size={18} /> },
    { name: "PORTFOLIO", path: "/admin/portfolio", icon: <Briefcase size={18} /> },
    { name: "CLIENTS", path: "/admin/clients", icon: <ImageIcon size={18} /> },
    { name: "BLOGS", path: "/admin/blogs", icon: <Newspaper size={18} /> },
  ];

  const enterpriseItems = [
    { name: "STAFF MATRIX", path: "/admin/employees", icon: <Users2 size={18} /> },
    { name: "FINANCE LEDGER", path: "/admin/accounts", icon: <Wallet size={18} /> },
    { name: "PROJECT OPS", path: "/admin/operations", icon: <Activity size={18} /> },
  ];

  const allNavItems = useMemo(() => [...publicItems, ...enterpriseItems], []);

  // Arrow Keys Navigation Logic
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      const currentIndex = allNavItems.findIndex(item => location.pathname.startsWith(item.path));
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % allNavItems.length;
        navigate(allNavItems[nextIndex].path);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + allNavItems.length) % allNavItems.length;
        navigate(allNavItems[prevIndex].path);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [location.pathname, navigate, allNavItems]);

  return (
    <div className="flex flex-col h-full bg-zinc-950 p-6 overflow-hidden">
      {/* 1. Logo (Fixed) */}
      <div className="flex-shrink-0 mb-8 flex items-center gap-3">
        <div className="p-2 bg-[#00a63e]/10 rounded-xl text-[#00a63e] shadow-[0_0_20px_rgba(0,166,62,0.1)]">
          <ShieldCheck size={22} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-black text-[13px] tracking-tighter uppercase leading-none text-white">CODEWEBX HQ</span>
          <span className="text-[7px] font-black text-[#00a63e] tracking-[0.3em] mt-1 uppercase">Admin Protocol</span>
        </div>
      </div>

      {/* 2. Scrollable Nav Area */}
      <nav className="flex-1 overflow-y-auto no-scrollbar space-y-8 pr-1">
        <div>
          <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-4 ml-4 text-left">Web Content</p>
          <div className="space-y-1">
            {publicItems.map(item => (
              <SidebarLink key={item.path} item={item} isActive={location.pathname.startsWith(item.path)} onClick={closeMobileMenu} />
            ))}
          </div>
        </div>
        <div>
          <p className="text-[8px] font-black text-[#00a63e] uppercase tracking-widest mb-4 ml-4 text-left">Enterprise Suite</p>
          <div className="space-y-1">
            {enterpriseItems.map(item => (
              <SidebarLink key={item.path} item={item} isActive={location.pathname.startsWith(item.path)} onClick={closeMobileMenu} />
            ))}
          </div>
        </div>
        <div className="pt-4 border-t border-white/5">
          <a href="/" target="_blank" className="flex items-center gap-4 px-4 py-4 rounded-2xl text-[10px] font-black text-zinc-500 hover:text-white transition-all uppercase tracking-widest">
            <ExternalLink size={18} /> Live Site
          </a>
        </div>
      </nav>

      {/* 3. Logout (Fixed) */}
      <div className="flex-shrink-0 mt-auto pt-6 border-t border-white/5">
        <button onClick={async () => { if(window.confirm("End Session?")) { await signOut(auth); navigate("/admin/login"); } }} className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-[10px] font-black text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-all uppercase">
          <LogOut size={18} /> Terminate
        </button>
      </div>
    </div>
  );
};

const SidebarLink = ({ item, isActive, onClick }) => (
  <Link to={item.path} onClick={onClick} className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[10px] font-black tracking-widest transition-all duration-300 group ${isActive ? "bg-[#00a63e] text-white shadow-lg" : "text-zinc-500 hover:bg-white/5 hover:text-white"}`}>
    <span className={`${isActive ? "text-white" : "group-hover:text-[#00a63e]"} transition-colors`}>{item.icon}</span>
    {item.name}
  </Link>
);

export default Sidebar;