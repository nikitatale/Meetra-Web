import { Link } from "react-router-dom";

const Hero = () => {



  return (
    <>
                
                <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 pr-4 mt-23 rounded-full bg-white/10 border border-white/20">
                    <button className='bg-[#545BF8] border border-white/20 text-white px-3 py-1 rounded-full text-xs'>New</button>
                    <p className="text-xs text-gray-50">Connect. Collaborate. Communicate</p>
                </div>

                <h1 className="text-4xl md:text-7xl/20 text-center font-semibold max-w-3xl mt-5 bg-linear-to-r from-[#858AFF] to-white text-transparent leading-tight bg-clip-text">
                   Turn Miles into Moments
                </h1>
                <p className="text-slate-200 text-sm md:text-base/6 text-center max-w-[470px] mt-3">
                    Whether you're working remotely, attending online classes, or connecting with clients, Meetra makes every meeting smooth, secure, and stress-free.
                </p>

                <div className="flex items-center gap-2 mt-8 text-sm">
                    <Link to={"/auth"} className="bg-indigo-500 hover:bg-indigo-700 text-white text-sm px-6 py-3 rounded-full transition cursor-pointer">
                        Start Meeting
                    </Link>

                    <div className='p-[0.5px] rounded-full bg-linear-to-r from-white to-white/60'>
                        <button className="text-indigo-800 hover:bg-indigo-100 text-sm px-5 py-3 rounded-full transition cursor-pointer">
                            About Us
                        </button>
                    </div>
                </div>
            </>

  )
}

export default Hero