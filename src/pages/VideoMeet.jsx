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

//stun servers return the IP address of the requester's device
//user 1 connect with user 2 by their machines

const peerConfigConnections = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function VideoMeetComponent() {
  const navigate = useNavigate();
  var socketRef = useRef();
  let socketIdRef = useRef();

  let localVideoref = useRef();
  
  // Reusable audio context to prevent sound on toggle
  let audioContextRef = useRef(null);

  //taking permissions
  let [videoAvailable, setVideoAvailable] = useState(true);

  let [audioAvailable, setAudioAvailable] = useState(true);

  //  on/off video - audio
  let [video, setVideo] = useState([]);

  let [audio, setAudio] = useState();

  //screen sharing

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
  }, []); // Fixed: Added empty dependency array to run only once

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
      const videoPermission = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      if (videoPermission) {
        setVideoAvailable(true);
        console.log("Video permission granted");
      } else {
        setVideoAvailable(false);
        console.log("Video permission denied");
      }

      const audioPermission = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      if (audioPermission) {
        setAudioAvailable(true);
        console.log("Audio permission granted");
      } else {
        setAudioAvailable(false);
        console.log("Audio permission denied");
      }

      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(false);
      }

      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoAvailable,
          audio: audioAvailable,
        });
        if (userMediaStream) {
          window.localStream = userMediaStream;
          if (localVideoref.current) {
            localVideoref.current.srcObject = userMediaStream;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (video !== undefined && audio !== undefined) {
      getUserMedia();
      console.log("SET STATE HAS ", video, audio);
    }

  }, [video, audio]);
  
  let getMedia = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);
    connectToSocketServer();
  };

  let getUserMediaSuccess = (stream) => {
    try {
      // Stop all existing tracks
      window.localStream.getTracks().forEach(track => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    localVideoref.current.srcObject = stream;

    // Replace tracks in all peer connections
    for (let id in connections) {
      if (id === socketIdRef.current) continue;

      connections[id].getSenders().forEach(sender => {
        if (sender.track) {
          const newTrack = stream.getTracks().find(track => track.kind === sender.track.kind);
          if (newTrack) {
            sender.replaceTrack(newTrack).catch(e => console.log(e));
          }
        }
      });
    }

    // Handle stream ending (when user stops from browser)
    stream.getTracks().forEach(track => {
      track.onended = () => {
        setVideo(false);
        setAudio(false);

        try {
          let tracks = localVideoref.current.srcObject.getTracks();
          tracks.forEach((track) => track.stop());
        } catch (e) {
          console.log(e);
        }

        let blackSilence = (...args) =>
          new MediaStream([black(...args), silence()]);
        window.localStream = blackSilence();
        localVideoref.current.srcObject = window.localStream;

        // Replace with black/silent tracks
        for (let id in connections) {
          connections[id].getSenders().forEach(sender => {
            if (sender.track) {
              const newTrack = window.localStream.getTracks().find(track => track.kind === sender.track.kind);
              if (newTrack) {
                sender.replaceTrack(newTrack).catch(e => console.log(e));
              }
            }
          });
        }
      };
    });
  };

  let getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices
        .getUserMedia({ video: video, audio: audio })
        .then(getUserMediaSuccess)
        .catch((e) => console.log(e));
    } else {
      // When both video and audio are OFF, replace with black silence
      try {
        let tracks = localVideoref.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) {
        console.log(e);
      }

      // Create ENABLED black/silent stream (so it sends black pixels)
      let blackSilence = (...args) =>
        new MediaStream([blackEnabled(...args), silenceEnabled()]);
      window.localStream = blackSilence();
      localVideoref.current.srcObject = window.localStream;

      // Replace tracks in all peer connections with black/silent tracks
      for (let id in connections) {
        if (id === socketIdRef.current) continue;

        connections[id].getSenders().forEach(sender => {
          if (sender.track) {
            const newTrack = window.localStream.getTracks().find(track => track.kind === sender.track.kind);
            if (newTrack) {
              sender.replaceTrack(newTrack).catch(e => console.log(e));
            }
          }
        });
      }
    }
  };

  let getDislayMediaSuccess = (stream) => {
    console.log("HERE");
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    localVideoref.current.srcObject = stream;

    // Replace tracks for screen sharing
    for (let id in connections) {
      if (id === socketIdRef.current) continue;

      connections[id].getSenders().forEach(sender => {
        if (sender.track) {
          const newTrack = stream.getTracks().find(track => track.kind === sender.track.kind);
          if (newTrack) {
            sender.replaceTrack(newTrack).catch(e => console.log(e));
          }
        }
      }); 
    }

    stream.getTracks().forEach(track => {
      track.onended = () => {
        setScreen(false);

        try {
          let tracks = localVideoref.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
        } catch (e) {
          console.log(e);
        }

        let blackSilence = (...args) =>
          new MediaStream([black(...args), silence()]);
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
        connections[fromId]
          .setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === "offer") {
              connections[fromId]
                .createAnswer()
                .then((description) => {
                  connections[fromId]
                    .setLocalDescription(description)
                    .then(() => {
                      socketRef.current.emit(
                        "signal",
                        fromId,
                        JSON.stringify({
                          sdp: connections[fromId].localDescription
                        }));
                    })
                    .catch(e => console.log(e));
                })
                .catch(e => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      }

      if (signal.ice) {
        connections[fromId]
          .addIceCandidate(new RTCIceCandidate(signal.ice))
          .catch(e => console.log(e));
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
          connections[socketListId] = new RTCPeerConnection(
            peerConfigConnections
          );

          // Wait for their ice candidate
          connections[socketListId].onicecandidate = function (event) {
            if (event.candidate != null) {
              socketRef.current.emit(
                "signal",
                socketListId,
                JSON.stringify({ ice: event.candidate })
              );
            }
          };

          // Wait for their video stream
          connections[socketListId].onaddstream = (event) => {
            console.log("BEFORE:", videoRef.current);
            console.log("FINDING ID: ", socketListId);

            let videoExists = videoRef.current.find(
              video => video.socketId === socketListId
            );

            if (videoExists) {
              console.log("FOUND EXISTING");

              // Update the stream of the existing video
              setVideos(videos => {
                const updatedVideos = videos.map(video =>
                  video.socketId === socketListId
                    ? { ...video, stream: event.stream }
                    : video
                );
                videoRef.current = updatedVideos;
                return updatedVideos;
              });
            } else {
              // Create a new video
              console.log("CREATING NEW");
              let newVideo = {
                socketId: socketListId,
                stream: event.stream,
                autoplay: true,
                playsinline: true,
              };

              setVideos(videos => {
                const updatedVideos = [...videos, newVideo];
                videoRef.current = updatedVideos;
                return updatedVideos;
              });
            }
          };

          // Add the local video stream
          if (window.localStream !== undefined && window.localStream !== null) {
            connections[socketListId].addStream(window.localStream);
          } else {
            let blackSilence = (...args) =>
              new MediaStream([black(...args), silence()]);
            window.localStream = blackSilence();
            connections[socketListId].addStream(window.localStream);
          }
        });

        if (id === socketIdRef.current) {
          for (let id2 in connections) {
            if (id2 === socketIdRef.current) continue;

            try {
              connections[id2].addStream(window.localStream);
            } catch (e) {
              console.log(e);
            }

            connections[id2].createOffer().then((description) => {
              connections[id2]
                .setLocalDescription(description)
                .then(() => {
                  socketRef.current.emit(
                    "signal",
                    id2,
                    JSON.stringify({ sdp: connections[id2].localDescription })
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        }
      });
    });
  };

  let silence = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    let ctx = audioContextRef.current;
    let oscillator = ctx.createOscillator();
    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  };

  let silenceEnabled = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    let ctx = audioContextRef.current;
    let oscillator = ctx.createOscillator();
    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    
    // Create silent audio by setting volume to 0
    let gainNode = ctx.createGain();
    gainNode.gain.value = 0.0;
    oscillator.connect(gainNode);
    let dest = ctx.createMediaStreamDestination();
    gainNode.connect(dest);
    
    return dest.stream.getAudioTracks()[0];
  };
  
  let black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });
    canvas.getContext("2d").fillRect(0, 0, width, height);
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };

  let blackEnabled = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });
    canvas.getContext("2d").fillRect(0, 0, width, height);
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: true });
  };

  let handleVideo = () => {
    setVideo(!video);
  };
  
  let handleAudio = () => {
    setAudio(!audio);
  };

  useEffect(() => {
    if (screen !== undefined) {
      getDislayMedia();
    }
  }, [screen]);
  
  let handleScreen = () => {
    setScreen(!screen);
  }; 

  // let handleEndCall = () => {
  //   try {
  //     let tracks = localVideoref.current.srcObject.getTracks();
  //     tracks.forEach(track => track.stop());
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   window.location.href = "/home";
  // };

