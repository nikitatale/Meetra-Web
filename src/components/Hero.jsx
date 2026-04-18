import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { HiArrowRight, HiLockClosed, HiStar, HiVideoCamera } from "react-icons/hi";

const Hero = () => {
  const navigate = useNavigate();

  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.13 }
    })
  };

  return (
    <section className="relative flex items-center justify-center px-6 md:px-16 py-7 min-h-[calc(100vh-80px)] overflow-hidden bg-[#020319]">

      <style>{`
        .hero-blob1 {
          position: absolute;
          width: 650px; height: 650px;
          background: radial-gradient(circle, rgba(84,91,248,0.16) 0%, transparent 70%);
          border-radius: 50%;
          top: -180px; left: -200px;
          pointer-events: none;
          animation: heroBlob 8s ease-in-out infinite alternate;
        }
        .hero-blob2 {
          position: absolute;
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(133,138,255,0.10) 0%, transparent 70%);
          border-radius: 50%;
          bottom: -100px; right: -100px;
          pointer-events: none;
          animation: heroBlob 10s ease-in-out infinite alternate-reverse;
        }
        @keyframes heroBlob {
          from { transform: scale(1) translate(0, 0); }
          to   { transform: scale(1.2) translate(20px, -20px); }
        }

        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(84,91,248,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(84,91,248,0.045) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 85% 70% at 50% 50%, black 10%, transparent 80%);
        }

        .badge-dot {
          width: 7px; height: 7px;
          background: #545BF8; border-radius: 50%;
          animation: badgePulse 2s ease-in-out infinite;
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(84,91,248,0.6); }
          50%       { box-shadow: 0 0 0 6px rgba(84,91,248,0); }
        }

        .hero-heading {
          background: linear-gradient(135deg, #ffffff 0%, #c7c9ff 50%, #858AFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .btn-primary {
          background: #545BF8;
          box-shadow: 0 4px 24px rgba(84,91,248,0.45);
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        .btn-primary:hover {
          background: #4349d6;
          box-shadow: 0 6px 32px rgba(84,91,248,0.65);
        }

        .btn-secondary {
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          background: rgba(255,255,255,0.03);
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .btn-secondary:hover {
          background: rgba(84,91,248,0.12);
          border-color: rgba(84,91,248,0.4);
        }

        .feature-pill {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 12px;
          color: #94a3b8;
          display: flex; align-items: center; gap: 6px;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .feature-pill:hover {
          background: rgba(84,91,248,0.1);
          border-color: rgba(84,91,248,0.3);
          color: #c7c9ff;
        }

        .hero-img-wrap {
          filter: drop-shadow(0 30px 70px rgba(84,91,248,0.4));
          animation: heroFloat 5.5s ease-in-out infinite;
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-16px); }
        }

        .img-ring {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          border: 1px solid rgba(84,91,248,0.15);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: ringPulse 4s ease-in-out infinite;
          pointer-events: none;
        }
        .img-ring2 {
          position: absolute;
          width: 520px; height: 520px;
          border-radius: 50%;
          border: 1px solid rgba(84,91,248,0.07);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: ringPulse 4s ease-in-out infinite 0.9s;
          pointer-events: none;
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.04); }
        }

        .scroll-hint {
          position: absolute; bottom: 28px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column;
          align-items: center; gap: 6px;
          animation: scrollFade 2.5s ease-in-out infinite;
        }
        .scroll-hint span { font-size: 10px; letter-spacing: 2px; color: #94a3b8; text-transform: uppercase; }
        .scroll-arrow {
          width: 16px; height: 16px;
          border-right: 1.5px solid #94a3b8;
          border-bottom: 1.5px solid #94a3b8;
          transform: rotate(45deg);
          animation: arrowBounce 1.4s ease-in-out infinite;
        }
        @keyframes scrollFade {
          0%, 100% { opacity: 0.2; } 50% { opacity: 0.5; }
        }
        @keyframes arrowBounce {
          0%, 100% { transform: rotate(45deg) translateY(0); }
          50%       { transform: rotate(45deg) translateY(5px); }
        }
      `}</style>

    
      <div className="hero-blob1" />
      <div className="hero-blob2" />
      <div className="hero-grid" />

      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-8 md:gap-16 relative z-10">

   
        <div className="text-center md:text-left">

      
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <div className="badge-dot" />
            <p className="text-xs text-gray-300 tracking-wide">Connect. Collaborate. Communicate</p>
          </motion.div>

      
          <motion.h1
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="hero-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-5"
          >
            Turn Miles<br />into Moments
          </motion.h1>

          
          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="text-slate-400 text-sm sm:text-base max-w-md mx-auto md:mx-0 leading-relaxed mb-8"
          >
            Whether you're working remotely, attending online classes, or connecting
            with clients - Meetra makes every meeting smooth, secure, and stress-free.
          </motion.p>

      
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-8"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/auth"
                className="btn-primary text-white px-7 py-3 rounded-full text-sm font-medium tracking-wide text-center block"
              >
                 <span className='flex justify-center items-center'> Start Meeting &nbsp; <HiArrowRight /></span>
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/about")}
              className="btn-secondary cursor-pointer text-white px-7 py-3 rounded-full text-sm font-medium tracking-wide"
            >
              About Us
            </motion.button>
          </motion.div>

       
          <motion.div
            custom={4} variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-wrap gap-2 justify-center md:justify-start"
          >
            {[
              { icon: <HiLockClosed/>, label: "End-to-End Encrypted" },
              { icon: <HiVideoCamera/>, label: "HD Video" },
              { icon: <HiStar/>, label: "Zero Lag" },
            ].map((pill) => (
              <div key={pill.label} className="feature-pill">
                <span>{pill.icon}</span>
                {pill.label}
              </div>
            ))}
          </motion.div>
        </div>

  
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          className="flex justify-center relative"
        >
          <div className="img-ring" />
          <div className="img-ring2" />
          <img
            src={assets.messagerVC}
            alt="Video meeting preview"
            className="hero-img-wrap relative z-10 w-[260px] sm:w-[320px] md:w-[440px] object-contain"
          />
        </motion.div>

      </div>

   
      <div className="scroll-hint hidden md:flex">
        <span>Scroll</span>
        <div className="scroll-arrow" />
      </div>

    </section>
  );
};

export default Hero;