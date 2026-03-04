import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { HiFire, HiWifi } from "react-icons/hi";

const stats = [
  { value: "10K+", label: "Meetings Hosted" },
  { value: "99.9%", label: "Uptime" },
  { value: "150+", label: "Countries" },
];

const textVariant = {
  hidden: { opacity: 0, x: 40 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.12 }
  })
};

export default function About() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center gap-14 max-md:px-6 md:px-16 bg-[#020319] min-h-screen overflow-hidden py-20">

      <style>{`
        .about-blob {
          position: absolute;
          width: 550px; height: 550px;
          background: radial-gradient(circle, rgba(84,91,248,0.13) 0%, transparent 70%);
          border-radius: 50%;
          bottom: -120px; right: -120px;
          pointer-events: none;
          animation: aboutBlob 9s ease-in-out infinite alternate;
        }
        .about-blob2 {
          position: absolute;
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(133,138,255,0.08) 0%, transparent 70%);
          border-radius: 50%;
          top: -80px; left: -80px;
          pointer-events: none;
          animation: aboutBlob 7s ease-in-out infinite alternate-reverse;
        }
        @keyframes aboutBlob { from { transform: scale(1); } to { transform: scale(1.2) translate(-10px, 10px); } }

        .about-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(84,91,248,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(84,91,248,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 80% 80% at 30% 50%, black 10%, transparent 80%);
        }

       
        .about-img-frame {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .about-img-frame::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(84,91,248,0.15) 0%, transparent 60%);
          z-index: 1;
          border-radius: 20px;
          pointer-events: none;
        }
        .about-img-frame::after {
          content: '';
          position: absolute; inset: 0;
          border-radius: 20px;
          border: 1px solid rgba(84,91,248,0.2);
          z-index: 2;
          pointer-events: none;
        }

       
        .play-btn {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          z-index: 5;
          width: 60px; height: 60px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255,255,255,0.25);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.3s;
        }
        .play-btn:hover { background: rgba(84,91,248,0.35); }

       
        .about-stat {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 14px 18px;
          text-align: center;
          transition: background 0.3s, border-color 0.3s, transform 0.3s;
          flex: 1;
          min-width: 90px;
        }
        .about-stat:hover {
          background: rgba(84,91,248,0.08);
          border-color: rgba(84,91,248,0.25);
          transform: translateY(-4px);
        }

     
        .about-label {
          font-size: 11px; letter-spacing: 3px;
          text-transform: uppercase;
          color: #545BF8; font-weight: 600;
        }
        .about-heading {
          background: linear-gradient(135deg, #ffffff 0%, #858AFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: clamp(28px, 3.5vw, 42px);
          font-weight: 800;
          line-height: 1.2;
        }

      
        .about-cta {
          display: inline-flex; align-items: center; gap: 8px;
          background: #545BF8;
          color: white;
          font-size: 13px; font-weight: 600;
          padding: 12px 28px;
          border-radius: 999px;
          box-shadow: 0 4px 20px rgba(84,91,248,0.4);
          transition: background 0.3s, box-shadow 0.3s;
        }
        .about-cta:hover {
          background: #4349d6;
          box-shadow: 0 6px 30px rgba(84,91,248,0.6);
        }
      `}</style>

      <div className="about-blob" />
      <div className="about-blob2" />
      <div className="about-grid" />

    
      <motion.div
        initial={{ opacity: 0, x: -60, scale: 0.94 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true }}
        className="about-img-frame relative z-10"
        style={{ boxShadow: '0 30px 80px rgba(84,91,248,0.3)' }}
      >
        <img
          className="max-w-sm w-full object-cover rounded-2xl block"
          src={assets.peoples}
          alt="Meetra team"
        />

    
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="play-btn"
        >
          <svg width="14" height="17" viewBox="0 0 15 18" fill="none">
            <path d="M1.027 3.371c0-1.374 1.512-2.213 2.678-1.484l9.11 5.693a1.75 1.75 0 0 1 0 2.969l-9.11 5.693c-1.166.729-2.678-.11-2.678-1.484z" fill="#fff" />
          </svg>
        </motion.div>

        
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 right-4 z-10 bg-indigo-500/90 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ boxShadow: '0 4px 16px rgba(84,91,248,0.5)' }}
        >
         <span className="flex justify-center items-center"> <HiFire/> &nbsp; Global Platform</span>
        </motion.div>
      </motion.div>

    
      <div className="relative z-10 max-w-lg">

        <motion.div custom={0} variants={textVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="about-label mb-3">Who we are</div>
          <h2 className="about-heading mb-2">What we do?</h2>
          <div className="w-20 h-[2.5px] rounded-full bg-gradient-to-r from-indigo-500 to-[#DDD9FF] mb-6" />
        </motion.div>

        <motion.p custom={1} variants={textVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-slate-400 text-sm leading-relaxed mb-4"
        >
          Meetra is a modern video meeting platform designed to make online communication simple, secure, and seamless. Whether you're connecting with friends, collaborating with your team, or hosting professional meetings — every conversation feels effortless.
        </motion.p>

        <motion.p custom={2} variants={textVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-slate-400 text-sm leading-relaxed mb-4"
        >
          We believe virtual meetings should be fast to join, easy to manage, and accessible from anywhere. Meetra focuses on clean design, smooth performance, and reliable connectivity — so you never have to worry about the tech.
        </motion.p>

        <motion.p custom={3} variants={textVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-slate-500 text-sm leading-relaxed mb-8 italic"
        >
          Our mission: empower people to connect anytime, anywhere — without technical barriers.
        </motion.p>

        <motion.div custom={4} variants={textVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="flex gap-3 mb-8"
        >
          {stats.map((s) => (
            <div key={s.label} className="about-stat">
              <div className="text-xl font-bold text-indigo-400">{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div custom={5} variants={textVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link to="/features" className="about-cta">
              <span>Explore Features</span>
              <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
                <path d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z" fill="#fff" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

      </div>

    </section>
  );
}