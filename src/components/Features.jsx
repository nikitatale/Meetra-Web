import { motion } from "framer-motion";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import LockIcon from "@mui/icons-material/Lock";
import ChatIcon from "@mui/icons-material/Chat";
import { assets } from "../assets/assets";

export default function Features() {

  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-center bg-[#020319]  overflow-hidden">

      <motion.img
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-2xl w-full xl:-ml-32"
        src={assets.groupImage}
        alt="group image"
      />

    
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-4 md:px-0 space-y-6"
      >

       
        <motion.div
          variants={cardVariant}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center justify-center gap-6 max-w-md cursor-pointer"
        >
          <div className="p-6 bg-white rounded-xl flex gap-4 shadow-lg hover:shadow-purple-500/30 transition-all">
            <VideoCallIcon className="text-purple-600" />
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-700">
                Instant Video Meetings
              </h3>
              <p className="text-sm text-slate-600 max-w-xs">
                Start or join high-quality video calls in seconds. No complex setup. Just enter your meeting code and connect instantly.
              </p>
            </div>
          </div>
        </motion.div>

      
        <motion.div
          variants={cardVariant}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center justify-center gap-6 max-w-md cursor-pointer"
        >
          <div className="p-6 bg-white rounded-xl flex gap-4 shadow-lg hover:shadow-green-500/30 transition-all">
            <LockIcon className="text-green-600" />
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-700">
                Secure Authentication
              </h3>
              <p className="text-sm text-slate-600 max-w-xs">
                Your privacy matters. Meetra uses secure login & encrypted sessions to keep your meetings safe.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariant}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center justify-center gap-6 max-w-md cursor-pointer"
        >
          <div className="p-6 bg-white rounded-xl flex gap-4 shadow-lg hover:shadow-orange-500/30 transition-all">
            <ChatIcon className="text-orange-600" />
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-700">
                Real-Time Chat
              </h3>
              <p className="text-sm text-slate-600 max-w-xs">
                Communicate instantly during meetings with built-in live chat. Send messages instantly. Responsive on all devices.
              </p>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}