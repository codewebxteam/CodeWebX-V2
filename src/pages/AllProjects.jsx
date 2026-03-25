import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Zap, Hash, Terminal, Cpu, Target, Layers3 } from "lucide-react";
import InquiryModal from "../components/Common/InquiryModal"; 

const AllProjects = () => {
  const brandColor = "#00a63e";
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Added Images and Detailed Visual Data
  const allProjects = [
    {
      id: "hello-11",
      title: "Hello 11",
      category: "App Development",
      description: "Local commuting ecosystem for Gorakhpur. Real-time fleet tracking & secure digital payments.",
      tech: ["React Native", "Firebase", "Maps API"],
      metric: "10k+ Downloads",
      type: "Mobile App",
      // Add real project images here later
      image: "https://images.pexels.com/photos/4606346/pexels-photo-4606346.jpeg?auto=compress&cs=tinysrgb&w=1200", 
    },
    {
      id: "jewellery-erp",
      title: "Jewellery ERP",
      category: "Software Solution",
      description: "Inventory & sales management system for luxury retailers. Barcode & tax billing core.",
      tech: ["ReactJS", "Firestore", "Tailwind"],
      metric: "99.9% Uptime",
      type: "Enterprise",
      image: "https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: "mice-academy",
      title: "MICE Academy",
      category: "Web Development",
      description: "Digital learning portal for coaching institutes. Mock tests & analytics dashboard.",
      tech: ["Next.js", "Node.js", "PostgreSQL"],
      metric: "5k+ Daily Users",
      type: "Ed-Tech",
      image: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: "brozz-portal",
      title: "BROZZ Digital",
      category: "Service Portal",
      description: "Multi-service digital portal providing G2C services & payment assistance in rural regions.",
      tech: ["Vite", "Firebase", "Express"],
      metric: "5 Districts Active",
      type: "Fin-Tech",
      image: "https://images.pexels.com/photos/7388188/pexels-photo-7388188.jpeg?auto=compress&cs=tinysrgb&w=1200",
    }
  ];

  return (
    <div className="bg-black min-h-screen pt-28 md:pt-48 pb-20 px-4 md:px-16 overflow-hidden selection:bg-[#00a63e] selection:text-white relative">
      
      {/* 1. LAYER: TECHNICAL HUD DECOR (Fixed for Depth) */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0 [background-size:20px_20px] [background-image:radial-gradient(#1a1a1a_1px,transparent_1px)]"></div>
      <div className="fixed top-0 left-10 h-full w-[1px] bg-zinc-900 opacity-30 z-0"></div>
      <div className="fixed top-0 right-10 h-full w-[1px] bg-zinc-900 opacity-30 z-0"></div>

      {/* 2. HEADER: MINIMAL & AGGRESSIVE */}
      <header className="max-w-[1500px] mx-auto mb-20 md:mb-36 relative z-10 text-center md:text-left">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-center md:justify-start gap-4 mb-6"
        >
          <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-zinc-600 flex items-center gap-2">
            <Terminal size={12} className="text-[#00a63e]" /> 
            CodeWebX / Project_Vault.log / v2.0
          </span>
        </motion.div>
        
        <h1 className="text-[14vw] md:text-[12rem] font-black tracking-tighter text-white leading-[0.8] uppercase flex flex-col items-center md:items-start">
          <span className="relative">MASTER</span>
          <span className="text-transparent" style={{ WebkitTextStroke: "1px #333" }}>WORKS.</span>
        </h1>
      </header>

      {/* 3. VISUAL GALLERY FEED */}
      <div className="max-w-[1500px] mx-auto space-y-24 md:space-y-48 relative z-10">
        {allProjects.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start"
          >
            {/* --- VISUAL IMAGE BLOCK (The "Jadu") --- */}
            <div className="lg:col-span-7 relative group/img overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-zinc-950 border border-white/5 shadow-[0_0_60px_rgba(0,0,0,0.8)]">
               {/* Masked Image with Parallax Reveal */}
               <motion.img 
                  src={project.image} 
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full aspect-[16/10] md:aspect-[16/9] object-cover grayscale md:grayscale-[0.8] group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-1000 ease-out"
                  style={{ y: "-10%" }} // Simple Parallax
               />

               {/* Modern Overlay: ID and Tech Tags */}
               <div className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-3">
                  <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                     <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                        [{index + 1 < 10 ? `0${index + 1}` : index + 1}]
                     </span>
                  </div>
               </div>

               {/* Status Badge - Floating Bottom Right */}
               <div className="absolute bottom-6 right-6 bg-[#00a63e]/10 backdrop-blur-md border border-[#00a63e]/30 px-3 py-1.5 rounded-full">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#00a63e]">
                     CATEGORY: {project.type}
                  </span>
               </div>
            </div>

            {/* --- INFO BLOCK: Minimal & Tactical --- */}
            <div className="lg:col-span-5 space-y-8 md:pt-10">
              <h3 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter group-hover:text-[#00a63e] transition-colors leading-[0.9]">
                {project.title}
              </h3>

              <p className="text-zinc-500 text-sm md:text-xl font-medium leading-relaxed max-w-lg">
                {project.description}
              </p>

              {/* Data & Tech Dashboard */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-900">
                 <div className="flex items-center gap-4 p-4 bg-zinc-900/40 rounded-2xl border border-white/5 group-hover:border-[#00a63e]/20 transition-all">
                    <Target size={20} className="text-[#00a63e]" />
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-0.5">validated Impact</p>
                       <p className="text-white font-black uppercase tracking-tighter text-xl">{project.metric}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-zinc-900/40 rounded-2xl border border-white/5 group-hover:border-[#00a63e]/20 transition-all">
                    <Layers3 size={20} className="text-[#00a63e]" />
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-0.5">Core System</p>
                       <p className="text-white font-black uppercase tracking-tighter text-xl">{project.category}</p>
                    </div>
                 </div>
              </div>

              {/* CTA Action */}
              <div className="pt-6">
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full md:w-auto group/btn flex items-center justify-center gap-4 bg-white text-black px-12 py-5 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#00a63e] hover:text-white transition-all shadow-2xl active:scale-95"
                 >
                    Initialize Connection Blueprint
                    <ArrowUpRight size={18} />
                 </button>
              </div>
            </div>

          </motion.div>
        ))}
      </div>

      {/* 4. FOOTER CTA: IMMERSIVE BLOCK */}
      <section className="max-w-[1500px] mx-auto mt-40 py-24 px-8 bg-zinc-950 rounded-[3rem] border border-white/5 relative overflow-hidden text-center shadow-2xl">
        {/* Radical Glow Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00a63e]/10 blur-[200px] rounded-full"></div>
        
        <div className="relative z-10 space-y-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-black border border-white/10 rounded-full">
             <div className="w-2 h-2 bg-[#00a63e] rounded-full animate-pulse"></div>
             <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Available For 2nd Quarter 2026</span>
          </div>

          <h2 className="text-6xl md:text-[9rem] font-black text-white uppercase tracking-tighter leading-none flex flex-col items-center">
            Ready to <span className="text-[#00a63e] italic font-serif">Engage?</span>
          </h2>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-16 py-8 bg-[#00a63e] text-white rounded-2xl font-black uppercase tracking-[0.3em] text-xs md:text-sm hover:bg-white hover:text-black transition-all duration-500 shadow-xl shadow-[#00a63e]/10"
          >
             Blueprint Project
          </button>
        </div>
      </section>

      {/* Inquiry Modal Integration */}
      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <div className="absolute -left-20 top-1/2 -rotate-90 origin-left opacity-[0.01] pointer-events-none">
        <span className="text-white text-[250px] font-black select-none">CWX_VAULT</span>
      </div>
    </div>
  );
};

export default AllProjects;