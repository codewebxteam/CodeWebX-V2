import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { 
  Menu, X, ArrowUpRight, 
  Home, User, Cpu, Layers, 
  Users, Zap, Briefcase 
} from "lucide-react";
import InquiryModal from "../Common/InquiryModal";

// --- LOGO IMPORT ---
import BrandLogo from "../../assets/Logo.png"; // Transparent PNG

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [hidden, setHidden] = useState(false); // Hide on scroll down
  const [scrolled, setScrolled] = useState(false); // Glass background logic
  
  const { scrollY } = useScroll();
  const location = useLocation();

  // Smart Hide/Show Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true); // Scrolling down - Hide
    } else {
      setHidden(false); // Scrolling up - Show
    }
    
    if (latest > 50) setScrolled(true);
    else setScrolled(false);
  });

  const navLinks = [
    { name: "HOME", path: "/", icon: <Home size={16} />, color: "text-blue-500" },
    { name: "ABOUT", path: "/about", icon: <User size={16} />, color: "text-orange-500" }, 
    { name: "SERVICES", path: "/services", icon: <Cpu size={16} />, color: "text-emerald-500" },
    { name: "WORKS", path: "/works", icon: <Layers size={16} />, color: "text-purple-500" },
    { name: "CLIENTS", path: "/clients", icon: <Users size={18} />, color: "text-rose-500" },
    { name: "CAREERS", path: "/careers", icon: <Briefcase size={16} />, color: "text-amber-500" },
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
      <motion.nav 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-[110] flex items-center justify-between px-6 md:px-16 py-4 transition-all duration-300 ${
          scrolled 
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl" 
          : "bg-transparent border-b border-transparent"
        }`}
      >
        
        {/* --- STRAIGHT LOGO GROUP (Updated) --- */}
        <Link to="/" className="flex items-center gap-3 relative z-[120] group">
          {/* Logo container with rotation removed */}
          <div 
            className="w-10 h-10 flex items-center justify-center rotate-0 transition-all" // Set rotate-0
          >
            <img 
              src={BrandLogo} 
              alt="CodeWebX Logo" 
              className="w-full h-full object-contain" // Contain ensure PNG aspect ratio
            />
          </div>
          <div className="flex flex-col leading-none text-white text-left">
            <span className="text-xs font-black tracking-[0.2em] group-hover:text-[#00a63e] transition-colors">CODEWEBX</span>
            <span className="text-[7px] text-[#00a63e] font-bold tracking-[0.1em]">TECHNOLOGIES</span>
          </div>
        </Link>

        {/* --- FLOATING PILL (Desktop Only) --- */}
        <div className="hidden lg:flex items-center gap-1 bg-white/5 backdrop-blur-md border border-white/10 p-1.5 rounded-full shadow-2xl">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-5 py-2 text-[9px] font-black tracking-widest rounded-full transition-all duration-300
                  ${isActive 
                    ? "bg-[#00a63e] text-white shadow-lg" 
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* --- ACTION BUTTON & TOGGLE --- */}
        <div className="flex items-center gap-4 relative z-[120]">
          <button 
            onClick={() => setIsInquiryOpen(true)}
            className="hidden lg:block bg-white text-black px-6 py-2.5 rounded-full text-[9px] font-black tracking-widest hover:bg-[#00a63e] hover:text-white transition-all active:scale-95"
          >
            GET IN TOUCH
          </button>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10 backdrop-blur-md active:scale-90 transition-all"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* --- MOBILE OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-[105] flex flex-col pt-24 pb-8 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-1 mb-6">
              <span className="text-[10px] font-black tracking-[0.5em] text-zinc-600 uppercase">DIRECTORY / INDEX</span>
              <div className="h-[1px] w-full bg-white/10 mt-2"></div>
            </div>

            <div className="flex-1 flex flex-col justify-start gap-1 overflow-y-auto no-scrollbar">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center justify-between py-4 group border-b border-white/[0.03]"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`p-2.5 rounded-xl bg-white/5 ${link.color}`}>
                        {link.icon}
                      </div>
                      <span className={`text-2xl font-black tracking-tighter uppercase ${location.pathname === link.path ? "text-[#00a63e]" : "text-zinc-500"}`}>
                        {link.name}
                      </span>
                    </div>
                    <ArrowUpRight size={18} className="text-zinc-800" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsInquiryOpen(true);
                }}
                className="w-full bg-[#00a63e] text-white py-5 rounded-2xl font-black text-[11px] tracking-[0.25em] uppercase flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(0,166,62,0.3)] active:scale-95 transition-all"
              >
                START YOUR PROJECT <ArrowUpRight size={18} />
              </button>
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