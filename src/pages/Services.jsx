import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Minus, ArrowUpRight, Globe, Smartphone, 
  Megaphone, Search, Fingerprint, Cpu
} from "lucide-react";
import InquiryModal from "../components/Common/InquiryModal";

const Services = () => {
  const [openIndex, setOpenIndex] = useState(0); 
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedContext, setSelectedContext] = useState("");

  // --- FORCE SCROLL TO TOP ON LOAD ---
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // "smooth" ki jagah "instant" use kiya hai taaki user ko jump na dikhe
    });
  }, []);

  const services = [
    { 
      id: "web",
      name: "Web Systems", 
      icon: <Globe size={22} />,
      desc: "High-velocity web platforms using React/Next.js. E-Commerce, ERPs, and SaaS Dashboards.",
      tags: ["Enterprise", "SaaS", "E-Com"],
      color: "from-blue-500/10"
    },
    { 
      id: "app",
      name: "App Development", 
      icon: <Smartphone size={22} />,
      desc: "Native iOS & Android experiences. We build apps that people keep on their home screens.",
      tags: ["iOS/Android", "Fintech", "UX"],
      color: "from-emerald-500/10"
    },
    { 
      id: "custom",
      name: "Custom Logic", 
      icon: <Cpu size={22} />,
      desc: "Bespoke code for unique business logic, API integrations, and workflow automation.",
      tags: ["Security", "APIs", "Automation"],
      color: "from-purple-500/10"
    },
    { 
      id: "marketing",
      name: "Growth Ads", 
      icon: <Megaphone size={22} />,
      desc: "Data-driven advertising. We scale your business with precision Meta and Google ad strategies.",
      tags: ["FB Ads", "Lead Gen", "ROI"],
      color: "from-rose-500/10"
    },
    { 
      id: "seo",
      name: "SEO Engineering", 
      icon: <Search size={22} />,
      desc: "Technical authority building to dominate search results and rank where it matters.",
      tags: ["Google Rank", "Audit", "Keywords"],
      color: "from-amber-500/10"
    },
    { 
      id: "branding",
      name: "Visual Identity", 
      icon: <Fingerprint size={22} />,
      desc: "Defining your digital DNA. Modern brand systems, UI/UX, and social media aesthetics.",
      tags: ["UI/UX", "Logos", "Strategy"],
      color: "from-zinc-500/10"
    }
  ];

  const handleOpenModal = (id) => {
    setSelectedContext(id);
    setIsInquiryOpen(true);
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#00a63e]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-12 px-6 md:px-16 border-b border-white/5">
        <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:30px_30px]"></div>
        
        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-[#00a63e] rounded-full"></div>
              <span className="text-[9px] font-black tracking-[0.4em] text-zinc-500 uppercase">Expertise Index</span>
            </div>
            <h1 className="text-5xl md:text-[7.5rem] font-black leading-[0.85] tracking-tighter uppercase">
              Full <br /> <span className="text-[#00a63e]">Spectrum.</span>
            </h1>
          </div>
          
          <div className="max-w-xs text-left md:text-right">
             <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
               Architecting high-performance digital systems for the next generation of businesses.
             </p>
          </div>
        </div>
      </section>

      {/* --- SERVICES LIST --- */}
      <section className="px-6 md:px-16 py-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 gap-3">
          {services.map((service, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={service.id}
                className={`group rounded-[2rem] border transition-all duration-500 overflow-hidden 
                  ${isOpen ? `bg-gradient-to-r ${service.color} to-transparent border-white/10` : "bg-transparent border-white/5 hover:border-white/10"}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full p-6 md:p-10 flex items-center justify-between text-left outline-none"
                >
                  <div className="flex items-center gap-6 md:gap-12">
                    <span className={`text-sm font-black opacity-20 hidden md:block`}>0{index + 1}</span>
                    <div className={`p-3 rounded-xl bg-white/5 text-[#00a63e] transition-transform duration-500 ${isOpen ? "rotate-[360deg] scale-110" : "group-hover:scale-110"}`}>
                       {service.icon}
                    </div>
                    <div className="space-y-1">
                      <h2 className={`text-xl md:text-4xl font-black uppercase tracking-tight transition-all ${isOpen ? "text-white" : "text-zinc-400 group-hover:text-white"}`}>
                        {service.name}
                      </h2>
                      {!isOpen && (
                        <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">View Details +</p>
                      )}
                    </div>
                  </div>
                  
                  <div className={`w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full border transition-all duration-500 
                    ${isOpen ? "bg-white border-white text-black rotate-180" : "border-white/10 group-hover:border-[#00a63e] text-white"}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 md:px-10 pb-10 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8 space-y-6">
                          <p className="text-zinc-400 text-base md:text-xl font-medium leading-relaxed max-w-2xl">
                            {service.desc}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {service.tags.map(tag => (
                              <span key={tag} className="px-3 py-1 bg-black/40 border border-white/5 rounded-lg text-[8px] font-black uppercase tracking-widest text-[#00a63e]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
                           <motion.button
                             whileTap={{ scale: 0.95 }}
                             onClick={() => handleOpenModal(service.id)}
                             className="flex items-center gap-4 bg-[#00a63e] text-white px-8 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[9px] hover:bg-white hover:text-black transition-all"
                           >
                             Initiate Project <ArrowUpRight size={16} />
                           </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* --- QUICK CONTACT BAR --- */}
      <section className="px-6 md:px-16 mt-12 mb-20">
         <div className="max-w-[1400px] mx-auto bg-white p-6 md:p-10 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6 text-left">
            <h3 className="text-black text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">
              Need a Custom <br className="hidden md:block" /> Solution?
            </h3>
            <button 
              onClick={() => handleOpenModal("custom")}
              className="w-full md:w-auto bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#00a63e] transition-all"
            >
              Talk to Tech Team
            </button>
         </div>
      </section>

      <InquiryModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
        defaultService={selectedContext} 
      />
    </div>
  );
};

export default Services;