import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { ArrowLeft } from "lucide-react";
import Loader from "../components/Loader";   

export default function History() {

  const { getHistoryOfUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [meetings, setMeetings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);   

  const meetingsPerPage = 3;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();

        if (Array.isArray(history)) {
          setMeetings(history);
        } else if (history?.data) {
          setMeetings(history.data);
        } else if (history?.meetings) {
          setMeetings(history.meetings);
        } else {
          setMeetings([]);
        }
      } catch (error) {
        console.log(error);
        setMeetings([]);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const indexOfLastMeeting = currentPage * meetingsPerPage;
  const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
  const currentMeetings = meetings.slice(indexOfFirstMeeting, indexOfLastMeeting);
  const totalPages = Math.ceil(meetings.length / meetingsPerPage);

  
  const handleLogout = async () => {
    try {
      setLoading(true);

      
      await new Promise((resolve) => setTimeout(resolve, 800));

      localStorage.removeItem("token");
      navigate("/auth");

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[#020319] text-white flex flex-col">

 
      <div className="flex items-center justify-between px-6 md:px-12 py-4">

        <div className="flex items-center gap-3">
          <IconButton
            onClick={() => navigate("/home")}
            style={{ color: "white" }}
          >
            <ArrowLeft size={22} />
          </IconButton>
          <p className="text-gray-300 font-medium">Previous Page</p>
        </div>

        <button
          onClick={handleLogout}
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 cursor-pointer text-white text-sm tracking-wide px-4 py-2.5 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>

      </div>

   
      <div className="flex-1 flex flex-col items-center px-4 py-10">

        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-200">
          Meeting History
        </h2>

        {currentMeetings.length > 0 ? (
          <>
            <div className="flex flex-col gap-6 w-full max-w-md">

              {currentMeetings.map((e, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#1c2541",
                    color: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="#b5c9ff">
                      Code: {e.meetingCode}
                    </Typography>

                    <Typography sx={{ mt: 1 }} color="#9ab3ff">
                      Date: {formatDate(e.date)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}

            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-3 mt-10">

                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-4 py-2 bg-slate-200/20 rounded-full disabled:opacity-40 cursor-pointer"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`h-10 w-10 flex cursor-pointer items-center justify-center rounded-full ${
                      currentPage === index + 1
                        ? "bg-indigo-500 text-white"
                        : "bg-slate-200/20 text-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-4 py-2 bg-slate-200/20 rounded-full disabled:opacity-40 cursor-pointer"
                >
                  Next
                </button>

              </div>
            )}
          </>
        ) : (
          <Typography color="#b5c9ff">No History Found</Typography>
        )}

      </div>
    </div>
  );
}