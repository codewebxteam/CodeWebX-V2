import React, { useState } from "react";
import { ArrowUpRight, Quote, Globe } from "lucide-react";
import InquiryModal from "../Common/InquiryModal"; 

const PartnersAndClients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const partners = [
    { name: "Google", url: "https://www.vectorlogo.zone/logos/google/google-ar21.svg" },
    { name: "AWS", url: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-ar21.svg" },
    { name: "Microsoft", url: "https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg" },
    { name: "Meta", url: "https://www.vectorlogo.zone/logos/facebook/facebook-ar21.svg" },
    { name: "OpenAI", url: "https://www.vectorlogo.zone/logos/openai/openai-ar21.svg" },
    { name: "Zoho", url: "https://www.vectorlogo.zone/logos/zoho/zoho-ar21.svg" },
    { name: "Agora", url: "https://www.vectorlogo.zone/logos/agoraio/agoraio-ar21.svg" },
    { name: "Firebase", url: "https://www.vectorlogo.zone/logos/firebase/firebase-ar21.svg" },
  ];

  const clientReviews = [
    {
      id: "01",
      name: "Ola Pykhtina",
      role: "CEO of Wellness Hub",
      project: "Website Design",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800",
      headline: "A sleek, functional website.",
      text: "They were patient with our changes and friendly throughout the process.",
    },
    {
      id: "02",
      name: "Rahul Sharma",
      role: "Founder of Hello 11",
      project: "App Development",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      headline: "The most robust taxi solution.",
      text: "Solid architecture and exceptional support. Highly recommended.",
    },
  ];

  return (
    <section className="bg-white py-12 md:py-24 px-6 md:px-16 text-black relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- PARTNERS LOGO STRIP (Standard Branding Size) --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-10 md:gap-14 items-center mb-20 border-b border-zinc-50 pb-12">
          {partners.map((partner, idx) => (
            <img
              key={idx}
              src={partner.url}
              alt={partner.name}
              className="h-7 md:h-10 w-auto object-contain mx-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          ))}
        </div>

        {/* --- REVIEWS: THE EXECUTIVE CARDS (Large Visuals) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 mb-16">
          {clientReviews.map((review) => (
            <div 
              key={review.id} 
              className="flex flex-col sm:flex-row bg-zinc-50/70 rounded-[2.5rem] overflow-hidden border border-zinc-100 group transition-all hover:shadow-2xl"
            >
              {/* Large Image Block (35% Width) */}
              <div className="w-full sm:w-[35%] h-64 sm:h-auto overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src={review.image} className="w-full h-full object-cover" alt={review.name} />
              </div>

              {/* Text Content Block */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black text-[#00a63e] tracking-widest uppercase">
                      / {review.project}
                    </span>
                    <Quote className="text-zinc-200" size={28} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tighter leading-tight mb-4 text-black">
                    “{review.headline}”
                  </h3>
                  <p className="text-zinc-500 font-medium text-sm md:text-base leading-relaxed mb-6">
                    {review.text}
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-zinc-100 pt-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-black uppercase tracking-widest text-black">
                      {review.name}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase mt-1">
                      {review.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- MINIMAL CTA STRIP --- */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-zinc-100 gap-8">
          <div className="flex items-center gap-4">
            <Globe size={18} className="text-[#00a63e]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
              Trusted by visionaries worldwide
            </span>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group bg-black text-white px-10 py-5 rounded-full flex items-center gap-4 hover:bg-[#00a63e] transition-all shadow-xl active:scale-95"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.3em]">
              Start Project Initiation
            </span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default PartnersAndClients;