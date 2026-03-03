import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Common/Navbar";
import Home from "./pages/Home";
import Careers from "./pages/Careers"; 
import Blog from "./pages/Blog"; // 1. Blog page ko import karein

/**
 * Updated App component.
 * Layout wahi hai, bas ab Blog routing bhi handle kar raha hai.
 */
function App() {
  return (
    <Router>
      <div className="relative w-full bg-black min-h-screen">
        {/* Fixed Navbar appears across all pages */}
        <Navbar />

        {/* Main content area */}
        <main>
          <Routes>
            {/* Default Route: Home */}
            <Route path="/" element={<Home />} />
            
            {/* Careers Route */}
            <Route path="/careers" element={<Careers />} />

            {/* 2. New Blog Route - Isse blank page issue solve ho jayega */}
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>

        {/* Background radial glow for a premium aesthetic */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-900/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      </div>
    </Router>
  );
}

export default App;