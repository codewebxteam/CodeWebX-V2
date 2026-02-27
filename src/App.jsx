import React from "react";
import Navbar from "./components/Common/Navbar";
import Home from "./pages/Home";

/**
 * Main App component.
 * It provides the global layout and renders the Home page content.
 */
function App() {
  return (
    <div className="relative w-full bg-black">
      {/* Fixed Navbar appears across all pages */}
      <Navbar />

      {/* Main content area */}
      <main>
        <Home />
      </main>

      {/* Background radial glow for a premium aesthetic */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-900/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
    </div>
  );
}

export default App;
