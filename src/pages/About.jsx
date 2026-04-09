import React, { useEffect } from "react";
import SinceSection from "../components/About/SinceSection";
import VisionMission from "../components/About/VisionMission";
import WhyChooseUs from "../components/About/WhyChooseUs";
import Leadership from "../components/About/Leadership";

const About = () => {

  // --- FORCE SCROLL TO TOP ON PAGE LOAD ---
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Taaki user ko jump na dikhe aur page top se load ho
    });
  }, []);

  return (
    <div className="bg-black min-h-screen">
      {/* Aapka Navbar aur Footer global Layout mein honge, 
        yahan sirf About page ke main sections hain.
      */}
      
      <SinceSection />
      <VisionMission />
      <WhyChooseUs />
      <Leadership />
    </div>
  );
};

export default About;