let handleEndCall = () => {
  try {
    let tracks = localVideoref.current.srcObject.getTracks();
    tracks.forEach(track => track.stop());
  } catch (e) {
    console.log(e);
  }
  // navigate("home"); 
  window.location.href = "/home"
};

  let openChat = () => {
    setModal(true);
    setNewMessages(0);
  };
  
  let closeChat = () => {
    setModal(false);
  };
  
  let handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const addMessage = (data, sender, socketIdSender) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: sender, data: data },
    ]);
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
      {askForUsername === true ? (
        
        // <div className={styles.lobby_container}>
        //   <h2 style={{ color: "#fff" }}>Enter into Lobby </h2>
        //   <TextField
        //     id="outlined-basic"
        //     label="Username"
        //     value={username}
        //     onChange={(e) => setUsername(e.target.value)}
        //     variant="outlined"
        //     style={{ backgroundColor: "#5f616871" }}
        //   />
        //   <Button variant="contained" onClick={connect}>
        //     Connect
        //   </Button>

        //   <div>
        //     <video ref={localVideoref} autoPlay muted></video>
        //   </div>
        // </div>


<div className="min-h-screen flex items-center justify-center bg-[#020319] px-4">

    <div className="flex flex-col items-center bg-[#020319] shadow-[0px_4px_25px_0px_#0000000D] rounded-xl max-w-lg w-full md:py-8 py-6 px-6">

        <div className="flex items-center justify-center p-4 bg-indigo-400/30 rounded-full">
            <span className="text-3xl">🎥 </span>
        </div>

        <h2 className="text-white font-semibold text-xl mt-4">
            Welcome to the Lobby 
        </h2>

        <p className="text-sm text-white/80 mt-2 text-center md:w-80 w-72">
            Enter your username and get ready to shine on camera ✨
        </p>

        <div className="flex items-center mt-6 w-full">
            <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-sm text-white placeholder-white/70 outline-none bg-transparent border border-white/50 pl-4 w-full h-11 rounded-l-md"
            />

            <button
                onClick={connect}
                type="button"
                className="font-medium cursor-pointer text-sm bg-indigo-500 hover:bg-indigo-600 text-white w-28 h-11 rounded-r-md  transition"
            >
                Connect 
            </button>
        </div>

        <div className="w-full h-px bg-white/30 mt-6"></div>

        <div className="mt-6 w-full flex justify-center">
            <video
                ref={localVideoref}
                autoPlay
                muted
                className="rounded-lg w-full max-w-sm border border-white/30"
            />
        </div>

    </div>
</div>

      ) : (



        <div className="relative min-h-screen bg-[#0f172a] text-white overflow-hidden">

  
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
    {videos.map((video) => (
      <div
        key={video.socketId}
        className="bg-black rounded-xl overflow-hidden relative shadow-lg"
      >
        <video
          data-socket={video.socketId}
          ref={(ref) => {
            if (ref && video.stream) {
              ref.srcObject = video.stream;
            }
          }}
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>

 
  <video
    ref={localVideoref}
    autoPlay
    muted
    className={`absolute bottom-24 ${
      showModal ? "right-[340px]" : "right-6"
    } w-44 rounded-xl border border-white/20 shadow-xl`}
  />


  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full flex gap-6 items-center shadow-lg">

    <IconButton onClick={handleVideo} style={{ color: "white" }}>
      {video ? <VideocamIcon /> : <VideocamOffIcon />}
    </IconButton>

    <IconButton onClick={handleAudio} style={{ color: "white" }}>
      {audio ? <MicIcon /> : <MicOffIcon />}
    </IconButton>

    {screenAvailable && (
      <IconButton onClick={handleScreen} style={{ color: "white" }}>
        {screen ? <ScreenShareIcon /> : <StopScreenShareIcon />}
      </IconButton>
    )}

    <IconButton
      onClick={handleEndCall}
      style={{
        color: "white",
        backgroundColor: "red",
      }}
    >
      <CallEndIcon />
    </IconButton>

    <Badge badgeContent={newMessages} max={999} color="secondary">
      <IconButton
        onClick={() => setModal(!showModal)}
        style={{ color: "white" }}
      >
        <ChatIcon />
      </IconButton>
    </Badge>

  </div>


  {showModal && (
  <>
   
    <div
      className="fixed inset-0 bg-black/60 z-40 md:hidden"
      onClick={() => setModal(false)}
    ></div>

    <div className="
      fixed md:absolute
      bottom-0 right-0
      w-full md:w-80
      h-[80%] md:h-full
      bg-white/10 backdrop-blur-xl 
      border-l border-white/20 
      flex flex-col 
      z-50
      rounded-t-2xl md:rounded-none
    ">

    
      <div className="p-4 border-b border-white/20 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Chat</h2>

      
        <button
          onClick={() => setModal(false)}
          className="md:hidden text-white text-xl"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length !== 0 ? (
          messages.map((item, index) => (
            <div key={index} className="bg-white/10 p-3 rounded-lg">
              <p className="text-xs text-indigo-300 font-semibold">
                {item.sender}
              </p>
              <p className="text-sm">{item.data}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 text-center">
            No Messages Yet
          </p>
        )}
      </div>

    
      <div className="p-3 border-t border-white/20 flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-white/10 text-white text-sm px-3 py-2 rounded-md outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-500 hover:bg-indigo-600 px-4 rounded-md text-sm"
        >
          Send
        </button>
      </div>

    </div>
  </>
)}

</div>

      )}
    </div>
  );
}