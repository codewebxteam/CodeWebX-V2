import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";

function App() {
  return (
    <div className="relative w-full bg-black">
      <Navbar />
      <Hero />
      <AboutSection />
    </div>
  );
}

export default App;
