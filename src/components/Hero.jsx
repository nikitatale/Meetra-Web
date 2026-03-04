import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="flex items-center justify-center px-6 md:px-16 py-7 min-h-[calc(100vh-80px)]">
      
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-8 md:gap-12">
        
       
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left"
        >

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6"
          >
            <span className="bg-[#545BF8] text-white px-3 py-1 rounded-full text-xs">
              New
            </span>
            <p className="text-xs text-gray-200">
              Connect. Collaborate. Communicate
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-7xl font-semibold bg-gradient-to-r from-[#858AFF] to-white bg-clip-text text-transparent leading-tight"
          >
            Turn Miles into Moments
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-slate-300 text-sm sm:text-base mt-5 max-w-md mx-auto md:mx-0 leading-relaxed"
          >
            Whether you're working remotely, attending online classes, or connecting with clients,
            Meetra makes every meeting smooth, secure, and stress-free.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start"
          >
            <Link
              to="/auth"
              className="bg-indigo-500 hover:bg-indigo-700 text-white px-6 py-3 rounded-full transition text-center"
            >
              Start Meeting
            </Link>

            <button
              onClick={() => navigate("/about")}
              className="border cursor-pointer border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-full transition"
            >
              About Us
            </button>
          </motion.div>
        </motion.div>

      
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center md:justify-center rounded-xl shadow-2xl shadow-indigo-600/40"
        >
          <img
            src={assets.messagerVC}
            alt="Video meeting preview"
            className="w-[260px] sm:w-[320px] md:w-[420px] object-contain"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;