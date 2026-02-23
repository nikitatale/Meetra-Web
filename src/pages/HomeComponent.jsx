import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import withAuth from '../utils/WithAuth'
import { Link, useNavigate } from 'react-router-dom'
import { IconButton, CircularProgress } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {

    const navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);

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

    return (
        <section className="min-h-screen bg-[#020319] text-white">

            <nav className="flex justify-between items-center px-6 md:px-16 py-4">
                <Link to='/' className='flex items-center gap-2'>
                    <h3 className='font-bold text-lg'>MEETRA</h3>
                    <img src={assets.chatlogo} alt="logo" width={38} />
                </Link>

                <div className="flex items-center gap-4">
                    <IconButton onClick={() => navigate("/history")}>
                        <RestoreIcon className='text-gray-200' />
                    </IconButton>

                    <div className="hidden md:block p-px rounded-full bg-linear-to-b from-white to-white/60">
                        <button
                            onClick={handleLogout}
                            disabled={logoutLoading}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm tracking-wide px-4 py-2 cursor-pointer rounded-full transition flex items-center justify-center min-w-[90px]"
                        >
                            {logoutLoading ? (
                                <CircularProgress size={20} color="inherit" />
                            ) : (
                                "Logout"
                            )}
                        </button>
                    </div>

                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mt-16">

                <div className="flex flex-col-reverse md:flex-row items-center gap-12">

                    <div className="w-full md:w-1/2 text-center md:text-left">

                        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                            Seamless Video Calls.
                        </h1>

                        <p className="text-gray-400 mb-8 max-w-md mx-auto md:mx-0">
                            Join meetings instantly with secure and crystal clear video quality.
                        </p>

                        <form
                            onSubmit={handleJoinVideoCall}
                            className="flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-2 max-w-md mx-auto md:mx-0"
                        >
                            <input
                                value={meetingCode}
                                onChange={(e) => setMeetingCode(e.target.value)}
                                type="text"
                                placeholder="Enter Meeting Code"
                                className="flex-1 bg-transparent outline-none px-4 text-white placeholder-gray-400"
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white text-md cursor-pointer px-6 py-2 rounded-full transition flex items-center justify-center min-w-[90px]"
                            >
                                {loading ? (
                                    <CircularProgress size={20} color="inherit" />
                                ) : (
                                    "Join"
                                )}
                            </button>
                        </form>

                    </div>

                    <div className="w-full md:w-1/2 flex justify-center">
                        <img
                            src={assets.logo3}
                            alt="meeting"
                            className="w-[85%] max-w-md md:max-w-lg"
                        />
                    </div>

                </div>
            </div>

        </section>
    );
}

export default withAuth(HomeComponent);