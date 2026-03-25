import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: "01",
    title: "App Development",
    description: "As a trusted mobile app development company in Uttar Pradesh, we build apps for business growth through technology. We use React Native, Flutter, and native iOS/Android, powered by Firebase.",
    features: ["1. Cross-Platform App Development", "2. Native App Development (iOS / Android)", "3. AI-Powered App Features"],
    bgColor: "bg-black",
  },
  {
    id: "02",
    title: "Website Development",
    description: "Crafting high-performance web applications using ReactJS, Next.js, and Vite. We focus on speed, SEO, and minimalist design that converts visitors into customers.",
    features: ["1. Custom Enterprise Solutions", "2. E-Commerce Platforms", "3. Progressive Web Apps (PWA)"],
    bgColor: "bg-[#0a0a0a]", 
  },
  {
    id: "03",
    title: "Digital Marketing",
    description: "Scaling your brand in Gorakhpur, Basti, and Khalilabad with data-driven strategies. From Facebook Ads to Google Search, we ensure your business stays ahead.",
    features: ["1. Performance Marketing", "2. Search Engine Optimization", "3. Social Media Management"],
    bgColor: "bg-[#0d0d0d]",
  }
];

const ServiceCard = ({ service, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      // 'sticky' wapas lga diya gaya hai
      // Mobile pe top offset '70px' rakha hai taaki content dikhta rahe
      className={`sticky w-full min-h-[60vh] md:min-h-[70vh] ${service.bgColor} border-t border-zinc-800 p-8 md:p-16 flex flex-col md:flex-row gap-8 md:gap-12 rounded-t-[2.5rem] md:rounded-t-[3rem] shadow-2xl`}
      style={{ 
        top: `calc(80px + ${index * 32}px)` // Mobile & Desktop dono pe stack hoga
      }}
    >
      {/* Indexing (01) */}
      <div className="text-zinc-700 text-xl md:text-2xl font-bold md:w-1/4">
        ({service.id})
      </div>

      {/* Content Area */}
      <div className="md:w-3/4 flex flex-col gap-6 md:gap-8">
        <div className="flex justify-between items-start">
          <h3 className="text-4xl md:text-7xl font-ultra-thin tracking-tighter text-white leading-tight">
            {service.title}
          </h3>
          <button 
            onClick={() => navigate('/services')}
            className="flex items-center gap-2 text-lime-500 font-bold text-[10px] md:text-xs uppercase tracking-widest hover:text-white transition-colors"
          >
            + KNOW MORE
          </button>
        </div>

        <p className="text-zinc-500 text-base md:text-xl font-light leading-relaxed max-w-2xl">
          {service.description}
        </p>

        <ul className="flex flex-col gap-3 md:gap-4 mt-4 md:mt-8">
          {service.features.map((feature, i) => (
            <li key={i} className="py-4 md:py-6 border-b border-white/5 text-zinc-300 text-sm md:text-lg font-medium last:border-0">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-black px-6 md:px-16 py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
              OUR SERVICES
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-ultra-thin leading-none tracking-tighter text-white uppercase">
            What we offer <span className="text-outline italic">to you</span>
          </h2>
        </div>
        
        <button 
          onClick={() => navigate('/services')}
          className="group flex items-center gap-4 border border-zinc-800 px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-white">View all Services</span>
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Stacked Cards Container */}
      <div className="flex flex-col">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Services;