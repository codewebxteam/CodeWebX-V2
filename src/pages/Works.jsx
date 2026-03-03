import React, { useEffect } from "react";
import WorkHero from "../components/Works/WorkHero";
import WorkStats from "../components/Works/WorkStats";
import ProjectGrid from "../components/Works/ProjectGrid";
import WorkCTA from "../components/Works/WorkCTA";

/**
 * Works Page Component
 * Isme humne components ko alag rakha hai taaki future mein 
 * agar layout change karna ho toh hum easily individual sections ko update kar sakein.
 */
const Works = () => {
  
  // Page change hone par scroll top par reset karne ke liye
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    // Page title update karne ke liye
    document.title = "Our Works | CodeWebX Technologies";
  }, []);

  return (
    <div className="bg-black min-h-screen w-full">
      {/* 1. Hero Section: Introduction & Title */}
      <WorkHero />

      {/* 2. Stats Section: Trust metrics (16+ Projects, etc.) */}
      <WorkStats />

      {/* 3. Main Project Grid: Bento layout for Hello 11, ERP, etc. */}
      <ProjectGrid />

      {/* 4. Call to Action: Conversion before moving to Clients page */}
      <WorkCTA />
    </div>
  );
};

export default Works;