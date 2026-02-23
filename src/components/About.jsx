import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

export default function About() {
    return (
        <>
            <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4 bg-[#020319] min-h-screen">
                <div className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0">
                    <img className="max-w-md w-full object-cover rounded-2xl"
                        src={assets.peoples}
                        alt="peoples image" />
                    <div className="gap-1 max-w-72 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white size-16 flex items-center justify-center aspect-square backdrop-blur rounded-full">
                        <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.027 3.371c0-1.374 1.512-2.213 2.678-1.484l9.11 5.693a1.75 1.75 0 0 1 0 2.969l-9.11 5.693c-1.166.729-2.678-.11-2.678-1.484z"
                                fill="#fff" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <div className="text-sm text-slate-600 max-w-lg">
                    <h1 className="text-xl uppercase font-semibold text-slate-300">What we do?</h1>
                    <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-[#DDD9FF]"></div>
                    <p className="mt-8 text-gray-400">Meetra is a modern video meeting platform designed to make online communication simple, secure, and seamless. Whether you're connecting with friends, collaborating with your team, or hosting professional meetings, Meetra ensures every conversation feels effortless. </p>
                    <p className="mt-4 text-gray-400">We believe that virtual meetings should be fast to join, easy to manage, and accessible from anywhere. That's why Meetra focuses on clean design, smooth performance, and reliable connectivity.</p>
                    <p className="mt-4 text-gray-400">To become a trusted and user-friendly meeting platform that empowers people to connect anytime, anywhere - without technical barriers.</p>
                    <Link to="/about" className="flex items-center w-max gap-2 mt-8  transition bg-indigo-500 hover:bg-indigo-700  py-3 px-8 rounded-full text-white">
                        <span>Read more</span>
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                                fill="#fff" />
                        </svg>
                    </Link>
                </div>
            </section>
        </>
    );
};