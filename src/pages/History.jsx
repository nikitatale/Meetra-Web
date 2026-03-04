// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import { ArrowLeft } from "lucide-react";
// import Loader from "../components/Loader";   

// export default function History() {

//   const { getHistoryOfUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [meetings, setMeetings] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);   

//   const meetingsPerPage = 3;

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const history = await getHistoryOfUser();

//         if (Array.isArray(history)) {
//           setMeetings(history);
//         } else if (history?.data) {
//           setMeetings(history.data);
//         } else if (history?.meetings) {
//           setMeetings(history.meetings);
//         } else {
//           setMeetings([]);
//         }
//       } catch (error) {
//         console.log(error);
//         setMeetings([]);
//       }
//     };

//     fetchHistory();
//   }, []);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const indexOfLastMeeting = currentPage * meetingsPerPage;
//   const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
//   const currentMeetings = meetings.slice(indexOfFirstMeeting, indexOfLastMeeting);
//   const totalPages = Math.ceil(meetings.length / meetingsPerPage);

  
//   const handleLogout = async () => {
//     try {
//       setLoading(true);

      
//       await new Promise((resolve) => setTimeout(resolve, 800));

//       localStorage.removeItem("token");
//       navigate("/auth");

//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

  
//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div className="min-h-screen bg-[#020319] text-white flex flex-col">

 
//       <div className="flex items-center justify-between px-6 md:px-12 py-4">

//         <div className="flex items-center gap-3">
//           <IconButton
//             onClick={() => navigate("/home")}
//             style={{ color: "white" }}
//           >
//             <ArrowLeft size={22} />
//           </IconButton>
//           <p className="text-gray-300 font-medium">Previous Page</p>
//         </div>

//         <button
//           onClick={handleLogout}
//           disabled={loading}
//           className="bg-indigo-500 hover:bg-indigo-600 cursor-pointer text-white text-sm tracking-wide px-4 py-2.5 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {loading ? "Logging out..." : "Logout"}
//         </button>

//       </div>

   
//       <div className="flex-1 flex flex-col items-center px-4 py-10">

//         <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-200">
//           Meeting History
//         </h2>

//         {currentMeetings.length > 0 ? (
//           <>
//             <div className="flex flex-col gap-6 w-full max-w-md">

//               {currentMeetings.map((e, index) => (
//                 <Card
//                   key={index}
//                   variant="outlined"
//                   sx={{
//                     backgroundColor: "#1c2541",
//                     color: "white",
//                     borderRadius: "12px",
//                     boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
//                   }}
//                 >
//                   <CardContent>
//                     <Typography sx={{ fontSize: 14 }} color="#b5c9ff">
//                       Code: {e.meetingCode}
//                     </Typography>

//                     <Typography sx={{ mt: 1 }} color="#9ab3ff">
//                       Date: {formatDate(e.date)}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               ))}

//             </div>

//             {totalPages > 1 && (
//               <div className="flex items-center gap-3 mt-10">

//                 <button
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage(currentPage - 1)}
//                   className="px-4 py-2 bg-slate-200/20 rounded-full disabled:opacity-40 cursor-pointer"
//                 >
//                   Prev
//                 </button>

//                 {[...Array(totalPages)].map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentPage(index + 1)}
//                     className={`h-10 w-10 flex cursor-pointer items-center justify-center rounded-full ${
//                       currentPage === index + 1
//                         ? "bg-indigo-500 text-white"
//                         : "bg-slate-200/20 text-gray-300"
//                     }`}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}

//                 <button
//                   disabled={currentPage === totalPages}
//                   onClick={() => setCurrentPage(currentPage + 1)}
//                   className="px-4 py-2 bg-slate-200/20 rounded-full disabled:opacity-40 cursor-pointer"
//                 >
//                   Next
//                 </button>

//               </div>
//             )}
//           </>
//         ) : (
//           <Typography color="#b5c9ff">No History Found</Typography>
//         )}

//       </div>
//     </div>
//   );
// }


