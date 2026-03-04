import React, { useState, useEffect } from 'react'
import { assets } from './assets/assets';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight } from "react-icons/hi";

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const router = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    useEffect(() => { setMobileOpen(false); }, [location]);

    const navLinks = [
        { label: 'Home', to: '/' },
        { label: 'Features', to: '/features' },
        { label: 'Pricing', to: '/pricing' },
        { label: 'About', to: '/about' },
    ];

    const isActive = (path) =>
        path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

    return (
        <>
            <style>{`
                .navbar-wrap {
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    transition: all 0.4s ease;
                }
                .navbar-wrap.scrolled {
                    background: rgba(2, 3, 25, 0.85);
                    backdrop-filter: blur(18px);
                    -webkit-backdrop-filter: blur(18px);
                    border-bottom: 1px solid rgba(84,91,248,0.12);
                    box-shadow: 0 4px 32px rgba(0,0,0,0.4);
                }
                .navbar-wrap.top {
                    background: #020319;
                    border-bottom: 1px solid transparent;
                }

                /* Brand shimmer */
                .nav-brand {
                    background: linear-gradient(90deg, #ffffff, #858AFF, #ffffff);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: navShimmer 4s linear infinite;
                    font-weight: 800;
                    letter-spacing: 4px;
                    font-size: 17px;
                }
                @keyframes navShimmer {
                    to { background-position: 200% center; }
                }

                /* Nav links */
                .nav-link {
                    position: relative;
                    font-size: 13.5px;
                    color: #94a3b8;
                    padding: 6px 4px;
                    letter-spacing: 0.3px;
                    transition: color 0.25s ease;
                }
                .nav-link:hover { color: #e2e8f0; }
                .nav-link.active { color: #ffffff; }

                /* Underline indicator */
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -2px; left: 0;
                    height: 1.5px;
                    width: 0%;
                    background: linear-gradient(90deg, #545BF8, #858AFF);
                    border-radius: 2px;
                    transition: width 0.3s ease;
                }
                .nav-link:hover::after,
                .nav-link.active::after { width: 100%; }

                /* Sign up button */
                .nav-cta {
                    background: #545BF8;
                    color: white;
                    font-size: 13px;
                    font-weight: 500;
                    letter-spacing: 0.4px;
                    padding: 9px 22px;
                    border-radius: 999px;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(84,91,248,0.4);
                    transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
                }
                .nav-cta:hover {
                    background: #4349d6;
                    box-shadow: 0 6px 28px rgba(84,91,248,0.6);
                }

                /* Hamburger lines */
                .ham-line {
                    display: block;
                    width: 22px; height: 1.8px;
                    background: #e2e8f0;
                    border-radius: 2px;
                    transition: transform 0.35s ease, opacity 0.25s ease;
                    transform-origin: center;
                }
                .ham-open .ham-line:nth-child(1) { transform: translateY(6px) rotate(45deg); }
                .ham-open .ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
                .ham-open .ham-line:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

                /* Mobile menu */
                .mobile-menu {
                    position: fixed;
                    inset: 0;
                    z-index: 99;
                    display: flex;
                    flex-direction: column;
                    background: rgba(2, 3, 25, 0.97);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                }
                .mobile-link {
                    font-size: 26px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    color: #475569;
                    transition: color 0.25s ease;
                    padding: 10px 0;
                }
                .mobile-link:hover,
                .mobile-link.active { color: #ffffff; }

                /* Mobile grid overlay */
                .mobile-grid {
                    position: absolute; inset: 0;
                    background-image:
                        linear-gradient(rgba(84,91,248,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(84,91,248,0.04) 1px, transparent 1px);
                    background-size: 50px 50px;
                    pointer-events: none;
                }
                .mobile-blob {
                    position: absolute;
                    width: 350px; height: 350px;
                    background: radial-gradient(circle, rgba(84,91,248,0.12) 0%, transparent 70%);
                    border-radius: 50%;
                    bottom: -60px; right: -80px;
                    pointer-events: none;
                }
            `}</style>

            <div className={`navbar-wrap ${scrolled ? 'scrolled' : 'top'}`}>
                <div className="w-full px-5 sm:px-8 md:px-16 py-4">
                    <nav className="flex items-center justify-between max-w-6xl mx-auto">

                     
                        <Link to="/" className="flex items-center gap-1.5 z-[101] relative">
                            <span className="nav-brand">MEETRA</span>
                            <img src={assets.chatlogo} alt="logo" width={32} />
                        </Link>

                        <div className="hidden md:flex items-center gap-7">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                    
                        <div className="hidden md:block">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => router("/auth")}
                                className="nav-cta"
                            >
                               <span className='flex justify-center items-center'> Get Started &nbsp; <HiArrowRight /></span>
                            </motion.button>
                        </div>

                  
                        <button
                            className={`md:hidden flex flex-col gap-[5px] p-2 z-[101] relative ${mobileOpen ? 'ham-open' : ''}`}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className="ham-line" />
                            <span className="ham-line" />
                            <span className="ham-line" />
                        </button>
                    </nav>
                </div>
            </div>

           
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
                        animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
                        exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
                        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <div className="mobile-grid" />
                        <div className="mobile-blob" />

                        <div className="flex flex-col justify-center items-center h-full gap-2 relative z-10">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.to}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
                                >
                                    <Link
                                        to={link.to}
                                        className={`mobile-link block text-center ${isActive(link.to) ? 'active' : ''}`}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.45, duration: 0.4 }}
                                className="mt-8"
                            >
                                <button
                                    onClick={() => { router("/auth"); setMobileOpen(false); }}
                                    className="nav-cta px-10 py-3 text-base"
                                >
                                   <span className='flex justify-center items-center'> Get Started &nbsp; <HiArrowRight /></span>
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;