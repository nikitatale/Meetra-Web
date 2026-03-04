import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import withAuth from '../utils/WithAuth'
import { Link, useNavigate } from 'react-router-dom'
import { IconButton, CircularProgress } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

function HomeComponent() {

    const navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [focused, setFocused] = useState(false);

    const { addToUserHistory } = useContext(AuthContext);

    const handleJoinVideoCall = async (e) => {
        e.preventDefault();
        if (!meetingCode.trim()) {
            alert("Please enter meeting code");
            return;
        }
        try {
            setLoading(true);
            await addToUserHistory(meetingCode);
            navigate(`/meet/${meetingCode}`);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setLogoutLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            localStorage.removeItem("token");
            navigate("/auth");
        } catch (error) {
            console.log(error);
        } finally {
            setLogoutLoading(false);
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (i = 0) => ({
            opacity: 1, y: 0,
            transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.12 }
        })
    };

    return (
        <section className="min-h-screen bg-[#020319] text-white overflow-hidden relative">

            <style>{`
                
                .home-blob1 {
                    position: absolute;
                    width: 600px; height: 600px;
                    background: radial-gradient(circle, rgba(84,91,248,0.14) 0%, transparent 70%);
                    border-radius: 50%;
                    top: -100px; left: -150px;
                    pointer-events: none;
                    animation: blobFloat 7s ease-in-out infinite alternate;
                }
                .home-blob2 {
                    position: absolute;
                    width: 400px; height: 400px;
                    background: radial-gradient(circle, rgba(133,138,255,0.10) 0%, transparent 70%);
                    border-radius: 50%;
                    bottom: 0px; right: -80px;
                    pointer-events: none;
                    animation: blobFloat 9s ease-in-out infinite alternate-reverse;
                }
                @keyframes blobFloat {
                    from { transform: scale(1) translateY(0px); }
                    to   { transform: scale(1.15) translateY(-20px); }
                }

            
                .home-grid {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(84,91,248,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(84,91,248,0.04) 1px, transparent 1px);
                    background-size: 60px 60px;
                    pointer-events: none;
                    mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 80%);
                }

               
                .input-form {
                    transition: box-shadow 0.4s ease, border-color 0.4s ease;
                }
                .input-form.focused {
                    box-shadow: 0 0 0 3px rgba(84,91,248,0.25), 0 0 30px rgba(84,91,248,0.12);
                    border-color: rgba(84,91,248,0.5) !important;
                }

               
                .stat-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 16px;
                    padding: 16px 22px;
                    backdrop-filter: blur(10px);
                    transition: transform 0.3s ease, background 0.3s ease;
                }
                .stat-card:hover {
                    transform: translateY(-3px);
                    background: rgba(84,91,248,0.08);
                }

               
                .brand-shimmer {
                    background: linear-gradient(90deg, #ffffff, #858AFF, #ffffff);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 3.5s linear infinite;
                }
                @keyframes shimmer {
                    to { background-position: 200% center; }
                }

             
                .img-float {
                    animation: imgFloat 5s ease-in-out infinite;
                    filter: drop-shadow(0 30px 60px rgba(84,91,248,0.35));
                }
                @keyframes imgFloat {
                    0%, 100% { transform: translateY(0px); }
                    50%       { transform: translateY(-14px); }
                }

           
                .history-btn {
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 50%;
                    transition: background 0.3s ease, border-color 0.3s ease;
                }
                .history-btn:hover {
                    background: rgba(84,91,248,0.15);
                    border-color: rgba(84,91,248,0.4);
                }

             
                .nav-glass {
                    background: rgba(2,3,25,0.7);
                    backdrop-filter: blur(16px);
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }

             
                .heading-gradient {
                    background: linear-gradient(135deg, #ffffff 30%, #858AFF 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

           
                .pulse-dot {
                    width: 7px; height: 7px;
                    background: #4ade80;
                    border-radius: 50%;
                    animation: pulse 2s ease-in-out infinite;
                }
                @keyframes pulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
                    50%       { box-shadow: 0 0 0 6px rgba(74,222,128,0); }
                }
            `}</style>

          
            <div className="home-blob1" />
            <div className="home-blob2" />
            <div className="home-grid" />

         
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="nav-glass flex justify-between items-center px-6 md:px-16 py-4 sticky top-0 z-50"
            >
                <Link to='/' className='flex items-center gap-2'>
                    <span className="brand-shimmer font-bold text-xl tracking-widest">MEETRA</span>
                    <img src={assets.chatlogo} alt="logo" width={34} />
                </Link>

                <div className="flex items-center gap-3">
                    <div className="history-btn">
                        <IconButton onClick={() => navigate("/history")} size="small">
                            <RestoreIcon style={{ color: '#94a3b8', fontSize: 20 }} />
                        </IconButton>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={handleLogout}
                        disabled={logoutLoading}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm tracking-wide px-5 py-2 cursor-pointer rounded-full transition flex items-center justify-center min-w-[88px]"
                        style={{ boxShadow: '0 4px 20px rgba(84,91,248,0.35)' }}
                    >
                        {logoutLoading ? <CircularProgress size={18} color="inherit" /> : "Logout"}
                    </motion.button>
                </div>
            </motion.nav>

        
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mt-12 md:mt-20 pb-20 relative z-10">
                <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">

                   
                    <div className="w-full md:w-1/2 text-center md:text-left">

                        
                        <motion.div
                            custom={0} variants={fadeUp} initial="hidden" animate="visible"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
                        >
                            <div className="pulse-dot" />
                            <span className="text-xs text-gray-300 tracking-wide">Secure & Encrypted Meetings</span>
                        </motion.div>

                        <motion.h1
                            custom={1} variants={fadeUp} initial="hidden" animate="visible"
                            className="heading-gradient text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight"
                        >
                            Seamless<br />Video Calls.
                        </motion.h1>

                     
                        <motion.p
                            custom={2} variants={fadeUp} initial="hidden" animate="visible"
                            className="text-slate-400 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed"
                        >
                            Join meetings instantly with secure and crystal-clear video quality.
                            One code — that's all you need.
                        </motion.p>

                      
                        <motion.form
                            custom={3} variants={fadeUp} initial="hidden" animate="visible"
                            onSubmit={handleJoinVideoCall}
                            className={`input-form flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-2 max-w-md mx-auto md:mx-0 ${focused ? 'focused' : ''}`}
                        >
                            <input
                                value={meetingCode}
                                onChange={(e) => setMeetingCode(e.target.value)}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                type="text"
                                placeholder="Enter Meeting Code"
                                className="flex-1 bg-transparent outline-none px-4 text-white placeholder-gray-500 text-sm"
                            />
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                type="submit"
                                disabled={loading}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm cursor-pointer px-6 py-2.5 rounded-full transition flex items-center justify-center min-w-[80px]"
                                style={{ boxShadow: '0 4px 20px rgba(84,91,248,0.4)' }}
                            >
                                {loading ? <CircularProgress size={18} color="inherit" /> : "Join →"}
                            </motion.button>
                        </motion.form>

                     
                        <motion.div
                            custom={4} variants={fadeUp} initial="hidden" animate="visible"
                            className="flex gap-4 mt-8 justify-center md:justify-start flex-wrap"
                        >
                            {[
                                { value: "10K+", label: "Meetings" },
                                { value: "99.9%", label: "Uptime" },
                                { value: "HD", label: "Video" },
                            ].map((stat) => (
                                <div key={stat.label} className="stat-card text-center min-w-[80px]">
                                    <div className="text-lg font-bold text-indigo-400">{stat.value}</div>
                                    <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

               
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.93 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 }}
                        className="w-full md:w-1/2 flex justify-center"
                    >
                        <img
                            src={assets.logo3}
                            alt="meeting"
                            className="img-float w-[80%] max-w-md md:max-w-lg"
                        />
                    </motion.div>

                </div>
            </div>

        </section>
    );
}

export default withAuth(HomeComponent);