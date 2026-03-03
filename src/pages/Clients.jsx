import React, { useEffect } from "react";
import ClientHero from "../components/Clients/ClientHero";
import ClientLogos from "../components/Clients/ClientLogos";
import ClientTestimonials from "../components/Clients/ClientTestimonials";
import ClientCTA from "../components/Clients/ClientCTA";

const Clients = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Our Clients | CodeWebX Technologies";
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <ClientHero />
      <ClientLogos /> {/* Infinite moving logo strip */}
      <ClientTestimonials /> {/* Detailed reviews */}
      <ClientCTA />
    </div>
  );
};

export default Clients;