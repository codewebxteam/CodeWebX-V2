import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Common/Navbar";
import Home from "./pages/Home";
import Careers from "./pages/Careers"; // Aapka naya page

/**
 * Updated App component.
 * Layout wahi hai, bas ab routing handle kar raha hai.
 */
function App() {
  return (
    <Router>
      <div className="relative w-full bg-black">
        {/* Fixed Navbar appears across all pages */}
        <Navbar />

        {/* Main content area */}
        <main>
          <Routes>
            {/* Default Route: Home */}
            <Route path="/" element={<Home />} />
            
            {/* New Careers Route */}
            <Route path="/careers" element={<Careers />} />
          </Routes>
        </main>

        {/* Background radial glow for a premium aesthetic */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-900/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      </div>
    </Router>
  );
}

export default App;