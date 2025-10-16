# Meetra-Web

Meetra is a **real-time chat and video calling web application** built with **React (Vite)** for the frontend and **Node.js + Express** for the backend, with **Socket.IO** for real-time communication.  

---

## 🌟 Features

### **User Authentication**
- Secure signup and login using **bcrypt** for password hashing.  
- Users can manage their profile and credentials.  

### **Real-Time Chat**
- Instant messaging between users using **Socket.IO**.  
- Supports multiple chat rooms and private messaging.  
- Message timestamps and delivery status.  

### **Video Calling**
- Peer-to-peer video calls between users.  
- Uses WebRTC and Socket.IO signaling for live calls.  
- Responsive video interface for desktop and mobile.  

### **Meeting Management**
- Users can create, join, and manage meetings.  
- Each meeting has a unique meeting code.  
- Meeting history is stored and displayed for each user.  

### **Responsive UI**
- Built with **MUI (Material UI)** and **Emotion** for styling.  
- Works seamlessly on desktop, tablet, and mobile screens.  

### **Backend APIs**
- REST APIs for user management, meeting history, and chat data.  
- Real-time events handled via Socket.IO server.  
- MongoDB database using **Mongoose** for persistent storage.  

### **Error Handling**
- Uses **http-status** for proper status codes.  
- Handles invalid requests, authentication errors, and server errors gracefully.  

### **Security**
- Passwords are hashed using **bcrypt**.  
- CORS enabled for secure cross-origin requests.  
- Crypto library used for generating unique IDs or tokens.  

---

