import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#020319",
        fontFamily: "'Segoe UI', sans-serif",
        gap: "32px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
       
        .blob1 {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(84,91,248,0.18) 0%, transparent 70%);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-60%, -60%);
          animation: blobPulse 4s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .blob2 {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(133,138,255,0.12) 0%, transparent 70%);
          border-radius: 50%;
          bottom: 20%;
          right: 20%;
          animation: blobPulse 5s ease-in-out infinite alternate-reverse;
          pointer-events: none;
        }
        @keyframes blobPulse {
          from { transform: translate(-60%, -60%) scale(1); opacity: 0.6; }
          to   { transform: translate(-60%, -60%) scale(1.3); opacity: 1; }
        }

   
        .logo-ring {
          position: relative;
          width: 72px;
          height: 72px;
        }
        .ring-outer {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: #858AFF;
          border-right-color: rgba(133,138,255,0.3);
          animation: spinRing 1.1s cubic-bezier(0.6, 0, 0.4, 1) infinite;
        }
        .ring-inner {
          position: absolute;
          inset: 10px;
          border-radius: 50%;
          border: 2px solid transparent;
          border-bottom-color: #545BF8;
          border-left-color: rgba(84,91,248,0.3);
          animation: spinRing 1.6s cubic-bezier(0.6, 0, 0.4, 1) infinite reverse;
        }
        .ring-dot {
          position: absolute;
          inset: 22px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #858AFF, #545BF8);
          box-shadow: 0 0 20px rgba(84,91,248,0.7);
          animation: dotPulse 2s ease-in-out infinite;
        }
        @keyframes spinRing {
          to { transform: rotate(360deg); }
        }
        @keyframes dotPulse {
          0%, 100% { box-shadow: 0 0 12px rgba(84,91,248,0.6); transform: scale(1); }
          50%       { box-shadow: 0 0 28px rgba(133,138,255,0.9); transform: scale(1.12); }
        }

       
        .brand-name {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 6px;
          text-transform: uppercase;
          background: linear-gradient(90deg, #858AFF, #ffffff, #858AFF);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 2.5s linear infinite;
        }
        @keyframes shimmer {
          to { background-position: 200% center; }
        }

        /* Tagline with typing dots */
        .tagline {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(148, 163, 184, 0.8);
          font-size: 13px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .dot {
          width: 4px;
          height: 4px;
          background: #545BF8;
          border-radius: 50%;
          animation: dotBounce 1.4s ease-in-out infinite;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-6px); opacity: 1; }
        }

        
        .progress-track {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          width: 160px;
          height: 2px;
          background: rgba(255,255,255,0.07);
          border-radius: 2px;
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          width: 40%;
          background: linear-gradient(90deg, transparent, #858AFF, #545BF8, transparent);
          border-radius: 2px;
          animation: progressSlide 1.8s ease-in-out infinite;
        }
        @keyframes progressSlide {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>

   
      <div className="blob1" />
      <div className="blob2" />

     
      <div className="logo-ring">
        <div className="ring-outer" />
        <div className="ring-inner" />
        <div className="ring-dot" />
      </div>

     
      <div className="brand-name">Meetra</div>


      <div className="tagline">
        <span>Please wait</span>
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>

    
      <div className="progress-track">
        <div className="progress-bar" />
      </div>
    </div>
  );
};

export default Loader;