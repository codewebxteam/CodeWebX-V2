import React from "react";
import { motion } from "framer-motion";
import {
  Plus,
  ArrowUpRight,
  Target,
  Users,
  Zap,
  MessageSquare,
  ShieldCheck,
  Rocket,
} from "lucide-react";

const WhyChooseUs = () => {
  const brandColor = "#00a63e"; // CodeWebX Brand Green

  const stats = [
    { label: "Years of Building", value: "13+" },
    { label: "Quality Websites Delivered", value: "1000+" },
    { label: "Mobile Apps Delivered", value: "100+" },
    { label: "Satisfied & Retention", value: "100%" },
  ];

  const features = [
    {
      title: "Product-First Thinking",
      desc: "We design around the user journey—so every screen, tap, and flow moves the business forward.",
      icon: <Target size={22} />,
    },
    {
      title: "One Team, One Goal",
      desc: "We work like an extension of your team—aligned on outcomes, timelines, and what “done” really means.",
      icon: <Users size={22} />,
    },
    {
      title: "Built for Growth",
      desc: "We focus on performance, stability, and scale—so your app doesn’t break when your business starts winning.",
      icon: <Zap size={22} />,
    },
    {
      title: "Clear Communication",
      desc: "No drama. No confusion. You always know what’s happening, what’s next, and what we need from you.",
      icon: <MessageSquare size={22} />,
    },
    {
      title: "Work That Creates Value",
      desc: "We don’t build for show. We build what users use—and what businesses can run on every day.",
      icon: <ShieldCheck size={22} />,
    },
    {
      title: "Disciplined Delivery",
      desc: "We do it right. We do it fully. Strong QA, clean builds, and ownership until launch.",
      icon: <Rocket size={22} />,
    },
  ];

  return (
    <section className="bg-black text-white py-16 md:py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* --- STATS GRID (FAQ Styled) --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 border-b border-zinc-900/50 pb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <h3 className="text-5xl md:text-6xl font-ultra-thin tracking-tighter text-white">
                {stat.value}
              </h3>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* --- HEADER: GREEN ACCENT APPLIED --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-20">
          <div className="lg:w-2/3">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-[#00a63e] border-b-[5px] border-b-transparent"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-500">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-ultra-thin tracking-tighter leading-[1.1] text-white">
              Built for <br />
              {/* Green Accent Applied Here */}
              <span className="italic font-light" style={{ color: brandColor }}>
                Business Growth.
              </span>
            </h2>
          </div>

          <div className="lg:w-1/3 flex flex-col items-start lg:items-end gap-8">
            <p className="text-zinc-500 text-lg md:text-xl font-light leading-snug lg:text-right max-w-sm">
              We use experience and clear execution to deliver results that move
              businesses forward [cite: 2026-02-11].
            </p>
            <button className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95">
              <Plus
                size={16}
                className="group-hover:rotate-90 transition-transform duration-500"
              />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Get In Touch
              </span>
            </button>
          </div>
        </div>

        {/* --- FEATURES GRID: Glassmorphism --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group bg-zinc-900/30 backdrop-blur-xl border border-white/5 p-10 rounded-[2rem] overflow-hidden hover:border-[#00a63e]/40 transition-all duration-700"
            >
              <div className="text-zinc-500 mb-6 group-hover:text-[#00a63e] transition-colors duration-500">
                {feature.icon}
              </div>

              <h4 className="text-xl md:text-2xl font-light tracking-tight mb-3 text-white uppercase">
                {feature.title}
              </h4>
              <p className="text-zinc-500 text-base font-light leading-relaxed group-hover:text-zinc-300 transition-colors duration-500">
                {feature.desc}
              </p>

              <ArrowUpRight
                className="absolute top-8 right-8 text-zinc-800 group-hover:text-[#00a63e] transition-colors duration-700"
                size={20}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
