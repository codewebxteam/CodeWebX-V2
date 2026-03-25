import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, ArrowUpRight, 
  Home, User, Cpu, Layers, 
  Users, Zap 
} from "lucide-react";
import InquiryModal from "../Common/InquiryModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "HOME", path: "/", icon: <Home size={16} />, color: "text-blue-500" },
    { name: "ABOUT", path: "/about", icon: <User size={16} />, color: "text-orange-500" }, 
    { name: "SERVICES", path: "/services", icon: <Cpu size={16} />, color: "text-emerald-500" },
    { name: "WORKS", path: "/works", icon: <Layers size={16} />, color: "text-purple-500" },
    { name: "CLIENTS", path: "/clients", icon: <Users size={18} />, color: "text-rose-500" },
    { name: "BLOG", path: "/blog", icon: <Zap size={16} />, color: "text-yellow-400" }, 
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[110] flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-md border-b border-white/5">
        
        {/* --- LOGO GROUP --- */}
        <Link to="/" className="flex items-center gap-3 relative z-[120]">
          <div className="w-9 h-9 border-[1.5px] border-white rounded-full flex items-center justify-center rotate-[-15deg] text-white">
            <span className="text-[9px] font-black tracking-tighter">CWX</span>
          </div>
          <div className="flex flex-col leading-none text-white text-left">
            <span className="text-xs font-black tracking-[0.2em]">CODEWEBX</span>
            <span className="text-[7px] text-[#00a63e] font-bold tracking-[0.1em]">TECHNOLOGIES</span>
          </div>
        </Link>

        {/* --- DESKTOP NAVIGATION (Horizontal & Icon-less) --- */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] font-bold tracking-[0.2em] transition-all duration-300 pb-1 
                  ${isActive 
                    ? "text-[#00a63e] border-b border-[#00a63e]" 
                    : "text-zinc-500 hover:text-white"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* --- ACTION BUTTON & TOGGLE --- */}
        <div className="flex items-center gap-4 relative z-[120]">
          {/* Desktop Only Button */}
          <button 
            onClick={() => setIsInquiryOpen(true)}
            className="hidden lg:block bg-white text-black px-6 py-2.5 rounded-full text-[10px] font-black tracking-wider hover:bg-[#00a63e] hover:text-white transition-all active:scale-95 shadow-lg"
          >
            GET IN TOUCH
          </button>

          {/* Hamburger Icon (Phone Only) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white w-9 h-9 flex items-center justify-center bg-white/5 rounded-full border border-white/10"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* --- COMPACT MOBILE OVERLAY (Touched Nothing Here) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[105] flex flex-col pt-[85px] pb-4 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-1 mb-2">
               <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black tracking-[0.4em] text-zinc-500 uppercase">
                    NAVIGATE / INDEX
                  </span>
               </div>
               <div className="h-[1px] w-full bg-white/10 mt-1"></div>
            </div>

            <div className="flex-1 flex flex-col justify-start gap-0.5 min-h-0 py-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center justify-between py-2.5 group border-b border-white/[0.03]"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg bg-white/5 ${link.color} group-active:scale-95 transition-transform`}>
                        {link.icon}
                      </div>
                      <span className={`text-lg font-black tracking-tighter uppercase ${location.pathname === link.path ? "text-white" : "text-zinc-500"}`}>
                        {link.name}
                      </span>
                    </div>
                    <ArrowUpRight size={14} className="text-zinc-800" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-2">
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsInquiryOpen(true);
                }}
                className="w-full bg-[#00a63e] text-white py-4 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
              >
                START PROJECT <ArrowUpRight size={16} />
              </button>
              
              <div className="flex justify-between items-center mt-3 px-1">
                <span className="text-[7px] text-zinc-700 font-bold tracking-[0.3em] uppercase">CODEWEBX / V2.0</span>
                <span className="text-[7px] text-zinc-700 font-bold tracking-[0.3em] uppercase italic">GORAKHPUR</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <InquiryModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
      />
    </>
  );
};

export default Navbar;