import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../components/Loader";

const Authentication = () => {
  const navigate = useNavigate();
  const { handleLogin, handleRegister } = useContext(AuthContext);

  const [isSignup, setIsSignup] = useState(false);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isSignup) {
        await handleRegister(fullname, username, password);
        setFullname(""); setUsername(""); setPassword("");
        setIsSignup(false);
      } else {
        await handleLogin(username, password);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 }
    })
  };

  return (
    <div className="relative bg-[#020319] min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <style>{`
        .auth-blob1 {
          position: absolute; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(84,91,248,0.15) 0%, transparent 70%);
          border-radius: 50%; top: -150px; left: -150px;
          pointer-events: none;
          animation: authBlob 8s ease-in-out infinite alternate;
        }
        .auth-blob2 {
          position: absolute; width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(133,138,255,0.1) 0%, transparent 70%);
          border-radius: 50%; bottom: -100px; right: -100px;
          pointer-events: none;
          animation: authBlob 10s ease-in-out infinite alternate-reverse;
        }
        @keyframes authBlob {
          from { transform: scale(1); } to { transform: scale(1.2) translate(15px,-15px); }
        }
        .auth-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(84,91,248,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(84,91,248,0.04) 1px, transparent 1px);
          background-size: 55px 55px; pointer-events: none;
          mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 10%, transparent 80%);
        }

        .auth-card {
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.09);
          backdrop-filter: blur(24px);
          border-radius: 24px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(84,91,248,0.08);
        }

        .auth-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 11px 14px;
          color: #e2e8f0;
          font-size: 13.5px;
          outline: none;
          transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
        }
        .auth-input::placeholder { color: #475569; }
        .auth-input:focus {
          border-color: rgba(84,91,248,0.55);
          background: rgba(84,91,248,0.07);
          box-shadow: 0 0 0 3px rgba(84,91,248,0.15);
        }

        .auth-label {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.4px;
          color: #94a3b8;
          margin-bottom: 6px;
          display: block;
        }

        .auth-btn {
          width: 100%; padding: 13px;
          border-radius: 12px;
          background: #545BF8;
          color: white;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.3px;
          border: none; cursor: pointer;
          box-shadow: 0 6px 24px rgba(84,91,248,0.45);
          transition: background 0.3s, box-shadow 0.3s;
        }
        .auth-btn:hover { background: #4349d6; box-shadow: 0 8px 32px rgba(84,91,248,0.6); }
        .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .auth-divider {
          display: flex; align-items: center; gap: 12px;
          margin: 4px 0;
        }
        .auth-divider::before, .auth-divider::after {
          content: ''; flex: 1; height: 1px;
          background: rgba(255,255,255,0.07);
        }

        .auth-brand {
          background: linear-gradient(90deg, #ffffff, #858AFF, #ffffff);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: brandShimmer 3.5s linear infinite;
          font-weight: 800; letter-spacing: 4px; font-size: 15px;
        }
        @keyframes brandShimmer { to { background-position: 200% center; } }
      `}</style>

      <div className="auth-blob1" />
      <div className="auth-blob2" />
      <div className="auth-grid" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="auth-card w-full max-w-sm px-7 py-8 relative z-10"
      >
      
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="flex items-center justify-between mb-7"
        >
          <div className="flex items-center gap-2">
            <span className="auth-brand">MEETRA</span>
            <img src={assets.chatlogo} alt="logo" width={28} />
          </div>
          <div className="text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            {isSignup ? "New Account" : "Welcome back"}
          </div>
        </motion.div>

     
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">
            {isSignup ? "Create account" : "Sign in"}
          </h2>
          <p className="text-slate-500 text-xs">
            {isSignup ? "Fill in your details to get started with Meetra." : "Enter your credentials to access your meetings."}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence>
            {isSignup && (
              <motion.div
                key="fullname"
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <label className="auth-label">Full Name</label>
                <input
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="Your full name"
                  className="auth-input"
                  required type="text"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
            <label className="auth-label">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="auth-input"
              required type="text"
            />
          </motion.div>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
            <label className="auth-label">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="auth-input"
              required type="password"
            />
          </motion.div>

         
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0, x: [0, -8, 8, -8, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5"
              >
                <span className="text-red-400 text-xs">⚠</span>
                <p className="text-red-400 text-xs">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="pt-1">
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              type="submit" disabled={loading}
              className="auth-btn"
            >
              {isSignup ? "Create Account →" : "Sign In "}
            </motion.button>
          </motion.div>
        </form>

     
        <div className="auth-divider mt-6">
          <span className="text-xs text-slate-600">
            {isSignup ? "Already have an account?" : "New to Meetra?"}
          </span>
        </div>

        <motion.p
          custom={5} variants={fadeUp} initial="hidden" animate="visible"
          className="text-center text-xs mt-3"
        >
          <span
            onClick={() => { setIsSignup(!isSignup); setError(""); }}
            className="text-indigo-400 hover:text-indigo-300 cursor-pointer font-medium transition-colors"
          >
            {isSignup ? "Sign in instead" : "Create a free account"}
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Authentication;