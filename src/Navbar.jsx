import React, { useState } from 'react'
import { assets } from './assets/assets';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const[mobileOpen, setMobileOpen] = useState(false);
      const router = useNavigate();

  return (
    <>

    <nav className="flex items-center w-full max-w-6xl justify-between text-slate-100 mt-5">
                    <Link to="/" className='flex justify-center items-center'>
                       <h3 className='text-slate-100 font-bold text-[18px]'>MEETRA</h3>
                       <img src={assets.chatlogo} alt="logo" width={38}/>
                    </Link>
                    <div id="menu" className={`${mobileOpen ? 'max-md:left-0' : 'max-md:-left-full'} max-md:fixed max-md:bg-black/70 max-md:backdrop-blur max-md:top-0 transition-all duration-300 max-md:h-screen max-md:w-full max-md:z-50 max-md:justify-center flex-col md:flex-row flex items-center gap-2 text-sm`}>
                        <a className="px-4 py-2  text-slate-100 hover:text-slate-200" href="#" onClick={() => setMobileOpen(false)}>Home</a>
                        <a className="px-4 py-2 text-slate-100 hover:text-slate-200" href="#" onClick={() => setMobileOpen(false)}>Features</a>
                        <a className="px-4 py-2 text-slate-100 hover:text-slate-200" href="#" onClick={() => setMobileOpen(false)}>Pricing</a>
                        <a className="px-4 py-2 text-slate-100 hover:text-slate-200" href="#" onClick={() => setMobileOpen(false)}>About</a>
                        <button onClick={() => setMobileOpen(false)} className="md:hidden bg-gray-800 hover:bg-black text-white p-2 rounded-md aspect-square font-medium transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>
                    <button onClick={() => setMobileOpen(true)} className="md:hidden">
                        <svg className="size-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className="hidden md:block p-px rounded-full bg-linear-to-b from-white to-white/60">
                        <button onClick={() => {
                router("/auth");
              }} className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm tracking-wide px-4 py-2.5 rounded-full transition cursor-pointer">
                            Sign Up
                        </button>
                    </div>
                </nav>
    
    </>
  )
}

export default Navbar