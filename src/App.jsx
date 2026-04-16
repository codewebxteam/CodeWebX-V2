import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Lenis from "@studio-freight/lenis";

// --- MAIN SITE COMPONENTS ---
import Navbar from "./components/Common/Navbar";
import Footer from "./components/Common/Footer";
import EventPopup from "./components/Common/EventPopup"; // <-- ADDED EVENT POPUP IMPORT
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Careers from "./pages/Careers";
import Works from "./pages/Works";
import AllProjects from "./pages/AllProjects";
import Clients from "./pages/Clients";

// BLOG LOGIC
import Blog from "./pages/Blog";
import Articles from "./pages/Articles";
import BlogDetail from "./pages/BlogDetail";

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
import InternList from "./Admin/pages/Interns/InternList";
import InternForm from "./Admin/pages/Interns/InternForm";

// --- NEW: ENTERPRISE SUITE COMPONENTS ---
import EmployeeManager from "./Admin/pages/Employees/EmployeeManager";
import EmployeeForm from "./Admin/pages/Employees/EmployeeForm";
import FinanceLedger from "./Admin/pages/Finance/FinanceLedger";
import TransactionForm from "./Admin/pages/Finance/TransactionForm";
import ProjectOps from "./Admin/pages/Operations/ProjectOps";
import ProjectOpsForm from "./Admin/pages/Operations/ProjectOpsForm";

// --- WRAPPER COMPONENT ---
const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  // --- EVENT POPUP TOGGLE ---
  // Yahan true ya false likhein popup ko dikhane ya chhupane ke liye
  const showEventPopup = false;

  // --- CRITICAL FIX: Kill Lenis on Admin Routes ---
  useEffect(() => {
    let lenis;

    // Only initialize Lenis if NOT on an admin path
    if (!isAdminPath) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
      });

      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
    }

    return () => {
      if (lenis) lenis.destroy();
    };
  }, [isAdminPath]); // Dependency on path change

  return (
    <div className="relative w-full bg-black min-h-screen selection:bg-lime-400 selection:text-black">
      {/* Event Popup: Toggle aur admin path dono check karega */}
      {!isAdminPath && showEventPopup && <EventPopup />}

      {/* Navbar: Only for Public Pages */}
      {!isAdminPath && <Navbar />}

      <main className="relative z-10">
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/services" element={<Services />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/works" element={<Works />} />
          <Route path="/allprojects" element={<AllProjects />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/blog/:id" element={<BlogDetail />} />

          {/* --- ADMIN AUTH --- */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* --- PROTECTED ADMIN ROUTES (CMS) --- */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/inquiries"
            element={
              <ProtectedRoute>
                <Inquiries />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/applicants"
            element={
              <ProtectedRoute>
                <Applicants />
              </ProtectedRoute>
            }
          />

          {/* Portfolio */}
          <Route
            path="/admin/portfolio"
            element={
              <ProtectedRoute>
                <ProjectList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/portfolio/add"
            element={
              <ProtectedRoute>
                <ProjectForm />
              </ProtectedRoute>
            }
          />

          {/* Clients */}
          <Route
            path="/admin/clients"
            element={
              <ProtectedRoute>
                <ClientList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/clients/add"
            element={
              <ProtectedRoute>
                <ClientForm />
              </ProtectedRoute>
            }
          />

          {/* Blogs */}
          <Route
            path="/admin/blogs"
            element={
              <ProtectedRoute>
                <BlogList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs/add"
            element={
              <ProtectedRoute>
                <BlogEditor />
              </ProtectedRoute>
            }
          />

          {/* Interns */}
          <Route
            path="/admin/interns"
            element={
              <ProtectedRoute>
                <InternList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/interns/add"
            element={
              <ProtectedRoute>
                <InternForm />
              </ProtectedRoute>
            }
          />

          {/* --- PROTECTED ENTERPRISE SUITE ROUTES --- */}
          <Route
            path="/admin/employees"
            element={
              <ProtectedRoute>
                <EmployeeManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/employees/add"
            element={
              <ProtectedRoute>
                <EmployeeForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/accounts"
            element={
              <ProtectedRoute>
                <FinanceLedger />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/accounts/add"
            element={
              <ProtectedRoute>
                <TransactionForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/operations"
            element={
              <ProtectedRoute>
                <ProjectOps />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/operations/add"
            element={
              <ProtectedRoute>
                <ProjectOpsForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {!isAdminPath && <Footer />}

      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-900/30 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-lime-900/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
