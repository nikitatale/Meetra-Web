import { motion } from "framer-motion";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import LockIcon from "@mui/icons-material/Lock";
import ChatIcon from "@mui/icons-material/Chat";
import { assets } from "../assets/assets";

const features = [
  {
    icon: <VideoCallIcon style={{ fontSize: 22 }} />,
    iconColor: "#858AFF",
    iconBg: "rgba(84,91,248,0.12)",
    title: "Instant Video Meetings",
    desc: "Start or join high-quality video calls in seconds. No complex setup - just enter your meeting code and connect instantly.",
    glow: "rgba(84,91,248,0.2)",
  },
  {
    icon: <LockIcon style={{ fontSize: 22 }} />,
    iconColor: "#4ade80",
    iconBg: "rgba(74,222,128,0.1)",
    title: "Secure Authentication",
    desc: "Your privacy matters. Meetra uses secure login and encrypted sessions to keep every conversation safe.",
    glow: "rgba(74,222,128,0.15)",
  },
  {
    icon: <ChatIcon style={{ fontSize: 22 }} />,
    iconColor: "#fb923c",
    iconBg: "rgba(251,146,60,0.1)",
    title: "Real-Time Chat",
    desc: "Communicate instantly during meetings with built-in live chat. Send messages, share links - responsive on all devices.",
    glow: "rgba(251,146,60,0.15)",
  },
];

const cardVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.15 }
  })
};

export default function Features() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#020319] overflow-hidden px-6 md:px-16 py-20 gap-12 md:gap-20">

      <style>{`
        .feat-blob {
          position: absolute;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(84,91,248,0.12) 0%, transparent 70%);
          border-radius: 50%;
          top: -100px; right: -100px;
          pointer-events: none;
          animation: featBlob 8s ease-in-out infinite alternate;
        }
        @keyframes featBlob { from { transform: scale(1); } to { transform: scale(1.2) translate(-20px, 20px); } }

        .feat-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(84,91,248,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(84,91,248,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 80% 80% at 80% 50%, black 10%, transparent 80%);
        }

        .feat-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 22px 24px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          cursor: pointer;
          transition: background 0.35s ease, border-color 0.35s ease, transform 0.3s ease;
          max-width: 420px;
        }
        .feat-card:hover {
          background: rgba(255,255,255,0.055);
          border-color: rgba(84,91,248,0.25);
          transform: translateX(6px);
        }

        .feat-icon-wrap {
          border-radius: 12px;
          padding: 10px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feat-section-label {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #545BF8;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .feat-heading {
          background: linear-gradient(135deg, #ffffff 0%, #858AFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 12px;
        }
      `}</style>

      <div className="feat-blob" />
      <div className="feat-grid" />

    
      <motion.div
        initial={{ opacity: 0, x: -60, scale: 0.93 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true }}
        className="relative flex-shrink-0"
        style={{ filter: 'drop-shadow(0 30px 60px rgba(84,91,248,0.35))' }}
      >
        <img
          className="max-w-sm w-full xl:max-w-lg rounded-2xl"
          src={assets.groupImage}
          alt="group image"
        />
    
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-4 -right-4 bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg"
          style={{ boxShadow: '0 8px 24px rgba(84,91,248,0.5)' }}
        >
          ✦ Built for teams
        </motion.div>
      </motion.div>

      
      <div className="relative z-10 flex flex-col gap-5">
        <div className="mb-2">
          <div className="feat-section-label">Why Meetra?</div>
          <h2 className="feat-heading">Everything you<br />need to connect</h2>
          <p className="text-slate-500 text-sm max-w-xs">Powerful features designed for seamless, secure, and instant communication.</p>
        </div>

        {features.map((f, i) => (
          <motion.div
            key={f.title}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="feat-card"
            style={{ '--glow': f.glow }}
          >
            <div
              className="feat-icon-wrap"
              style={{ background: f.iconBg, color: f.iconColor }}
            >
              {f.icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100 mb-1">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}