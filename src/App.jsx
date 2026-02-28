import React, { useEffect } from "react";
import Navbar from "./components/Common/Navbar";
import Footer from "./components/Common/Footer"; // Footer import kiya
import Home from "./pages/Home";
import Lenis from "@studio-freight/lenis"; // Premium smooth scrolling ke liye

/**
 * Main App component for CodeWebX Technologies.
 * 10 years experience logic: Implementing smooth scroll and global layout stability.
 */
function App() {
  // High-end smooth scroll implementation
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
    <div className="relative w-full bg-black selection:bg-lime-400 selection:text-black">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main content area */}
      <main className="relative z-10">
        <Home />
      </main>

      {/* Final Professional Footer */}
      <Footer />

      {/* PRO Background Aesthetic - Fixed artifacts with optimized blur */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-900/30 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-lime-900/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
    </div>
  );
}

export default App;
