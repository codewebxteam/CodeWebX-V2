import React from "react";
import { motion } from "framer-motion";

const BrandsCarousel = () => {
  // Reliable SVG Logos (Direct high-quality links)
  const brands = [
    {
      name: "Google",
      url: "https://www.vectorlogo.zone/logos/google/google-ar21.svg",
    },
    {
      name: "Amazon",
      url: "https://www.vectorlogo.zone/logos/amazon/amazon-ar21.svg",
    },
    {
      name: "Microsoft",
      url: "https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg",
    },
    {
      name: "Meta",
      url: "https://www.vectorlogo.zone/logos/facebook/facebook-ar21.svg",
    },
    {
      name: "Netflix",
      url: "https://www.vectorlogo.zone/logos/netflix/netflix-ar21.svg",
    },
    {
      name: "Apple",
      url: "https://www.vectorlogo.zone/logos/apple/apple-ar21.svg",
    },
  ];

  const duplicatedBrands = [...brands, ...brands, ...brands]; // Tripled for extra smoothness

  return (
    <div className="bg-white py-12 md:py-20 overflow-hidden border-b border-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        {/* Section Label matching your requirement */}
        <div className="flex items-center gap-4 mb-14">
          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-lime-500 border-b-[5px] border-b-transparent"></div>
          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-500">
            Trusted by Leading Brands
          </span>
        </div>

        {/* The Moving Carousel with CSS MASK (Fixed the white artifact issue) */}
        <div className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <motion.div
            className="flex gap-24 md:gap-40 items-center whitespace-nowrap py-4"
            animate={{ x: ["0%", "-33.33%"] }} // Updated for tripled array
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicatedBrands.map((brand, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-700 cursor-pointer"
              >
                <img
                  src={brand.url}
                  alt={brand.name}
                  className="h-8 md:h-12 w-auto object-contain select-none pointer-events-none"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BrandsCarousel;
