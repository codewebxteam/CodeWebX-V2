import React, { useEffect } from "react";
import CareerHero from "../components/Careers/CareerHero";
import JobFilters from "../components/Careers/JobFilters";
import JobCardList from "../components/Careers/JobCardList";
import InternTestimonials from "../components/Careers/InternTestimonials";
import CertificateVerifier from "../components/Careers/CertificateVerifier";
import HiringProcess from "../components/Careers/HiringProcess";

const Careers = () => {
  // Page load hone par scroll top par le jane ke liye
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-black w-full overflow-hidden">
      {/* 1. Hero Section - Pehla Impression */}
      <CareerHero />

      {/* 2. Hiring Process - Transparency ke liye process batana */}
      <div className="bg-zinc-950/50">
        <HiringProcess />
      </div>

      {/* 3. Job Search Area - Filters aur Available Roles */}
      <section id="openings" className="relative z-10">
        <div className="px-6 md:px-16 pt-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
              Current Openings
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-ultra-thin leading-none tracking-tighter">
            Join the <span className="text-outline italic">Force</span>
          </h2>
        </div>
        
        <JobFilters />
        <JobCardList />
      </section>

      {/* 4. Certificate Verification - Trust Factor build karne ke liye */}
      <CertificateVerifier />

      {/* 5. Testimonials - Past Interns ka Experience */}
      <InternTestimonials />

      {/* Call to Action Footer (Optional) */}
      <section className="py-32 px-6 text-center border-t border-zinc-900">
        <h3 className="text-zinc-500 text-sm font-bold uppercase tracking-[0.3em] mb-8">
          Not finding the right role?
        </h3>
        <button className="text-2xl md:text-4xl font-light hover:text-lime-400 transition-colors">
          Send us your CV <span className="text-outline">anyway.</span>
        </button>
      </section>
    </div>
  );
};

export default Careers;