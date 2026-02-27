import React from "react";
import Hero from "../components/Home/Hero";
import AboutSection from "../components/Home/AboutSection";
import SelectedWork from "../components/Home/SelectedWork";

/**
 * Home page component for CodeWebX Technologies.
 * Combines all high-end sections into a single landing page.
 */
const Home = () => {
  return (
    <>
      {/* 1. Hero Section: The "We develop Apps" dark grid intro */}
      <Hero />

      {/* 2. About Section: The clean white section with ultra-thin typography */}
      <AboutSection />

      {/* 3. Selected Work: The high-end portfolio grid with project IDs */}
      <SelectedWork />

      {/* Footer can be added here later */}
    </>
  );
};

export default Home;
