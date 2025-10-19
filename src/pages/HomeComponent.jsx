import React, { useContext, useState } from 'react'
import withAuth from '../utils/WithAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';
import { assets } from '../assets/assets';

function HomeComponent() {

 
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");


    const {addToUserHistory} = useContext(AuthContext);
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <>

            <div className="navBar" style={{backgroundColor: "#1c2541",}}>

                <div style={{ display: "flex", alignItems: "center" }}>

                   <h2 style={{ fontSize: "1.3rem",
            fontFamily: '"Almaden Sans", Helvetica, "Noto Sans JP", "Noto Sans KR", "Noto Sans SC", "Noto Sans TC", "Noto Sans", Arial, sans-serif',
            fontWeight: "bold",
            color:"#fff"
         }}>
            MEETRA
            <img
              src={assets.chatlogo}
              style={{ width: "30px" }}
              alt="logo"
            />{" "}
          </h2>
                </div> 

                <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={
                        () => {
                            navigate("/history")
                        }
                    }>
                        <RestoreIcon />
                    </IconButton>
                    <p style={{ fontFamily: '"Almaden Sans", Helvetica, "Noto Sans JP", "Noto Sans KR", "Noto Sans SC", "Noto Sans TC", "Noto Sans", Arial, sans-serif',}}>History</p>

                    <Button onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }}>
                        Logout
                    </Button>
                </div>


            </div>


            <div className="meetContainer" style={{ backgroundColor: "#0b132b", height:"89vh"}}>
                <div className="leftPanel">
                    <div>
                        <h2 style={{ fontFamily: '"Almaden Sans", Helvetica, "Noto Sans JP", "Noto Sans KR", "Noto Sans SC", "Noto Sans TC", "Noto Sans", Arial, sans-serif', color:" #ffff", paddingBottom:"10px"}}>Seamless Video Calls. Supreme Quality.</h2>

                        <div style={{ display: 'flex', gap: "10px" }}>

                            <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
                            <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>

                        </div>
                    </div>
                </div>
                <div className='rightPanel'>
                    <img src={assets.logo3} alt="chat-image" style={{width:"45vw"}}/>
                </div>
            </div>
        </>
    )
}


export default withAuth(HomeComponent)
