import React from "react";
import { Link, useLocation } from "react-router-dom"; // Navigation hooks

const Navbar = () => {
  const location = useLocation(); // Active path track karne ke liye

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT US", path: "/about" }, // Merged path from partner
    { name: "SERVICES", path: "#" },
    { name: "WORKS", path: "#" },
    { name: "CLIENTS", path: "#" },
    { name: "CAREERS", path: "/careers" }, // Careers path
    { name: "BLOG", path: "/blog" }, // Blog path
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-8 md:px-16 py-6 bg-black/50 backdrop-blur-sm">
      {/* Logo Group */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 border-[1.5px] border-white rounded-full flex items-center justify-center rotate-[-15deg] group-hover:rotate-0 transition-transform duration-500 text-white">
          <span className="text-[10px] font-black tracking-tighter">CWX</span>
        </div>
        <div className="flex flex-col leading-none text-white">
          <span className="text-sm font-black tracking-[0.3em]">CODEWEBX</span>
          <span className="text-[9px] text-zinc-500 font-bold tracking-[0.2em]">
            TECHNOLOGIES
          </span>
        </div>
      </Link>

      {/* Center Links - Dynamic Navigation */}
      <div className="hidden lg:flex items-center gap-10">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path; // Current page check

          return (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[11px] font-bold tracking-[0.2em] transition-all duration-300 pb-1 
                ${isActive 
                  ? "text-white border-b border-white" // Active tab style
                  : "text-zinc-500 hover:text-white" // Hover effect
                }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* Action Button */}
      <button className="bg-white text-black px-7 py-2.5 rounded-full text-xs font-black tracking-wider hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95">
        Get in Touch
      </button>
    </nav>
  );
};

export default Navbar;