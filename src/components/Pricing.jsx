import { motion } from "framer-motion";

const plans = [
  {
    name: "Basic",
    price: "Free",
    priceNote: "forever",
    desc: "Perfect for individuals getting started",
    features: [
      "Join unlimited meetings",
      "Create meeting codes",
      "Real-time chat",
      "Meeting history access",
      "Up to 40 mins per meeting",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$4.99",
    priceNote: "/month",
    desc: "Best for freelancers & growing teams",
    badge: "Most Popular",
    features: [
      "Everything in Basic",
      "Unlimited meeting duration",
      "HD video quality",
      "Priority connection stability",
      "Advanced meeting history",
      "Email support",
    ],
    cta: "Get Pro",
    highlight: true,
  },
  {
    name: "Business",
    price: "$14.99",
    priceNote: "/month",
    desc: "For organizations that need full control",
    features: [
      "Everything in Pro",
      "Team dashboard",
      "Admin controls",
      "Enhanced security",
      "Dedicated support",
      "Custom meeting branding",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.15 }
  })
};

export default function Pricing() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-[#020319] overflow-hidden px-6 py-24">

      <style>{`
        .price-blob1 {
          position: absolute;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(84,91,248,0.13) 0%, transparent 70%);
          border-radius: 50%;
          top: -150px; left: -200px;
          pointer-events: none;
          animation: pBlob 9s ease-in-out infinite alternate;
        }
        .price-blob2 {
          position: absolute;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(133,138,255,0.09) 0%, transparent 70%);
          border-radius: 50%;
          bottom: -80px; right: -80px;
          pointer-events: none;
          animation: pBlob 7s ease-in-out infinite alternate-reverse;
        }
        @keyframes pBlob { from { transform: scale(1); } to { transform: scale(1.25) translate(15px,-15px); } }

        .price-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(84,91,248,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(84,91,248,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 10%, transparent 80%);
        }

        
        .price-card {
          width: 280px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 28px 24px 32px;
          backdrop-filter: blur(12px);
          transition: border-color 0.35s ease, transform 0.3s ease, background 0.3s ease;
          position: relative;
        }
        .price-card:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(84,91,248,0.3);
          transform: translateY(-6px);
        }

      
        .price-card-highlight {
          background: linear-gradient(160deg, #545BF8 0%, #3b42d4 100%);
          border: 1px solid rgba(133,138,255,0.5);
          box-shadow: 0 20px 60px rgba(84,91,248,0.45), 0 0 0 1px rgba(133,138,255,0.2);
        }
        .price-card-highlight:hover {
          background: linear-gradient(160deg, #6168fa 0%, #4349d6 100%);
          border-color: rgba(133,138,255,0.7);
          transform: translateY(-10px);
        }

     
        .price-badge {
          position: absolute;
          top: -13px; left: 50%;
          transform: translateX(-50%);
          background: rgba(133,138,255,0.2);
          border: 1px solid rgba(133,138,255,0.4);
          color: #c7c9ff;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          padding: 4px 14px;
          border-radius: 999px;
          white-space: nowrap;
          backdrop-filter: blur(8px);
        }

      
        .price-feature {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 13px;
          padding: 5px 0;
        }
        .price-check {
          width: 16px; height: 16px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-size: 9px;
          font-weight: 700;
        }

        
        .price-btn-dark {
          width: 100%; padding: 11px;
          border-radius: 999px;
          background: #545BF8;
          color: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 20px rgba(84,91,248,0.4);
          transition: background 0.3s, box-shadow 0.3s;
        }
        .price-btn-dark:hover { background: #4349d6; box-shadow: 0 6px 28px rgba(84,91,248,0.6); }

        .price-btn-light {
          width: 100%; padding: 11px;
          border-radius: 999px;
          background: white;
          color: #4349d6;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: background 0.3s;
        }
        .price-btn-light:hover { background: #e0e0ff; }

        
        .price-label {
          font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
          color: #545BF8; font-weight: 600;
        }
        .price-heading {
          background: linear-gradient(135deg, #ffffff 0%, #858AFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: clamp(30px, 4vw, 46px);
          font-weight: 800;
          line-height: 1.15;
        }
      `}</style>

      <div className="price-blob1" />
      <div className="price-blob2" />
      <div className="price-grid" />

    
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-14 relative z-10"
      >
        <div className="price-label mb-3">Pricing</div>
        <h2 className="price-heading mb-4">Simple, transparent<br />pricing</h2>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">
          No hidden fees. No surprises. Pick a plan that works for you and upgrade anytime.
        </p>
      </motion.div>

   
      <div className="flex flex-wrap items-center justify-center gap-5 relative z-10">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={plan.highlight ? { y: -10 } : {}}
            animate={plan.highlight ? { y: [0, -8, 0] } : {}}
            transition={plan.highlight ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : {}}
            className={`price-card ${plan.highlight ? 'price-card-highlight' : ''}`}
          >
            {plan.badge && <div className="price-badge">{plan.badge}</div>}

          
            <div className="mb-5">
              <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${plan.highlight ? 'text-indigo-200' : 'text-indigo-400'}`}>
                {plan.name}
              </p>
              <div className="flex items-end gap-1">
                <span className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-slate-100'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm mb-1 ${plan.highlight ? 'text-indigo-200' : 'text-slate-500'}`}>
                  {plan.priceNote}
                </span>
              </div>
              <p className={`text-xs mt-1.5 ${plan.highlight ? 'text-indigo-200' : 'text-slate-500'}`}>
                {plan.desc}
              </p>
            </div>

         
            <div className={`h-px w-full mb-5 ${plan.highlight ? 'bg-white/15' : 'bg-white/6'}`} />

        
            <ul className="space-y-1 mb-7">
              {plan.features.map((f) => (
                <li key={f} className="price-feature">
                  <span
                    className="price-check"
                    style={{
                      background: plan.highlight ? 'rgba(255,255,255,0.15)' : 'rgba(84,91,248,0.15)',
                      color: plan.highlight ? '#ffffff' : '#858AFF',
                    }}
                  >✓</span>
                  <span className={plan.highlight ? 'text-indigo-100' : 'text-slate-400'}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={plan.highlight ? 'price-btn-light' : 'price-btn-dark'}
            >
              {plan.cta}
            </motion.button>
          </motion.div>
        ))}
      </div>

    
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="text-slate-600 text-xs mt-12 relative z-10"
      >
        All plans include a 7-day free trial. No credit card required.
      </motion.p>

    </section>
  );
}