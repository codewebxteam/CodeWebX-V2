import React, { useRef } from "react";
import { Quote, Star } from "lucide-react";

const ClientTestimonials = () => {
  const scrollRef = useRef(null);
  const brandColor = "#00a63e"; // CodeWebX Green

  const testimonials = [
    {
      clientName: "Founder, Mice Academy",
      clientImage: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800",
      projectImage: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800",
      projectTitle: "Mice Academy LMS",
      experience: "CodeWebX transformed our coaching institute into a digital powerhouse. Their team understands the local market while delivering world-class tech.",
      width: "w-[85vw] md:w-[65vw]",
    },
    {
      clientName: "Director, Hello 11",
      clientImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      projectImage: "https://images.pexels.com/photos/4606344/pexels-photo-4606344.jpeg?auto=compress&cs=tinysrgb&w=800",
      projectTitle: "Hello 11 Mobility App",
      experience: "The real-time tracking and scalability of the app they built is beyond expectations. Truly a tech partner.",
      width: "w-[75vw] md:w-[45vw]",
    },
    {
      clientName: "CEO, Raj Enterprises",
      clientImage: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=800",
      projectImage: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
      projectTitle: "Supply Chain ERP",
      experience: "Their ERP system streamlined our entire supply chain. Professional team and exceptional delivery speed.",
      width: "w-[80vw] md:w-[55vw]",
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden border-t border-zinc-100">
      
      {/* 1. Header Section */}
      <div className="px-6 md:px-16 mb-16">
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">Client Feedback</span>
          <div className="h-[1px] w-20 bg-zinc-200"></div>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black mt-4 uppercase italic leading-none">
          Trusted <span className="text-zinc-300">Voices</span>
        </h2>
      </div>

      {/* 2. Scroll Container with 'no-scrollbar' class */}
      <div 
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 md:px-16 pb-12 cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* IE and Edge */
        }}
      >
        {/* Webkit scrollbar hiding logic via CSS-in-JS pattern */}
        <style dangerouslySetInnerHTML={{__html: `
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />

        {testimonials.map((item, idx) => (
          <div 
            key={idx} 
            className={`flex-shrink-0 ${item.width} group snap-center relative`}
          >
            {/* Split Visual Card */}
            <div className="relative aspect-[16/10] md:aspect-video rounded-[3rem] md:rounded-[5rem] overflow-hidden border border-zinc-100 shadow-sm grid grid-cols-2">
              <div className="relative h-full overflow-hidden border-r border-zinc-100">
                  <img src={item.clientImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt={item.clientName} />
                  <div className="absolute inset-0 bg-black/5 opacity-50"></div>
              </div>
              <div className="relative h-full overflow-hidden">
                  <img src={item.projectImage} className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" alt={item.projectTitle} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-80"></div>
              </div>
              
              {/* Floating Quote */}
              <div className="absolute top-8 left-8 z-20 flex gap-2">
                   <div className="bg-white/90 backdrop-blur-md p-3 rounded-full border border-zinc-200 shadow-md">
                      <Quote size={18} style={{ color: brandColor }} fill={brandColor} className="rotate-180" />
                   </div>
              </div>
              
              {/* Rating */}
              <div className="absolute top-8 right-8 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                  {[1,2,3,4,5].map(s => <Star key={s} size={10} fill={brandColor} stroke={brandColor} />)}
              </div>
            </div>

            {/* Info Section */}
            <div className="mt-10 px-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-3xl md:text-5xl font-black text-black tracking-tighter uppercase leading-none group-hover:text-[#00a63e] transition-colors">
                      {item.clientName}
                    </h3>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2">{item.projectTitle}</p>
                </div>
                <span className="text-sm font-bold text-zinc-300">0{idx + 1}</span>
              </div>
              <p className="text-zinc-700 text-base md:text-xl font-medium max-w-2xl leading-relaxed italic">
                "{item.experience}"
              </p>
            </div>
          </div>
        ))}
        <div className="flex-shrink-0 w-[5vw]"></div>
      </div>

      {/* 3. Interaction Hint */}
      <div className="px-6 md:px-16 mt-8">
        <div className="flex items-center gap-3 text-zinc-400">
           <div className="w-12 h-[1px] bg-zinc-200"></div>
           <span className="text-[10px] font-bold uppercase tracking-widest">Hold and drag to explore more client voices</span>
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;