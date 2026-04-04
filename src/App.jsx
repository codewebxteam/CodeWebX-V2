import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

// --- MAIN SITE COMPONENTS ---
import Navbar from "./components/Common/Navbar";
import Footer from "./components/Common/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import AllProjects from "./pages/AllProjects";
import Clients from "./pages/Clients";

// --- ADMIN PANEL COMPONENTS ---
import LoginPage from "./Admin/pages/Login";
import Dashboard from "./Admin/pages/Dashboard";
import ProtectedRoute from "./Admin/components/ProtectedRoute";
import Inquiries from "./Admin/pages/Inquiries";
import Applicants from "./Admin/pages/Applicants";
import ProjectList from "./Admin/pages/Portfolio/ProjectList";
import ProjectForm from "./Admin/pages/Portfolio/ProjectForm";
import ClientList from "./Admin/pages/Clients/ClientList";
import ClientForm from "./Admin/pages/Clients/ClientForm";
import BlogList from "./Admin/pages/Blog/BlogList";
import BlogEditor from "./Admin/pages/Blog/BlogEditor";

// --- WRAPPER COMPONENT TO HANDLE CONDITIONAL UI ---
const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <div className="relative w-full bg-black min-h-screen selection:bg-lime-400 selection:text-black">
      {/* Navbar: Sirf tab dikhega jab path admin na ho */}
      {!isAdminPath && <Navbar />}

      <main className="relative z-10">
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/allprojects" element={<AllProjects />} />
          <Route path="/works" element={<AllProjects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/clients" element={<Clients />} />

          {/* --- ADMIN AUTH ROUTE --- */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* --- PROTECTED ADMIN ROUTES --- */}
          {/* Dashboard & Data Streams */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/inquiries" element={<ProtectedRoute><Inquiries /></ProtectedRoute>} />
          <Route path="/admin/applicants" element={<ProtectedRoute><Applicants /></ProtectedRoute>} />

          {/* Portfolio Management */}
          <Route path="/admin/portfolio" element={<ProtectedRoute><ProjectList /></ProtectedRoute>} />
          <Route path="/admin/portfolio/add" element={<ProtectedRoute><ProjectForm /></ProtectedRoute>} />

          {/* Client Management */}
          <Route path="/admin/clients" element={<ProtectedRoute><ClientList /></ProtectedRoute>} />
          <Route path="/admin/clients/add" element={<ProtectedRoute><ClientForm /></ProtectedRoute>} />

          {/* Blog Management */}
          <Route path="/admin/blogs" element={<ProtectedRoute><BlogList /></ProtectedRoute>} />
          <Route path="/admin/blogs/add" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />

        </Routes>
      </main>

      {/* Footer: Sirf tab dikhega jab path admin na ho */}
      {!isAdminPath && <Footer />}

      {/* Background Glows: Ye hamesha rahenge depth ke liye */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-900/30 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-lime-900/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
    </div>
  );
};

function App() {
  // Premium smooth scroll logic (Lenis)
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
      <AppContent />
    </Router>
  );
}

export default App;