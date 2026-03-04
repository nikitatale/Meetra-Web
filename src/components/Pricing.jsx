import { motion } from "framer-motion";

export default function Pricing() {

  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="flex flex-wrap items-center justify-center gap-6 bg-[#020319] min-h-screen pt-20 md:pt-0 overflow-hidden">

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-6"
      >

        
        <motion.div
          variants={cardVariant}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          className="w-72 bg-white text-center text-gray-800/80 border border-gray-200 p-6 pb-16 rounded-lg shadow-lg hover:shadow-indigo-500/20 transition-all"
        >
          <p className="font-semibold">Basic</p>
          <h1 className="text-3xl font-semibold">Free</h1>

          <ul className="text-gray-500 text-sm mt-6 space-y-2">
            <li>✔ Join unlimited meetings</li>
            <li>✔ Create meeting codes</li>
            <li>✔ Real-time chat</li>
            <li>✔ Meeting history access</li>
            <li>✔ Up to 40 mins per meeting</li>
          </ul>

          <button className="bg-indigo-500 cursor-pointer w-full py-2 rounded text-white font-medium mt-7 hover:bg-indigo-600 transition-all">
            Get Started
          </button>
        </motion.div>

     
        <motion.div
          variants={cardVariant}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.08 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-72 bg-indigo-500 relative text-center text-white p-6 pb-14 rounded-lg shadow-2xl shadow-indigo-500/40"
        >
          <p className="absolute px-3 text-sm -top-3.5 left-3.5 py-1 bg-[#8789FB] rounded-full">
            Most Popular
          </p>

          <p className="font-semibold pt-2">Pro</p>
          <h1 className="text-3xl font-semibold">
            $499<span className="text-sm font-normal">/month</span>
          </h1>

          <ul className="text-sm mt-6 space-y-2">
            <li>✔ Unlimited meeting duration</li>
            <li>✔ HD video quality</li>
            <li>✔ Priority connection stability</li>
            <li>✔ Advanced meeting history</li>
            <li>✔ Email support</li>
            <li>✔ Everything in Basic</li>
            <li>✔ Best for freelancers & teams</li>
          </ul>

          <button className="bg-white cursor-pointer w-full py-2 rounded text-indigo-500 font-medium mt-7 hover:bg-gray-200 transition-all">
            Get Started
          </button>
        </motion.div>

       
        <motion.div
          variants={cardVariant}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          className="w-72 bg-white text-center text-gray-800/80 border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-indigo-500/20 transition-all"
        >
          <p className="font-semibold">Business</p>
          <h1 className="text-3xl font-semibold">
            $1499<span className="text-gray-500 text-sm font-normal">/month</span>
          </h1>

          <ul className="text-gray-500 text-sm mt-6 space-y-2">
            <li>✔ Team dashboard</li>
            <li>✔ Admin controls</li>
            <li>✔ Enhanced security</li>
            <li>✔ Dedicated support</li>
            <li>✔ Custom meeting branding</li>
            <li>✔ Everything in Pro</li>
          </ul>

          <button className="bg-indigo-500 cursor-pointer w-full py-2 rounded text-white font-medium mt-7 hover:bg-indigo-600 transition-all">
            Get Started
          </button>
        </motion.div>

      </motion.div>
    </section>
  );
}