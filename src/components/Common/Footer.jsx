import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-24 pb-10 px-6 md:px-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* --- TOP SECTION: THE BIG CALL TO ACTION --- */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">
                Work With Us
              </span>
            </div>
            <h2 className="text-6xl md:text-[10rem] font-ultra-thin leading-[0.85] tracking-tighter">
              Let's build <br />
              <span className="italic text-zinc-800 hover:text-white transition-colors duration-700">
                together.
              </span>
            </h2>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-6 bg-lime-400 text-black px-12 py-6 rounded-full font-black uppercase text-[12px] tracking-[0.3em] transition-all"
          >
            Start a Project
            <ArrowUpRight
              size={20}
              className="group-hover:rotate-45 transition-transform duration-500"
            />
          </motion.button>
        </div>

        {/* --- MIDDLE SECTION: CONTACT & LINKS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 py-20 border-t border-zinc-900">
          {/* Brand Info */}
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-black tracking-tighter uppercase">
              CodeWebX<span className="text-lime-500">.</span>
            </h3>
            <p className="text-zinc-500 font-light leading-relaxed max-w-xs">
              Transforming businesses through world-class mobile apps and
              high-performance web applications in Uttar Pradesh.
            </p>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700">
              Contact
            </span>
            <div className="flex flex-col gap-4 text-zinc-400 font-light">
              <a
                href="mailto:info@codewebx.in"
                className="hover:text-white transition-colors flex items-center gap-3"
              >
                <Mail size={16} /> info@codewebx.in
              </a>
              <a
                href="tel:+917004046637"
                className="hover:text-white transition-colors flex items-center gap-3"
              >
                <Phone size={16} /> +91 7004046637
              </a>
              <div className="flex items-center gap-3">
                <MapPin size={16} /> Gorakhpur, Uttar Pradesh
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700">
              Navigation
            </span>
            <ul className="flex flex-col gap-4 text-zinc-400 font-light uppercase text-[11px] tracking-widest">
              <li className="hover:text-lime-400 cursor-pointer transition-colors">
                Services
              </li>
              <li className="hover:text-lime-400 cursor-pointer transition-colors">
                Our Team
              </li>
              <li className="hover:text-lime-400 cursor-pointer transition-colors">
                Client Stories
              </li>
              <li className="hover:text-lime-400 cursor-pointer transition-colors">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Social Presence */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700">
              Follow Us
            </span>
            <div className="flex gap-4">
              {[Instagram, Linkedin, Twitter].map((Icon, idx) => (
                <div
                  key={idx}
                  className="w-12 h-12 border border-zinc-900 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer group"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: COPYRIGHT --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-zinc-900 text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em] gap-6">
          <p>© {currentYear} CodeWebX Technologies. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-colors">
              Gorakhpur
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Basti
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Khalilabad
            </span>
          </div>
          <p className="text-zinc-800">Designed with Passion</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
