import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What services does CodeWebX specialize in?",
    answer: "We specialize in mobile app development, custom software solutions, high-performance websites (React/Vite), UI/UX, and digital marketing.",
  },
  {
    question: "How do I start a project with your team?",
    answer: "Just tap 'Let's Connect'. We'll discuss your vision, build a roadmap, and provide a full proposal.",
  },
  {
    question: "Is CodeWebX a trusted app development company?",
    answer: "Yes. Our focus on clean architecture and transparent communication in UP ensures top-tier product delivery.",
  },
  {
    question: "Do you provide post-launch support?",
    answer: "Absolutely. We handle server management, regular updates, and feature scaling long after launch.",
  },
];

const FAQItem = ({ faq, isOpen, toggle }) => {
  return (
    <div className="border-b border-zinc-100 last:border-none">
      <button
        onClick={toggle}
        // Mobile-first: py-5 on mobile, py-8 on desktop
        className="w-full py-5 md:py-8 flex items-center justify-between text-left group transition-all"
      >
        <span
          className={`text-base md:text-xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? "text-[#00a63e]" : "text-zinc-600 group-hover:text-black"}`}
        >
          {faq.question}
        </span>
        <div className="flex-shrink-0 ml-4">
          <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full border ${isOpen ? 'bg-black border-black' : 'border-zinc-200'} flex items-center justify-center transition-all`}>
            {isOpen ? (
              <Minus size={12} className="text-white" />
            ) : (
              <Plus size={12} className="text-zinc-400 group-hover:text-black" />
            )}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 md:pb-8 text-zinc-500 text-xs md:text-base font-medium leading-relaxed max-w-3xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    // Mobile py-10, Desktop py-20
    <section className="bg-white py-10 md:py-20 px-5 md:px-16 text-black border-t border-zinc-50">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-20">
        
        {/* Left Side: Tactical Label */}
        <div className="lg:w-1/4">
          <div className="flex items-center gap-2 md:sticky md:top-32">
            <HelpCircle size={14} className="text-[#00a63e]" />
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">
              SUPPORT / FAQ
            </span>
          </div>
        </div>

        {/* Right Side: Content Area */}
        <div className="lg:w-3/4">
          <div className="mb-6 md:mb-16">
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-none text-black uppercase">
              Common <br className="hidden md:block" />
              <span className="text-zinc-300 italic">Queries.</span>
            </h2>
          </div>

          <div className="flex flex-col">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                toggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;