import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../components/Loader";
import { HiClipboard } from "react-icons/hi";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [meetings, setMeetings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const meetingsPerPage = 4;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setPageLoading(true);
        const history = await getHistoryOfUser();
        if (Array.isArray(history)) setMeetings(history);
        else if (history?.data) setMeetings(history.data);
        else if (history?.meetings) setMeetings(history.meetings);
        else setMeetings([]);
      } catch (error) {
        console.log(error);
        setMeetings([]);
      } finally {
        setPageLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const indexOfLast = currentPage * meetingsPerPage;
  const indexOfFirst = indexOfLast - meetingsPerPage;
  const currentMeetings = meetings.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(meetings.length / meetingsPerPage);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 800));
      localStorage.removeItem("token");
      navigate("/auth");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || pageLoading) return <Loader />;

  return (
    <div className="relative min-h-screen bg-[#020319] text-white overflow-hidden">
      <style>{`
        .hist-blob {
          position: absolute; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(84,91,248,0.12) 0%, transparent 70%);
          border-radius: 50%; top: -120px; right: -120px;
          pointer-events: none;
          animation: histBlob 9s ease-in-out infinite alternate;
        }
        .hist-blob2 {
          position: absolute; width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(133,138,255,0.08) 0%, transparent 70%);
          border-radius: 50%; bottom: -80px; left: -80px;
          pointer-events: none;
          animation: histBlob 7s ease-in-out infinite alternate-reverse;
        }
        @keyframes histBlob { from { transform: scale(1); } to { transform: scale(1.2) translate(10px,-10px); } }

        .hist-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(84,91,248,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(84,91,248,0.035) 1px, transparent 1px);
          background-size: 60px 60px; pointer-events: none;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 30%, black 10%, transparent 80%);
        }

        .hist-nav {
          background: rgba(2,3,25,0.8);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(84,91,248,0.1);
        }

        .hist-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 18px 22px;
          backdrop-filter: blur(10px);
          transition: background 0.3s, border-color 0.3s, transform 0.3s;
          cursor: default;
        }
        .hist-card:hover {
          background: rgba(84,91,248,0.07);
          border-color: rgba(84,91,248,0.25);
          transform: translateX(4px);
        }

        .hist-code {
          font-family: 'Courier New', monospace;
          background: rgba(84,91,248,0.12);
          color: #858AFF;
          border: 1px solid rgba(84,91,248,0.2);
          border-radius: 8px;
          padding: 3px 10px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .hist-page-btn {
          height: 36px; width: 36px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 600;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: #94a3b8;
          transition: all 0.25s ease;
        }
        .hist-page-btn:hover { background: rgba(84,91,248,0.15); border-color: rgba(84,91,248,0.3); color: white; }
        .hist-page-btn.active { background: #545BF8; border-color: #545BF8; color: white; box-shadow: 0 4px 14px rgba(84,91,248,0.4); }
        .hist-page-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        .hist-logout {
          background: #545BF8;
          color: white; font-size: 13px; font-weight: 500;
          padding: 9px 20px; border-radius: 999px; border: none; cursor: pointer;
          box-shadow: 0 4px 16px rgba(84,91,248,0.35);
          transition: background 0.3s, box-shadow 0.3s;
        }
        .hist-logout:hover { background: #4349d6; box-shadow: 0 6px 22px rgba(84,91,248,0.5); }

        .hist-heading {
          background: linear-gradient(135deg, #ffffff 0%, #858AFF 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .empty-state {
          display: flex; flex-direction: column; align-items: center;
          gap: 12px; padding: 60px 20px;
          color: #475569;
        }
      `}</style>

      <div className="hist-blob" />
      <div className="hist-blob2" />
      <div className="hist-grid" />

      {/* Nav */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hist-nav flex items-center justify-between px-6 md:px-12 py-3.5 sticky top-0 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.05, x: -2 }} whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <ArrowLeft size={15} />
          </div>
          <span className="text-sm hidden sm:block">Back to Home</span>
        </motion.button>

        <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">History</span>

        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={handleLogout}
          className="hist-logout"
        >
          Logout
        </motion.button>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-2">Your Activity</p>
          <h2 className="hist-heading text-3xl md:text-4xl font-bold mb-2">Meeting History</h2>
          <p className="text-slate-500 text-sm">
            {meetings.length > 0 ? `${meetings.length} meeting${meetings.length !== 1 ? 's' : ''} found` : "No meetings yet"}
          </p>
        </motion.div>

        {currentMeetings.length > 0 ? (
          <>
            <div className="flex flex-col gap-3 w-full max-w-lg">
              <AnimatePresence mode="wait">
                {currentMeetings.map((meeting, index) => (
                  <motion.div
                    key={`${currentPage}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="hist-card"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold flex-shrink-0">
                          #{indexOfFirst + index + 1}
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Meeting Code</p>
                          <span className="hist-code">{meeting.meetingCode}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 mb-0.5">{formatDate(meeting.date)}</p>
                        <p className="text-xs text-indigo-400/70">{formatTime(meeting.date)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 mt-10"
              >
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="hist-page-btn px-4 w-auto"
                  style={{ width: 'auto', padding: '0 14px' }}
                >
                  ← Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`hist-page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="hist-page-btn px-4 w-auto"
                  style={{ width: 'auto', padding: '0 14px' }}
                >
                  Next →
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="empty-state"
          >
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center text-2xl">
              <HiClipboard/>
            </div>
            <p className="text-slate-400 font-medium">No meetings found</p>
            <p className="text-slate-600 text-sm text-center max-w-xs">
              Your meeting history will appear here once you join or host a meeting.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/home")}
              className="mt-2 bg-indigo-500 cursor-pointer hover:bg-indigo-600 text-white text-sm font-medium px-6 py-2.5 rounded-full transition"
              style={{ boxShadow: '0 4px 16px rgba(84,91,248,0.35)' }}
            >
              Start a Meeting
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}