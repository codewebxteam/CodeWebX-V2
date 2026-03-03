import React from "react";

const ClientLogos = () => {
  // Hum yahan real MNC logos ke SVGs ya Names use kar sakte hain
  const upperRow = ["Google", "Amazon", "Microsoft", "Mice Academy", "Netflix", "Meta"];
  const lowerRow = ["Raj Enterprises", "Hello 11", "CIB", "Samsung", "Adobe", "Intel"];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Subtle Background Text for depth */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[20vw] font-black text-black">TRUSTED</h2>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Row 1: Left to Right */}
        <div className="flex overflow-hidden mb-12 border-y border-zinc-100 py-8 bg-zinc-50/50">
          <div className="flex whitespace-nowrap animate-marquee-slow">
            {[...upperRow, ...upperRow].map((logo, index) => (
              <div key={index} className="mx-16 flex items-center gap-4 group">
                {/* Logo Placeholder Circle */}
                <div className="w-8 h-8 rounded-full bg-[#00a63e] opacity-20 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-3xl md:text-5xl font-black text-zinc-300 group-hover:text-black transition-all duration-500 uppercase tracking-tighter cursor-default">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex overflow-hidden border-b border-zinc-100 py-8">
          <div className="flex whitespace-nowrap animate-marquee-reverse">
            {[...lowerRow, ...lowerRow].map((logo, index) => (
              <div key={index} className="mx-16 flex items-center gap-4 group">
                <div className="w-8 h-8 border-2 border-zinc-200 rounded-lg group-hover:border-[#00a63e] transition-colors rotate-45"></div>
                <span className="text-3xl md:text-5xl font-black text-zinc-300 group-hover:text-black transition-all duration-500 uppercase tracking-tighter cursor-default">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transition Dividers to blend with Black sections */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-slow {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 35s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ClientLogos;