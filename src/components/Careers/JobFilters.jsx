import React, { useState } from "react";
import { MapPin, Filter } from "lucide-react";

const JobFilters = () => {
  const [activeTab, setActiveTab] = useState("All");
  const brandColor = "#00a63e";

  const locations = ["All", "Gorakhpur", "Basti", "Khalilabad", "Remote"];

  return (
    <div className="px-6 md:px-16 py-12 bg-black">
      {/* Header for Filter Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-900 rounded-lg border border-white/5">
            <Filter size={14} style={{ color: brandColor }} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
            Filter by Location
          </span>
        </div>
        <div className="hidden md:block h-[1px] flex-grow mx-8 bg-zinc-900"></div>
      </div>

      {/* Modern Filter Pill Container */}
      <div className="flex flex-wrap items-center gap-3 md:gap-5">
        {locations.map((loc) => {
          const isActive = activeTab === loc;
          
          return (
            <button
              key={loc}
              onClick={() => setActiveTab(loc)}
              className={`relative flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden
                ${isActive 
                  ? "text-white shadow-[0_10px_30px_rgba(0,166,62,0.2)]" 
                  : "text-zinc-500 bg-zinc-900/40 border border-white/5 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              style={isActive ? { backgroundColor: brandColor } : {}}
            >
              {/* Subtle Map Icon for non-All tabs */}
              {loc !== "All" && (
                <MapPin size={12} className={isActive ? "text-white" : "text-zinc-700"} />
              )}
              
              <span className="relative z-10">{loc}</span>
              
              {/* Shine effect for Active Tab */}
              {isActive && (
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shine" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default JobFilters;