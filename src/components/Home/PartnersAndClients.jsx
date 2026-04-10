import React, { useState, useEffect } from "react";
import { ArrowUpRight, Quote, Globe, Loader2 } from "lucide-react";
import { db } from "../../firebase"; 
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import InquiryModal from "../Common/InquiryModal"; 

const PartnersAndClients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientReviews, setClientReviews] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"), limit(6));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setClientReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="bg-white py-12 md:py-24 text-black relative">
      <style dangerouslySetInnerHTML={{__html: `.no-scrollbar::-webkit-scrollbar { display: none; }`}} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-10 md:gap-14 items-center mb-20 border-b border-zinc-50 pb-12">
          {partners.map((partner, idx) => (
            <img key={idx} src={partner.url} alt={partner.name} className="h-7 md:h-10 w-auto object-contain mx-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="animate-spin text-[#00a63e]" size={40} />
        </div>
      ) : (
        <div className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 md:px-16 pb-16">
          {clientReviews.map((review) => (
            <div 
              key={review.id} 
              className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[40vw] flex flex-col sm:flex-row bg-zinc-50/70 rounded-[2.5rem] overflow-hidden border border-zinc-100 group transition-all hover:shadow-2xl snap-center"
            >
              {/* --- IMAGE SECTION FIXED --- */}
              <div className="w-full sm:w-[40%] aspect-[4/3] sm:aspect-auto sm:h-auto overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 bg-zinc-200">
                <img 
                  src={review.clientImage} 
                  className="w-full h-full object-cover object-top" // object-top ensures head is never cut
                  alt={review.clientName} 
                />
              </div>

              <div className="flex-1 p-8 md:p-10 flex flex-col justify-between text-left">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black text-[#00a63e] tracking-widest uppercase">
                      / {review.projectTitle}
                    </span>
                    <Quote className="text-zinc-200" size={28} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tighter leading-tight mb-4 text-black italic">
                    “{review.headline || "Exceptional Service"}” 
                  </h3>
                  <p className="text-zinc-500 font-medium text-xs md:text-sm leading-relaxed mb-6 line-clamp-4">
                    {review.experience}
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-zinc-100 pt-6 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-xs font-black uppercase tracking-widest text-black">
                      {review.clientName}
                    </span>
                    <span className="text-[9px] text-zinc-400 font-bold uppercase mt-1">
                      Partner Success
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-4 md:w-16"></div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-zinc-100 gap-8">
          <div className="flex items-center gap-4">
            <Globe size={18} className="text-[#00a63e]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 text-left">
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