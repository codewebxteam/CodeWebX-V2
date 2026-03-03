import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What services does CodeWebX Technologies specialize in?",
    answer:
      "We specialize in mobile app development, custom software solutions, high-performance website development using React and Vite, UI/UX design, and data-driven digital marketing tailored for business growth.",
  },
  {
    question: "How do I start a project with your team?",
    answer:
      "Starting is simple. You can connect with us via the 'Let's Connect' button. Our team will then reach out to discuss your requirements, create a roadmap, and provide a comprehensive project proposal.",
  },
  {
    question: "What makes CodeWebX a trusted app development company?",
    answer:
      "With a dedicated team of experts and a proven track record in Gorakhpur and Basti, we focus on scalability, clean code architecture, and transparent communication, ensuring your tech product stands out in the market.",
  },
  {
    question: "Do you provide post-launch support and maintenance?",
    answer:
      "Yes, we believe in long-term partnerships. We provide end-to-end support, including server management, regular updates, and feature enhancements to keep your application running smoothly.",
  },
];

const FAQItem = ({ faq, isOpen, toggle }) => {
  return (
    <div className="border-b border-zinc-100 last:border-none">
      <button
        onClick={toggle}
        className="w-full py-8 flex items-center justify-between text-left group transition-all"
      >
        <span
          className={`text-xl md:text-2xl font-light tracking-tight transition-colors duration-300 ${isOpen ? "text-black font-medium" : "text-zinc-500 group-hover:text-black"}`}
        >
          {faq.question}
        </span>
        <div className="flex-shrink-0 ml-4">
          {isOpen ? (
            <Minus
              size={24}
              strokeWidth={1.5}
              className="text-black transition-transform duration-500 rotate-180"
            />
          ) : (
            <Plus
              size={24}
              strokeWidth={1.5}
              className="text-zinc-400 group-hover:text-black transition-transform duration-500"
            />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="pb-10 text-zinc-400 text-lg font-light leading-relaxed max-w-4xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // Default first one open

  return (
    <section className="bg-white py-24 md:py-32 px-6 md:px-16 text-black">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-20">
        {/* Left Side: Label based on SS */}
        <div className="lg:w-1/4">
          <div className="flex items-center gap-4 sticky top-32">
            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-lime-500 border-b-[5px] border-b-transparent"></div>
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">
              FAQ Section
            </span>
          </div>
        </div>

        {/* Right Side: Content Area */}
        <div className="lg:w-3/4">
          <h2 className="text-5xl md:text-7xl font-ultra-thin tracking-tighter leading-tight mb-20 text-black">
            Have more questions? <br />
            <span className="italic font-light text-zinc-300">
              we've answers
            </span>
          </h2>

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
