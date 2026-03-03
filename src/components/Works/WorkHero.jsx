import React from "react";
import { MoveDown } from "lucide-react";

const WorkHero = () => {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center px-6 md:px-16 bg-black pt-28 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#00a63e]/5 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-[1px] w-10 bg-zinc-800"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">Portfolio '26</span>
            </div>
            <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter text-white leading-[0.8] uppercase">
                Proven <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-700 to-zinc-900">Solutions.</span>
            </h1>
          </div>

          <div className="flex flex-col gap-6 md:text-right">
             <p className="text-zinc-500 text-sm md:text-lg max-w-[320px] font-light leading-relaxed border-l md:border-l-0 md:border-r border-zinc-800 pl-6 md:pl-0 md:pr-6">
                From scalable ERP systems to mobility apps, we turn <span className="text-white">complex ideas</span> into seamless digital realities.
             </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkHero;