import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        console.log("Fetched history:", history);

        
        if (Array.isArray(history)) {
          setMeetings(history);
        } else if (history?.data) {
          setMeetings(history.data); 
        } else if (history?.meetings) {
          setMeetings(history.meetings);
        } else {
          setMeetings([]);
        }
      } catch (e) {
        console.log(e);
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

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b132b",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 40px",
          backgroundColor: "#1c2541",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton
            onClick={() => routeTo("/home")}
            style={{ color: "white" }}
          >
            <HomeIcon />
          </IconButton>
          <h2 style={{ margin: 0, fontFamily: "'Happy Face', sans-serif" }}>
            MEETRA
          </h2>
        </div>

        <Button
          variant="contained"
          onClick={() => {
            localStorage.removeItem("token");
            routeTo("/auth");
          }}
          style={{
            backgroundColor: "#3a506b",
            color: "white",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          Logout
        </Button>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          padding: "40px 0",
        }}
      >
        <h2
          style={{
            fontFamily: "'Happy Face', sans-serif",
            letterSpacing: "1px",
            color: "#dbe2ef",
          }}
        >
          Meeting History
        </h2>

        {Array.isArray(meetings) && meetings.length > 0 ? (
          meetings.map((e, i) => (
            <Card
              key={i}
              variant="outlined"
              style={{
                width: "350px",
                backgroundColor: "#1c2541",
                color: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="#b5c9ff" gutterBottom>
                  Code: {e.meetingCode}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="#9ab3ff">
                  Date: {formatDate(e.date)}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography color="#b5c9ff">No History Found</Typography>
        )}
      </div>
    </div>
  );
}
