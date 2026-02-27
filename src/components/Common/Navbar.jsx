import React from "react";

const Navbar = () => {
  const navLinks = [
    "HOME",
    "ABOUT US",
    "SERVICES",
    "WORKS",
    "CLIENTS",
    "CAREERS",
    "BLOG",
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-8 md:px-16 py-6 bg-black/50 backdrop-blur-sm">
      {/* Logo Group */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 border-[1.5px] border-white rounded-full flex items-center justify-center rotate-[-15deg]">
          <span className="text-[10px] font-black tracking-tighter">CWX</span>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-black tracking-[0.3em]">CODEWEBX</span>
          <span className="text-[9px] text-zinc-500 font-bold tracking-[0.2em]">
            TECHNOLOGIES
          </span>
        </div>
      </div>

      {/* Center Links */}
      <div className="hidden lg:flex items-center gap-10">
        {navLinks.map((link, idx) => (
          <a
            key={link}
            href="#"
            className={`text-[11px] font-bold tracking-[0.2em] hover:text-white transition-colors ${idx === 0 ? "text-white border-b border-white pb-1" : "text-zinc-500"}`}
          >
            {link}
          </a>
        ))}
      </div>

      {/* Action Button */}
      <button className="bg-white text-black px-7 py-2.5 rounded-full text-xs font-black tracking-wider hover:bg-zinc-200 transition-all">
        Get in Touch
      </button>
    </nav>
  );
};

export default Navbar;
