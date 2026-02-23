export default function Pricing() {
    return (
       <div className="flex flex-wrap items-center justify-center gap-6 bg-[#020319] min-h-screen pt-20 md:pt-0">
            <div className="w-72 bg-white text-center text-gray-800/80 border border-gray-200 p-6 pb-16 rounded-lg">
                <p className="font-semibold">Basic</p>
                <h1 className="text-3xl font-semibold">Free</h1>
                <ul className="list-none text-gray-500 text-sm mt-6 space-y-1">
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Join unlimited meetings</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Create meeting codes</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Real-time chat</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Meeting history access</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Up to 40 mins per meeting</p>
                    </li>
                </ul>
                <button type="button" className="bg-indigo-500 cursor-pointer text-sm w-full py-2 rounded text-white font-medium mt-7 hover:bg-indigo-600 transition-all">
                    Get Started
                </button>
            </div>
        
            <div className="w-72 bg-indigo-500 relative text-center text-white border border-gray-500/30 p-6 pb-14 rounded-lg">
                <p className="absolute px-3 text-sm -top-3.5 left-3.5 py-1 bg-[#8789FB] rounded-full">Most Popular</p>
                <p className="font-semibold pt-2">Pro</p>
                <h1 className="text-3xl font-semibold">$499<span className="text-sm font-normal">/month</span></h1>
                <ul className="list-none text-white text-sm mt-6 space-y-1">
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>Unlimited meeting duration</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>HD video quality</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>Priority connection stability</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>Advanced meeting history</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>Email support</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>Everything in Basic</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                        </svg>
                        <p>Best for freelancers & teams</p>
                    </li>
                </ul>
                <button type="button" className="bg-white cursor-pointer text-sm w-full py-2 rounded text-indigo-500 font-medium mt-7 hover:bg-gray-200 transition-all">
                    Get Started
                </button>
            </div>
        
            <div className="w-72 bg-white text-center text-gray-800/80 border border-gray-200 p-6 rounded-lg">
                <p className="font-semibold">Business</p>
                <h1 className="text-3xl font-semibold">$1499<span className="text-gray-500 text-sm font-normal">/month</span></h1>
                <ul className="list-none text-gray-500 text-sm mt-6 space-y-1">
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Team dashboard</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Admin controls</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Enhanced security</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Dedicated support</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Custom meeting branding</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                        </svg>
                        <p>Everything in Pro</p>
                    </li>
                </ul>
                <button type="button" className="bg-indigo-500 cursor-pointer text-sm w-full py-2 rounded text-white font-medium mt-7 hover:bg-indigo-600 transition-all">
                    Get Started
                </button>
            </div>
        </div>
    );
};