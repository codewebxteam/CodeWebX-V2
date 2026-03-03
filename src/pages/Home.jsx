import React from "react";
import Hero from "../components/Home/Hero";
import AboutSection from "../components/Home/AboutSection";
import Services from "../components/Home/Services";
import SelectedWork from "../components/Home/SelectedWork";
import PartnersAndClients from "../components/Home/PartnersAndClients"; // Naya import
import BrandsCarousel from "../components/Home/BrandsCarousel";
import TeamSection from "../components/Home/TeamSection";
import FAQSection from "../components/Home/FAQSection";

const Home = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <Services />
      <SelectedWork />
      <PartnersAndClients /> 
      <BrandsCarousel />
      <TeamSection />
      <FAQSection />
    </>
  );
};

export default Home;
