import React, { useState } from "react";
import Sidebar from "./Sidebar"; // CONNECTED SIDEBAR
import { Menu, X } from "lucide-react";

const AdminLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-[#050505] flex overflow-hidden">
      
      {/* Global Scrollbar Hider Utility */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none !important; }
        .no-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
      `}} />

      {/* --- DESKTOP SIDEBAR (Only ONE Sidebar) --- */}
      <aside className="hidden lg:block w-64 h-full flex-shrink-0 border-r border-white/5 bg-zinc-950">
        <Sidebar closeMobileMenu={() => {}} />
      </aside>

      {/* --- MOBILE DRAWER --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="absolute top-0 left-0 w-72 h-full z-[110] animate-in slide-in-from-left duration-300 shadow-2xl">
             <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-5 right-5 text-zinc-500 z-[120]"><X size={24} /></button>
             <Sidebar closeMobileMenu={() => setIsMobileMenuOpen(false)} />
          </aside>
        </div>
      )}

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-black">
        
        {/* Mobile Header (Only Phone pe dikhega) */}
        <header className="lg:hidden p-5 flex justify-between items-center bg-zinc-950 border-b border-white/5 flex-shrink-0">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-white/5 rounded-lg text-[#00a63e]"><Menu size={20} /></button>
          <span className="font-black text-[10px] tracking-widest uppercase italic text-white leading-none">CWX COMMAND CENTER</span>
          <div className="w-8"></div>
        </header>

        {/* PAGE CONTENT (Independent Scroll Area) */}
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          <div className="p-5 md:p-10 lg:p-14 max-w-[1500px] mx-auto min-h-full flex flex-col">
            
            <div className="flex-1 text-left">
              {children}
            </div>
            
            {/* Footer Component */}
            <footer className="mt-20 py-10 border-t border-white/5 opacity-20 flex flex-col md:flex-row justify-between items-center gap-4">
               <p className="text-[8px] font-black uppercase tracking-widest text-white italic">CodeWebX Technologies / Gorakhpur HQ</p>
               <p className="text-[8px] font-black uppercase tracking-widest text-white italic">v2.5.0-Secure_Enterprise</p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;