import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiExclamation } from "react-icons/hi";

export default function PageNotFound() {
  return (
    <div className="relative min-h-screen bg-[#020319] flex flex-col items-center justify-center px-6 overflow-hidden">
      <style>{`
        .e404-blob1 {
          position: absolute; width: 550px; height: 550px;
          background: radial-gradient(circle, rgba(84,91,248,0.14) 0%, transparent 70%);
          border-radius: 50%; top: -150px; left: -150px;
          pointer-events: none;
          animation: e404Blob 9s ease-in-out infinite alternate;
        }
        .e404-blob2 {
          position: absolute; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(133,138,255,0.09) 0%, transparent 70%);
          border-radius: 50%; bottom: -100px; right: -80px;
          pointer-events: none;
          animation: e404Blob 7s ease-in-out infinite alternate-reverse;
        }
        @keyframes e404Blob { from { transform: scale(1); } to { transform: scale(1.25) translate(10px,-10px); } }

        .e404-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(84,91,248,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(84,91,248,0.04) 1px, transparent 1px);
          background-size: 55px 55px; pointer-events: none;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 80%);
        }

        .e404-number {
          font-size: clamp(100px, 20vw, 180px);
          font-weight: 900;
          line-height: 1;
          background: linear-gradient(135deg, rgba(84,91,248,0.5) 0%, rgba(133,138,255,0.15) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -4px;
          user-select: none;
        }

        .e404-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(84,91,248,0.1);
          border: 1px solid rgba(84,91,248,0.25);
          color: #858AFF;
          font-size: 11px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 6px 14px; border-radius: 999px;
        }

        .e404-btn-primary {
          background: #545BF8; color: white;
          font-size: 13px; font-weight: 600;
          padding: 12px 28px; border-radius: 999px; border: none; cursor: pointer;
          box-shadow: 0 6px 24px rgba(84,91,248,0.45);
          transition: background 0.3s, box-shadow 0.3s;
          text-decoration: none; display: inline-block;
        }
        .e404-btn-primary:hover { background: #4349d6; box-shadow: 0 8px 32px rgba(84,91,248,0.6); }

        .e404-btn-ghost {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3b8;
          font-size: 13px; font-weight: 500;
          padding: 12px 28px; border-radius: 999px; cursor: pointer;
          transition: background 0.3s, border-color 0.3s, color 0.3s;
          text-decoration: none; display: inline-block;
        }
        .e404-btn-ghost:hover {
          background: rgba(84,91,248,0.1);
          border-color: rgba(84,91,248,0.3); color: white;
        }

      
        .e404-glitch {
          animation: glitchFlicker 5s ease-in-out infinite;
        }
        @keyframes glitchFlicker {
          0%, 90%, 100% { opacity: 1; transform: translateX(0); }
          92% { opacity: 0.8; transform: translateX(-3px); }
          94% { opacity: 1; transform: translateX(3px); }
          96% { opacity: 0.9; transform: translateX(-1px); }
          98% { opacity: 1; transform: translateX(0); }
        }

        .e404-heading {
          background: linear-gradient(135deg, #ffffff 0%, #858AFF 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div className="e404-blob1" />
      <div className="e404-blob2" />
      <div className="e404-grid" />

      <div className="relative z-10 flex flex-col items-center text-center gap-5">

    
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="e404-badge"
        >
          <span><HiExclamation/> </span> Page Not Found
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          className="e404-number e404-glitch select-none"
        >
          404
        </motion.div>

        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="e404-heading text-2xl md:text-3xl font-bold -mt-4"
        >
          Oops! Lost in space
        </motion.h2>

       
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-slate-500 text-sm max-w-sm leading-relaxed"
        >
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </motion.p>

      
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex items-center gap-3 mt-2 flex-wrap justify-center"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link to="/" className="e404-btn-primary"> Go Home</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link to="/auth" className="e404-btn-ghost">Sign In</Link>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}