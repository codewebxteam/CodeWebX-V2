import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight, Mail, Phone, MapPin,
  Instagram, Linkedin, Facebook, Youtube, X
} from "lucide-react";
import InquiryModal from "../Common/InquiryModal";

const Footer = () => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleEmailClick = (e) => {
    e.preventDefault();
    window.location.href = "mailto:info@codewebx.in";
  };

  const socialLinks = [
    { icon: Linkedin, url: "https://www.linkedin.com/company/codewebx/posts/?feedView=all" },
    { icon: Instagram, url: "https://www.instagram.com/codewebx.in/?hl=en" },
    { icon: Facebook, url: "https://www.facebook.com/share/1AmB2MCHWf/" },
    { icon: Youtube, url: "https://www.youtube.com/@CodeWebX-Technologies" },
  ];

  return (
    <footer className="bg-black text-white pt-12 md:pt-24 pb-6 px-5 md:px-16 overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- TOP SECTION --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12 md:mb-20">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#00a63e] rounded-full animate-pulse"></div>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-500">Ready to scale?</span>
            </div>
            <h2 className="text-5xl md:text-[8rem] font-black leading-[0.9] tracking-tighter uppercase">
              Let's build <br />
              <span className="text-zinc-800 italic hover:text-white transition-all duration-500">together.</span>
            </h2>
          </div>

          <motion.button
            onClick={() => setIsInquiryOpen(true)}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-4 bg-[#00a63e] text-white px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] shadow-xl transition-all hover:bg-white hover:text-black"
          >
            Start Project <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
          </motion.button>
        </div>

        {/* --- MIDDLE SECTION --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 py-12 border-t border-zinc-900">
          
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter uppercase">CodeWebX<span className="text-[#00a63e]">.</span></span>
              <span className="text-[7px] text-[#00a63e] font-bold tracking-[0.2em] uppercase">Technologies</span>
            </div>
            <p className="text-zinc-500 text-xs font-medium leading-relaxed max-w-xs">
              Engineering high-performance digital products for startups and global brands.
            </p>
          </div>

          <div className="space-y-5">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-700">Contact</span>
            <div className="flex flex-col gap-4 text-zinc-400 text-xs">
              <button onClick={handleEmailClick} className="hover:text-white flex items-center gap-3 transition-colors w-fit font-bold">
                <Mail size={14} className="text-[#00a63e]" /> info@codewebx.in
              </button>
              <a href="tel:+917004046637" className="hover:text-white flex items-center gap-3 transition-colors font-bold">
                <Phone size={14} className="text-[#00a63e]" /> +91 7004046637
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-[#00a63e] shrink-0" />
                <span className="leading-relaxed">GIDA Sector 5, <br /> Gorakhpur, UP</span>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-700">Navigation</span>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-6 text-zinc-400 text-[10px] font-bold tracking-widest uppercase">
              <li><Link to="/" className="hover:text-[#00a63e] transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-[#00a63e] transition-colors">Services</Link></li>
              <li><Link to="/about" className="hover:text-[#00a63e] transition-colors">About</Link></li>
              <li><Link to="/works" className="hover:text-[#00a63e] transition-colors">Works</Link></li>
              <li><Link to="/clients" className="hover:text-[#00a63e] transition-colors">Clients</Link></li>
              <li><Link to="/blog" className="hover:text-[#00a63e] transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="hover:text-[#00a63e] transition-colors">Careers</Link></li>
              <li onClick={() => setIsPrivacyOpen(true)} className="hover:text-[#00a63e] cursor-pointer transition-colors">Privacy</li>
            </ul>
          </div>

          <div className="space-y-5">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-700">Social</span>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 border border-zinc-900 rounded-full flex items-center justify-center hover:bg-[#00a63e] hover:text-white hover:border-[#00a63e] transition-all"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-900 text-zinc-700 text-[8px] font-black uppercase tracking-[0.3em] gap-4 text-center">
          <p>© {currentYear} CodeWebX. Build with precision.</p>
          <div className="flex gap-6 text-zinc-800">
             <span>Gorakhpur</span> <span>Basti</span> <span>Lucknow</span>
          </div>
        </div>
      </div>

      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />

      {/* Privacy Policy Popup */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-5">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsPrivacyOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-lg max-h-[70vh] overflow-hidden rounded-3xl flex flex-col shadow-2xl">
              <div className="p-5 border-b border-white/5 flex justify-between items-center bg-zinc-900/30">
                <span className="text-xs font-black tracking-widest uppercase text-[#00a63e]">Legal Policy</span>
                <button onClick={() => setIsPrivacyOpen(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><X size={16} /></button>
              </div>
              <div className="p-8 overflow-y-auto text-zinc-500 text-[11px] leading-relaxed space-y-4 text-left">
                <p><strong className="text-white">1. Data Collection:</strong> We collect your name and email to answer your business inquiries via our contact forms.</p>
                <p><strong className="text-white">2. Usage:</strong> Your personal details are strictly used for communication and are never shared or sold to third-party marketing agencies.</p>
                <p><strong className="text-white">3. Security:</strong> We implement industry-standard security measures to protect your project data and personal info.</p>
                <p className="pt-4 border-t border-white/5 text-zinc-800 uppercase text-[9px] font-black tracking-widest">Last Update: April 2026</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;