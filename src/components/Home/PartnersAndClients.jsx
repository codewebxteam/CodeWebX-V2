import React from "react";
import { ArrowUpRight, Quote, CheckCircle2 } from "lucide-react";

const PartnersAndClients = () => {
  const partners = [
    {
      name: "Google",
      url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "AWS",
      url: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    },
    {
      name: "Microsoft",
      url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    },
    {
      name: "Meta",
      url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    },
    {
      name: "OpenAI",
      url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
    },
    {
      name: "Anthropic",
      url: "https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg",
    },
    {
      name: "Zoho",
      url: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Zoho_logo.png",
    },
    {
      name: "Agora",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Agora_Logo.svg/2560px-Agora_Logo.svg.png",
    },
  ];

  const clientReviews = [
    {
      id: "01",
      name: "Ola Pykhtina",
      role: "CEO of Wellness Hub",
      project: "Website Design",
      image:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800",
      headline: "A sleek, functional website.",
      text: "They were patient with our changes and friendly.",
    },
    {
      id: "02",
      name: "Rahul Sharma",
      role: "Founder of Hello 11",
      project: "App Development",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      headline: "The most robust taxi solution.",
      text: "Solid architecture and exceptional support.",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-20 px-6 md:px-16 text-black relative">
      <div className="max-w-[1400px] mx-auto">
        {/* --- PARTNERS SECTION (Compact) --- */}
        <div className="flex flex-col lg:flex-row gap-8 mb-20 items-start">
          <div className="flex items-center gap-4 lg:w-1/4">
            <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">
              Our Partners
            </span>
          </div>
          <div className="lg:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-12 items-center grayscale opacity-50 hover:opacity-100 transition-opacity duration-700">
            {partners.map((partner, idx) => (
              <img
                key={idx}
                src={partner.url}
                alt={partner.name}
                className="h-6 md:h-8 w-auto object-contain mx-auto"
              />
            ))}
          </div>
        </div>

        {/* --- COMPACT HEADER WITH CENTERED CALL TO ACTION --- */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 border-t border-zinc-100 pt-16">
          {/* Left Label */}
          <div className="md:w-1/3 flex items-center gap-4 mb-8 md:mb-0">
            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-lime-500 border-b-[5px] border-b-transparent"></div>
            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">
              Beloved Stories
            </h2>
          </div>
          {/* Center: THE "LET'S CONNECT" BUTTON */}
          <div className="md:w-1/3 flex justify-center">
            <button className="group relative border-2 border-black px-12 py-5 rounded-full flex items-center gap-4 hover:bg-black hover:text-white transition-all duration-500 hover:scale-105 active:scale-95 shadow-lg">
              <span className="text-[11px] font-black uppercase tracking-[0.4em]">
                Let's Connect
              </span>
              <ArrowUpRight
                size={20}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </div>
          <div className="md:w-1/3"></div> {/* Spacer for symmetry */}
        </div>

        {/* --- DUAL CARD LAYOUT (Unchanged Niche Content) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:h-[700px]">
          {/* Card 1: Details TOP, Image BOTTOM */}
          <div className="flex flex-col h-full bg-zinc-50/50 rounded-[3rem] p-8 md:p-12 border border-zinc-100 group">
            <div className="flex-1 flex flex-col justify-start mb-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black text-lime-600 tracking-widest uppercase">
                  / {clientReviews[0].project}
                </span>
                <Quote className="text-zinc-200" size={32} />
              </div>
              <h3 className="text-3xl md:text-5xl font-ultra-thin tracking-tighter leading-tight mb-4 text-black text-left">
                “{clientReviews[0].headline}”
              </h3>
              <p className="text-zinc-500 font-light text-lg mb-8 text-left">
                {clientReviews[0].text}
              </p>

              <div className="flex items-center gap-4 border-t border-zinc-100 pt-6">
                <div className="flex flex-col text-left">
                  <span className="text-sm font-black uppercase tracking-widest text-black">
                    {clientReviews[0].name}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase">
                    {clientReviews[0].role}
                  </span>
                </div>
              </div>
            </div>

            <div className="h-[300px] w-full rounded-[2rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
              <img
                src={clientReviews[0].image}
                className="w-full h-full object-cover"
                alt="Client 01"
              />
            </div>
          </div>

          {/* Card 2: Image TOP, Details BOTTOM */}
          <div className="flex flex-col h-full bg-zinc-50/50 rounded-[3rem] p-8 md:p-12 border border-zinc-100 group">
            <div className="h-[300px] w-full rounded-[2rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 mb-8">
              <img
                src={clientReviews[1].image}
                className="w-full h-full object-cover"
                alt="Client 02"
              />
            </div>

            <div className="flex-1 flex flex-col justify-end">
              <div className="flex items-center gap-4 border-b border-zinc-100 pb-6 mb-6 text-black">
                <div className="flex flex-col text-left">
                  <span className="text-sm font-black uppercase tracking-widest">
                    {clientReviews[1].name}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase">
                    {clientReviews[1].role}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-lime-600 tracking-widest uppercase">
                  / {clientReviews[1].project}
                </span>
                <CheckCircle2 className="text-zinc-200" size={24} />
              </div>
              <h3 className="text-3xl md:text-5xl font-ultra-thin tracking-tighter leading-tight mb-4 text-black text-left">
                “{clientReviews[1].headline}”
              </h3>
              <p className="text-zinc-500 font-light text-lg text-left">
                {clientReviews[1].text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersAndClients;
