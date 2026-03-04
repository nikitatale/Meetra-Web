import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Badge, IconButton, TextField } from "@mui/material";
import { Button } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import styles from "../styles/videoMeet.module.css";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import ChatIcon from "@mui/icons-material/Chat";
import server from '../environment';
import { useNavigate } from "react-router-dom";


const server_url = server; 

var connections = {};

const peerConfigConnections = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function VideoMeetComponent() {
  const navigate = useNavigate();
  var socketRef = useRef();
  let socketIdRef = useRef();
  let localVideoref = useRef();
  let audioContextRef = useRef(null);

  let [videoAvailable, setVideoAvailable] = useState(true);
  let [audioAvailable, setAudioAvailable] = useState(true);
  let [video, setVideo] = useState([]);
  let [audio, setAudio] = useState();
  let [screen, setScreen] = useState();
  let [showModal, setModal] = useState(false);
  let [screenAvailable, setScreenAvailable] = useState();
  let [messages, setMessages] = useState([]);
  let [message, setMessage] = useState("");
  let [newMessages, setNewMessages] = useState(3);
  let [askForUsername, setAskForUsername] = useState(true);
  let [username, setUsername] = useState("");
  const videoRef = useRef([]);
  let [videos, setVideos] = useState([]);

  useEffect(() => {
    console.log("HELLO");
    getPermissions();
  }, []);

  let getDislayMedia = () => {
    if (screen) {
      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
          .then(getDislayMediaSuccess)
          .then((stream) => {})
          .catch((e) => console.log(e));
      }
    }
  }

  const getPermissions = async () => {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoPermission) { setVideoAvailable(true); } else { setVideoAvailable(false); }

      const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (audioPermission) { setAudioAvailable(true); } else { setAudioAvailable(false); }

      if (navigator.mediaDevices.getDisplayMedia) { setScreenAvailable(true); } else { setScreenAvailable(false); }

      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoAvailable,
          audio: audioAvailable,
        });
        if (userMediaStream) {
          window.localStream = userMediaStream;
          if (localVideoref.current) { localVideoref.current.srcObject = userMediaStream; }
        }
      }
    } catch (error) { console.log(error); }
  };

  useEffect(() => {
    if (video !== undefined && audio !== undefined) { getUserMedia(); }
  }, [video, audio]);
  
  let getMedia = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);
    connectToSocketServer();
  };

  let getUserMediaSuccess = (stream) => {
    try { window.localStream.getTracks().forEach(track => track.stop()); } catch (e) { console.log(e); }
    window.localStream = stream;
    localVideoref.current.srcObject = stream;
    for (let id in connections) {
      if (id === socketIdRef.current) continue;
      connections[id].getSenders().forEach(sender => {
        if (sender.track) {
          const newTrack = stream.getTracks().find(track => track.kind === sender.track.kind);
          if (newTrack) { sender.replaceTrack(newTrack).catch(e => console.log(e)); }
        }
      });
    }
    stream.getTracks().forEach(track => {
      track.onended = () => {
        setVideo(false); setAudio(false);
        try { let tracks = localVideoref.current.srcObject.getTracks(); tracks.forEach((track) => track.stop()); } catch (e) { console.log(e); }
        let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
        window.localStream = blackSilence();
        localVideoref.current.srcObject = window.localStream;
        for (let id in connections) {
          connections[id].getSenders().forEach(sender => {
            if (sender.track) {
              const newTrack = window.localStream.getTracks().find(track => track.kind === sender.track.kind);
              if (newTrack) { sender.replaceTrack(newTrack).catch(e => console.log(e)); }
            }
          });
        }
      };
    });
  };

  let getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
        .then(getUserMediaSuccess).catch((e) => console.log(e));
    } else {
      try { let tracks = localVideoref.current.srcObject.getTracks(); tracks.forEach((track) => track.stop()); } catch (e) { console.log(e); }
      let blackSilence = (...args) => new MediaStream([blackEnabled(...args), silenceEnabled()]);
      window.localStream = blackSilence();
      localVideoref.current.srcObject = window.localStream;
      for (let id in connections) {
        if (id === socketIdRef.current) continue;
        connections[id].getSenders().forEach(sender => {
          if (sender.track) {
            const newTrack = window.localStream.getTracks().find(track => track.kind === sender.track.kind);
            if (newTrack) { sender.replaceTrack(newTrack).catch(e => console.log(e)); }
          }
        });
      }
    }
  };

  let getDislayMediaSuccess = (stream) => {
    try { window.localStream.getTracks().forEach((track) => track.stop()); } catch (e) { console.log(e); }
    window.localStream = stream;
    localVideoref.current.srcObject = stream;
    for (let id in connections) {
      if (id === socketIdRef.current) continue;
      connections[id].getSenders().forEach(sender => {
        if (sender.track) {
          const newTrack = stream.getTracks().find(track => track.kind === sender.track.kind);
          if (newTrack) { sender.replaceTrack(newTrack).catch(e => console.log(e)); }
        }
      });
    }
    stream.getTracks().forEach(track => {
      track.onended = () => {
        setScreen(false);
        try { let tracks = localVideoref.current.srcObject.getTracks(); tracks.forEach(track => track.stop()); } catch (e) { console.log(e); }
        let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
        window.localStream = blackSilence();
        localVideoref.current.srcObject = window.localStream;
        getUserMedia();
      };
    });
  };

  let gotMessageFromServer = (fromId, message) => {
    var signal = JSON.parse(message);
    if (fromId !== socketIdRef.current) {
      if (signal.sdp) {
        connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
          if (signal.sdp.type === "offer") {
            connections[fromId].createAnswer().then((description) => {
              connections[fromId].setLocalDescription(description).then(() => {
                socketRef.current.emit("signal", fromId, JSON.stringify({ sdp: connections[fromId].localDescription }));
              }).catch(e => console.log(e));
            }).catch(e => console.log(e));
          }
        }).catch((e) => console.log(e));
      }
      if (signal.ice) {
        connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e));
      }
    }
  };

  let connectToSocketServer = () => {
    socketRef.current = io.connect(server_url, { secure: false });
    socketRef.current.on("signal", gotMessageFromServer);

    socketRef.current.on("connect", () => {
      socketRef.current.emit("join-call", window.location.href);
      socketIdRef.current = socketRef.current.id;
      socketRef.current.on("chat-message", addMessage);

      socketRef.current.on("user-left", (id) => {
        setVideos((videos) => videos.filter((video) => video.socketId !== id));
      });

      socketRef.current.on("user-joined", (id, clients) => {
        clients.forEach((socketListId) => {

        
          if (socketListId === socketIdRef.current) return;
        
          if (connections[socketListId]) return;

          connections[socketListId] = new RTCPeerConnection(peerConfigConnections);

          connections[socketListId].onicecandidate = function (event) {
            if (event.candidate != null) {
              socketRef.current.emit("signal", socketListId, JSON.stringify({ ice: event.candidate }));
            }
          };

          connections[socketListId].onaddstream = (event) => {
            setVideos(videos => {
            
              if (socketListId === socketIdRef.current) return videos;

              const exists = videos.find(v => v.socketId === socketListId);
              if (exists) {
              
                const updated = videos.map(v =>
                  v.socketId === socketListId ? { ...v, stream: event.stream } : v
                );
                videoRef.current = updated;
                return updated;
              }
              const newVideo = {
                socketId: socketListId,
                stream: event.stream,
                autoplay: true,
                playsinline: true,
              };
              const updated = [...videos, newVideo];
              videoRef.current = updated;
              return updated;
            });
          };

          if (window.localStream !== undefined && window.localStream !== null) {
            connections[socketListId].addStream(window.localStream);
          } else {
            let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
            window.localStream = blackSilence();
            connections[socketListId].addStream(window.localStream);
          }
        });

        if (id === socketIdRef.current) {
          for (let id2 in connections) {
            if (id2 === socketIdRef.current) continue;
            try { connections[id2].addStream(window.localStream); } catch (e) { console.log(e); }
            connections[id2].createOffer().then((description) => {
              connections[id2].setLocalDescription(description).then(() => {
                socketRef.current.emit("signal", id2, JSON.stringify({ sdp: connections[id2].localDescription }));
              }).catch((e) => console.log(e));
            });
          }
        }
      });
    });
  };

  let silence = () => {
    if (!audioContextRef.current) { audioContextRef.current = new AudioContext(); }
    let ctx = audioContextRef.current;
    let oscillator = ctx.createOscillator();
    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  };

  let silenceEnabled = () => {
    if (!audioContextRef.current) { audioContextRef.current = new AudioContext(); }
    let ctx = audioContextRef.current;
    let oscillator = ctx.createOscillator();
    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    let gainNode = ctx.createGain();
    gainNode.gain.value = 0.0;
    oscillator.connect(gainNode);
    let dest = ctx.createMediaStreamDestination();
    gainNode.connect(dest);
    return dest.stream.getAudioTracks()[0];
  };
  
  let black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), { width, height });
    canvas.getContext("2d").fillRect(0, 0, width, height);
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };

  let blackEnabled = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), { width, height });
    canvas.getContext("2d").fillRect(0, 0, width, height);
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: true });
  };

  let handleVideo = () => { setVideo(!video); };
  let handleAudio = () => { setAudio(!audio); };

  useEffect(() => {
    if (screen !== undefined) { getDislayMedia(); }
  }, [screen]);
  
  let handleScreen = () => { setScreen(!screen); };

  let handleEndCall = () => {
    try {
      let tracks = localVideoref.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    } catch (e) { console.log(e); }
    navigate("/history");
  };

  let openChat = () => { setModal(true); setNewMessages(0); };
  let closeChat = () => { setModal(false); };
  let handleMessage = (e) => { setMessage(e.target.value); };

  const addMessage = (data, sender, socketIdSender) => {
    setMessages((prevMessages) => [...prevMessages, { sender: sender, data: data }]);
    if (socketIdSender !== socketIdRef.current) {
      setNewMessages((prevNewMessages) => prevNewMessages + 1);
    }
  };

  let sendMessage = () => {
    console.log(socketRef.current);
    socketRef.current.emit("chat-message", message, username);
    setMessage("");
  };

  let connect = () => {
    setAskForUsername(false);
    getMedia();
  };

  return (
    <div>
      <style>{`
      
        .vm-lobby-outer {
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          background: #020319; padding: 16px;
          position: relative; overflow: hidden;
        }
        .vm-blob1 {
          position: absolute; width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(84,91,248,0.15) 0%, transparent 70%);
          border-radius: 50%; top: -160px; left: -160px; pointer-events: none;
          animation: vmBlob 8s ease-in-out infinite alternate;
        }
        .vm-blob2 {
          position: absolute; width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(133,138,255,0.10) 0%, transparent 70%);
          border-radius: 50%; bottom: -100px; right: -80px; pointer-events: none;
          animation: vmBlob 10s ease-in-out infinite alternate-reverse;
        }
        @keyframes vmBlob { from{transform:scale(1)} to{transform:scale(1.2) translate(12px,-12px)} }
        .vm-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(84,91,248,0.04) 1px,transparent 1px),
            linear-gradient(90deg,rgba(84,91,248,0.04) 1px,transparent 1px);
          background-size: 55px 55px; pointer-events: none;
          mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 10%, transparent 80%);
        }
        .vm-card {
          position: relative; z-index: 10;
          width: 100%; max-width: 480px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 36px 30px;
          backdrop-filter: blur(24px);
          box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(84,91,248,0.08);
        }
        .vm-brand {
          background: linear-gradient(90deg,#fff,#858AFF,#fff);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: vmShimmer 3.5s linear infinite;
          font-weight: 800; letter-spacing: 4px; font-size: 13px;
          text-align: center; display: block; margin-bottom: 20px;
        }
        @keyframes vmShimmer { to{background-position:200% center} }
        .vm-icon-ring {
          width: 58px; height: 58px; border-radius: 18px;
          background: rgba(84,91,248,0.14);
          border: 1px solid rgba(84,91,248,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; margin: 0 auto 16px;
        }
        .vm-lobby-input {
          flex: 1; height: 44px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12); border-right: none;
          border-radius: 12px 0 0 12px;
          padding: 0 16px; color: #e2e8f0; font-size: 13.5px; outline: none;
          transition: border-color .3s, background .3s;
        }
        .vm-lobby-input::placeholder { color: #475569; }
        .vm-lobby-input:focus { border-color: rgba(84,91,248,0.5); background: rgba(84,91,248,0.07); }
        .vm-connect-btn {
          height: 44px; padding: 0 22px;
          background: #545BF8; color: white;
          font-size: 13px; font-weight: 600;
          border: none; border-radius: 0 12px 12px 0; cursor: pointer;
          box-shadow: 4px 0 20px rgba(84,91,248,0.35);
          transition: background .3s; white-space: nowrap;
        }
        .vm-connect-btn:hover { background: #4349d6; }
        .vm-divider { width:100%; height:1px; background:rgba(255,255,255,0.07); margin: 22px 0; }
        .vm-preview-video {
          width: 100%; border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.1);
          background: #000;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        .vm-preview-label {
          position: absolute; bottom: 10px; left: 12px;
          background: rgba(0,0,0,0.65); backdrop-filter: blur(8px);
          color: white; font-size: 10px; font-weight: 600;
          padding: 3px 10px; border-radius: 6px; letter-spacing: .5px;
        }

    
        .vm-room { position:relative; min-height:100vh; background:#020319; color:white; overflow:hidden; }

     
        .vm-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 20px;
          background: rgba(2,3,25,0.85); backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(84,91,248,0.1);
          position: sticky; top: 0; z-index: 40;
        }
        .vm-topbar-brand {
          background: linear-gradient(90deg,#fff,#858AFF,#fff);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; animation: vmShimmer 3.5s linear infinite;
          font-weight: 800; letter-spacing: 3px; font-size: 14px;
        }
        .vm-live-badge {
          display: flex; align-items: center; gap: 6px;
          background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.22);
          color: #f87171; font-size: 11px; font-weight: 600;
          padding: 4px 10px; border-radius: 999px; letter-spacing: .5px;
        }
        .vm-live-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #f87171;
          animation: livePulse 1.5s ease-in-out infinite;
        }
        @keyframes livePulse {
          0%,100%{box-shadow:0 0 0 0 rgba(248,113,113,0.5)}
          50%{box-shadow:0 0 0 5px rgba(248,113,113,0)}
        }

      
        .vm-tile {
          position: relative; background: #060b1a;
          border-radius: 16px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
          aspect-ratio: 16/9;
          transition: border-color .3s;
        }
        .vm-tile:hover { border-color: rgba(84,91,248,0.3); }
        .vm-tile-label {
          position: absolute; bottom: 8px; left: 10px;
          background: rgba(0,0,0,0.6); backdrop-filter: blur(6px);
          color: white; font-size: 10px; font-weight: 600;
          padding: 2px 8px; border-radius: 6px;
        }

       
        .vm-pip {
          position: fixed; bottom: 90px;
          width: 176px; border-radius: 14px;
          border: 2px solid rgba(84,91,248,0.45);
          box-shadow: 0 8px 28px rgba(84,91,248,0.3);
          background: #000; z-index: 30;
          transition: right .3s ease;
        }
        .vm-pip-label {
          position: fixed; bottom: 94px;
          background: rgba(0,0,0,0.65); backdrop-filter: blur(8px);
          color: white; font-size: 10px; font-weight: 600;
          padding: 2px 8px; border-radius: 6px; z-index: 31;
          transition: right .3s ease;
        }

       
        .vm-controls {
          position: fixed; bottom: 18px; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 4px;
          background: rgba(6,11,26,0.9); backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 999px; padding: 8px 14px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(84,91,248,0.08);
          z-index: 40;
        }
        .vm-ctrl {
          width: 40px; height: 40px; border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.05); color: #e2e8f0;
          transition: background .25s, border-color .25s, transform .15s;
        }
        .vm-ctrl:hover { background: rgba(84,91,248,0.2); border-color: rgba(84,91,248,0.4); }
        .vm-ctrl:active { transform: scale(0.91); }
        .vm-ctrl.off { background: rgba(255,255,255,0.02); border-color: rgba(255,255,255,0.06); color: #4b5563; }
        .vm-ctrl.end {
          background: #ef4444; border-color: #ef4444; color: white;
          width: 44px; height: 44px;
          box-shadow: 0 4px 16px rgba(239,68,68,0.45);
        }
        .vm-ctrl.end:hover { background: #dc2626; box-shadow: 0 6px 22px rgba(239,68,68,0.6); }
        .vm-ctrl-sep { width:1px; height:22px; background:rgba(255,255,255,0.09); margin: 0 3px; }

        
        .vm-chat {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: 300px;
          background: rgba(6,11,26,0.95); backdrop-filter: blur(20px);
          border-left: 1px solid rgba(84,91,248,0.13);
          display: flex; flex-direction: column; z-index: 50;
          box-shadow: -6px 0 40px rgba(0,0,0,0.4);
        }
        @media (max-width: 767px) {
          .vm-chat {
            top: auto; width: 100%; height: 75vh;
            border-left: none;
            border-top: 1px solid rgba(84,91,248,0.13);
            border-radius: 20px 20px 0 0;
            box-shadow: 0 -6px 40px rgba(0,0,0,0.5);
          }
        }
          .vm-chat-header {
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: space-between;
        }
        .vm-chat-msgs {
          flex: 1; overflow-y: auto; padding: 12px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .vm-chat-msgs::-webkit-scrollbar { width: 3px; }
        .vm-chat-msgs::-webkit-scrollbar-thumb { background: rgba(84,91,248,0.3); border-radius: 2px; }
        .vm-bubble {
          background: rgba(84,91,248,0.09);
          border: 1px solid rgba(84,91,248,0.14);
          border-radius: 12px; padding: 9px 11px;
        }
        .vm-bubble-name { font-size: 11px; font-weight: 700; color: #858AFF; margin-bottom: 3px; }
        .vm-bubble-text { font-size: 13px; color: #e2e8f0; line-height: 1.45; }
        .vm-chat-input-row {
          padding: 10px 12px;
          border-top: 1px solid rgba(255,255,255,0.07);
          display: flex; gap: 7px;
        }
        .vm-chat-input {
          flex: 1; background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 10px;
          padding: 9px 12px; color: #e2e8f0; font-size: 13px; outline: none;
          transition: border-color .3s, background .3s;
        }
        .vm-chat-input::placeholder { color: #374151; }
        .vm-chat-input:focus { border-color: rgba(84,91,248,0.45); background: rgba(84,91,248,0.06); }
        .vm-send-btn {
          background: #545BF8; color: white; font-size: 12px; font-weight: 600;
          padding: 9px 14px; border-radius: 10px; border: none; cursor: pointer;
          box-shadow: 0 4px 14px rgba(84,91,248,0.4); transition: background .3s;
        }
        .vm-send-btn:hover { background: #4349d6; }
        .vm-close-btn {
          width: 28px; height: 28px; border-radius: 8px;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
          color: #6b7280; font-size: 14px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background .25s, color .25s;
        }
        .vm-close-btn:hover { background: rgba(239,68,68,0.15); color: #f87171; }
        .vm-empty-chat {
          display: flex; flex-direction: column; align-items: center;
          gap: 8px; padding: 48px 16px; color: #374151; text-align: center;
        }
      `}</style>

      {askForUsername === true ? (

      
        <div className="vm-lobby-outer">
          <div className="vm-blob1" /><div className="vm-blob2" /><div className="vm-grid" />
          <div className="vm-card">
            <span className="vm-brand">MEETRA</span>
            <div className="vm-icon-ring">🎥</div>
            <h2 style={{color:'white',fontWeight:700,fontSize:20,textAlign:'center',marginBottom:6}}>
              Welcome to the Lobby
            </h2>
            <p style={{color:'#64748b',fontSize:13,textAlign:'center',lineHeight:1.6,marginBottom:22}}>
              Enter your username and get ready to shine on camera ✨
            </p>
            <div style={{display:'flex',marginBottom:18}}>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="vm-lobby-input"
              />
              <button onClick={connect} type="button" className="vm-connect-btn">
                Join Now →
              </button>
            </div>
            <div className="vm-divider" />
            <div style={{position:'relative'}}>
              <video ref={localVideoref} autoPlay muted className="vm-preview-video" />
              <div className="vm-preview-label">Preview</div>
            </div>
          </div>
        </div>

      ) : (

      
        <div className="vm-room">

      
          <div className="vm-topbar">
            <span className="vm-topbar-brand">MEETRA</span>
            <div className="vm-live-badge"><div className="vm-live-dot"/>LIVE</div>
            <span style={{fontSize:12,color:'#374151'}}>{videos.length + 1} participant{videos.length !== 0 ? 's' : ''}</span>
          </div>

       
          <div className={`grid gap-3 p-4 ${
            videos.length <= 1 ? 'grid-cols-1 max-w-3xl mx-auto' :
            videos.length <= 4 ? 'grid-cols-2' : 'grid-cols-3'
          }`} style={{paddingBottom: 100}}>
            {videos.map((video) => (
              <div key={video.socketId} className="vm-tile">
                <video
                  data-socket={video.socketId}
                  ref={(ref) => { if (ref && video.stream) { ref.srcObject = video.stream; } }}
                  autoPlay
                  style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}
                />
                <div className="vm-tile-label">Participant</div>
              </div>
            ))}
            {videos.length === 0 && (
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12,padding:'80px 20px',color:'#374151',textAlign:'center'}}>
                <div style={{width:56,height:56,borderRadius:16,background:'rgba(84,91,248,0.1)',border:'1px solid rgba(84,91,248,0.18)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>👥</div>
                <p style={{color:'#4b5563',fontSize:14,fontWeight:500}}>Waiting for others to join…</p>
              </div>
            )}
          </div>

       
          <video
            ref={localVideoref}
            autoPlay muted
            className="vm-pip"
            style={{right: showModal ? '308px' : '16px'}}
          />
          <div className="vm-pip-label" style={{right: showModal ? '312px' : '20px'}}>You</div>

      
          <div className="vm-controls">
            <button className={`vm-ctrl ${!video ? 'off' : ''}`} onClick={handleVideo}>
              {video ? <VideocamIcon style={{fontSize:20}}/> : <VideocamOffIcon style={{fontSize:20}}/>}
            </button>
            <button className={`vm-ctrl ${!audio ? 'off' : ''}`} onClick={handleAudio}>
              {audio ? <MicIcon style={{fontSize:20}}/> : <MicOffIcon style={{fontSize:20}}/>}
            </button>
            {screenAvailable && (
              <button className={`vm-ctrl ${screen ? '' : 'off'}`} onClick={handleScreen}>
                {screen ? <ScreenShareIcon style={{fontSize:20}}/> : <StopScreenShareIcon style={{fontSize:20}}/>}
              </button>
            )}
            <div className="vm-ctrl-sep"/>
            <button className="vm-ctrl end" onClick={handleEndCall}>
              <CallEndIcon style={{fontSize:20}}/>
            </button>
            <div className="vm-ctrl-sep"/>
            <Badge badgeContent={newMessages} max={999} color="secondary"
              sx={{'& .MuiBadge-badge':{fontSize:10,minWidth:16,height:16,background:'#545BF8'}}}>
              <button className={`vm-ctrl ${showModal ? '' : 'off'}`} onClick={() => setModal(!showModal)}>
                <ChatIcon style={{fontSize:20}}/>
              </button>
            </Badge>
          </div>

         
          {showModal && (
            <>
              <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setModal(false)}/>

           
              <div className="vm-chat" style={{display:'flex', flexDirection:'column'}}>
                <div className="vm-chat-header">
                  <div>
                    <p style={{fontWeight:700,fontSize:14,color:'white'}}>Meeting Chat</p>
                    <p style={{fontSize:11,color:'#4b5563',marginTop:2}}>{messages.length} message{messages.length!==1?'s':''}</p>
                  </div>
                  <button className="vm-close-btn" onClick={() => setModal(false)}>✕</button>
                </div>
                <div className="vm-chat-msgs">
                  {messages.length === 0 ? (
                    <div className="vm-empty-chat">
                      <span style={{fontSize:26}}>💬</span>
                      <p style={{fontSize:13,color:'#4b5563',fontWeight:500}}>No messages yet</p>
                      <p style={{fontSize:12,color:'#374151'}}>Be the first to say something!</p>
                    </div>
                  ) : messages.map((item, index) => (
                    <div key={index} className="vm-bubble">
                      <p className="vm-bubble-name">{item.sender}</p>
                      <p className="vm-bubble-text">{item.data}</p>
                    </div>
                  ))}
                </div>
                <div className="vm-chat-input-row">
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message…"
                    className="vm-chat-input"
                  />
                  <button onClick={sendMessage} className="vm-send-btn">Send</button>
                </div>
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
}