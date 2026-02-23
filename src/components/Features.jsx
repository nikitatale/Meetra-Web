import { useState } from "react";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LockIcon from '@mui/icons-material/Lock';
import ChatIcon from '@mui/icons-material/Chat';
import { assets } from "../assets/assets";

export default function Features ()  {
    const [isHover, setIsHover] = useState(false);

    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-center bg-[#020319]">
                <img className="max-w-2xl w-full xl:-ml-32" src={assets.groupImage} alt="group image" />
                <div className="px-4 md:px-0" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <div className={"flex items-center justify-center gap-6 max-w-md group cursor-pointer"}>
                        <div className={`p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300  flex gap-4 rounded-xl transition-colors ${!isHover ? 'border-violet-300 bg-violet-100' : ''}`}>
                           <VideoCallIcon className="text-purple-600"/>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">Instant Video Meetings</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Start or join high-quality video calls in seconds. No complex setup. Just enter your meeting code and connect instantly.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 group-hover:bg-green-100 border border-transparent group-hover:border-green-300 flex gap-4 rounded-xl transition-colors">
                            <LockIcon className="text-green-600"/>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">Secure Authentication</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Your privacy matters. Meetra uses secure login & encrypted sessions to keep your meetings safe.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 group-hover:bg-orange-100 border border-transparent group-hover:border-orange-300 flex gap-4 rounded-xl transition-colors">
                            <ChatIcon className="text-orange-600"/>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">Real-Time Chat</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Communicate instantly during meetings with built-in live chat. Send messages instantly. Responsive on all devices</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};