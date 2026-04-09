import React, { useEffect } from "react";
import Hero from "../components/Home/Hero";
import AboutSection from "../components/Home/AboutSection";
import Services from "../components/Home/Services";
import SelectedWork from "../components/Home/SelectedWork";
import PartnersAndClients from "../components/Home/PartnersAndClients";
import BrandsCarousel from "../components/Home/BrandsCarousel";
import TeamSection from "../components/Home/TeamSection";
import FAQSection from "../components/Home/FAQSection";

const Home = () => {

  // --- FORCE SCROLL TO TOP ON PAGE LOAD ---
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Page load hote hi turant top par pahunch jayega
    });
  }, []);

  return (
    <div className="bg-black">
      <Hero />
      <AboutSection />
      <Services />
      <SelectedWork />
      <PartnersAndClients /> 
      <BrandsCarousel />
      <TeamSection />
      <FAQSection />
    </div>
  );
};

export default Home;