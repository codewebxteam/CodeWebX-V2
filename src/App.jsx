import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

import Navbar from "./components/Common/Navbar";
import Footer from "./components/Common/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import AllProjects from "./pages/AllProjects"; // Updated to AllProjects
import Clients from "./pages/Clients";

function App() {
  // Premium smooth scroll logic
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="relative w-full bg-black min-h-screen selection:bg-lime-400 selection:text-black">
        {/* Fixed Navbar visible on all pages */}
        <Navbar />

        {/* Main Routed Content */}
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            
            {/* Main Navigation Route for Projects */}
            <Route path="/allprojects" element={<AllProjects />} />
            {/* Backward compatibility ke liye /works ko bhi yahi point kar sakte hain */}
            <Route path="/works" element={<AllProjects />} /> 
            
            <Route path="/clients" element={<Clients />} />
          </Routes>
        </main>

        {/* Footer visible on all pages */}
        <Footer />

        {/* Premium Background Glow for Aesthetic Depth */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-900/30 blur-[150px] rounded-full pointer-events-none -z-10"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-lime-900/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      </div>
    </Router>
  );
}

export default App;