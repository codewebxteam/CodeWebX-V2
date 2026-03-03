import React from "react";
import { motion } from "framer-motion";

const VisionMission = () => {
  const content = [
    {
      title: "Our Vision",
      description:
        "To be the partner behind growth—where every product we build helps the business grow, helps teams perform better, and creates opportunity for the people around it.",
    },
    {
      title: "Our Mission",
      description:
        "To build reliable mobile apps and web applications with discipline—so businesses can launch, learn, improve, and scale without breaking.",
    },
    {
      title: "Our Value",
      description:
        "We do the right work, the right way. Clear communication, high standards, and accountability—because we only win when our clients win.",
    },
  ];

  return (
    <section className="bg-white py-24 md:py-32 px-6 md:px-16 text-black">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left Side: Font extracted from FAQ Heading */}
        <div className="lg:col-span-5">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-ultra-thin tracking-tighter leading-tight text-black"
          >
            Empowering Businesses <br />
            <span className="italic font-light text-zinc-300">
              Growth for Everyone Involved
            </span>
          </motion.h2>
        </div>

        {/* Right Side: Font extracted from FAQ Items */}
        <div className="lg:col-span-7 flex flex-col">
          {content.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="border-b border-zinc-100 last:border-none py-8 first:pt-0"
            >
              {/* Using FAQ Question Style */}
              <h3 className="text-xl md:text-2xl font-light tracking-tight text-zinc-500 mb-4 transition-colors hover:text-black cursor-default">
                {item.title}
              </h3>

              {/* Using FAQ Answer Style */}
              <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-2xl">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
