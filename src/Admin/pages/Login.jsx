import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Path: pages se bahar(Admin) -> phir bahar(src) -> firebase.js
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("INVALID TERMINAL ID OR ACCESS KEY.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* --- BACKGROUND DESIGN (Grid & Glow) --- */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:40px_40px]"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#00a63e]/10 blur-[120px] rounded-full"></div>

      {/* --- LOGIN BOX --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] bg-zinc-950 border border-white/5 p-10 md:p-12 rounded-[3rem] relative z-10 shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#00a63e]">
            <ShieldCheck size={42} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Command <span className="text-[#00a63e]">Auth</span></h2>
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 mt-2">Codewebx / Admin Protocol</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Terminal ID</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-[#00a63e] transition-colors" size={16} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@codewebx.in"
                className="w-full bg-black border border-white/5 p-4 pl-12 rounded-2xl text-xs font-bold text-white outline-none focus:border-[#00a63e] focus:bg-zinc-900/50 transition-all placeholder:text-zinc-800"
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Access Key</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-[#00a63e] transition-colors" size={16} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-white/5 p-4 pl-12 rounded-2xl text-xs font-bold text-white outline-none focus:border-[#00a63e] focus:bg-zinc-900/50 transition-all placeholder:text-zinc-800"
                required 
              />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[9px] font-black uppercase text-center tracking-widest bg-red-500/10 py-3 rounded-lg border border-red-500/20">
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button 
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 transition-all ${loading ? "bg-zinc-800 text-zinc-500" : "bg-[#00a63e] text-white hover:bg-white hover:text-black shadow-lg"}`}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Initialize Session"}
            {!loading && <ArrowRight size={16} />}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;