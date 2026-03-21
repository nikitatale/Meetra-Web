# 🎥 Meetra Web — Real-Time Video Calling & Chat App

> **A full-stack Google Meet alternative** — built with WebRTC, Socket.io, and the MERN stack.  
> Live, low-latency video calls. Real-time chat. Guest & authenticated access. All in one.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-meetra--web--frontend.onrender.com-blue?style=for-the-badge)](https://meetra-web-frontend.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-nikitatale-black?style=for-the-badge&logo=github)](https://github.com/nikitatale/Meetra-Web)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Nikita_Tale-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/nikita-tale)

---

## 🖼️ Demo Preview

> 📸 *(Add a screenshot or GIF here — even a single screenshot increases recruiter engagement by 5x)*

---

## ✨ What Makes This Project Stand Out

| Feature | Description |
|---|---|
| 🎥 **Multi-Participant Video Calls** | Powered by WebRTC — peer-to-peer, real-time, low latency |
| 💬 **In-Meeting Live Chat** | Instant messaging via Socket.io events |
| 🔐 **Dual Access Mode** | Join as guest instantly OR via secure authenticated login |
| 👥 **User & Room Management** | Full MongoDB-backed user/meeting data management |
| 📱 **Responsive UI** | Clean, mobile-friendly interface with React + Tailwind CSS |
| ⚡ **Real-Time Sync** | Socket.io v4 ensures all clients stay in sync instantly |

---

## 🛠️ Tech Stack

```
Frontend   → React, Vite, Tailwind CSS
Backend    → Node.js, Express v5
Real-Time  → Socket.io v4, WebRTC
Database   → MongoDB, Mongoose
Auth       → bcrypt, crypto
Deployment → Render
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/nikitatale/Meetra-Web.git
cd Meetra-Web
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` in `/backend`:
```env
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
PORT=5000
```

```bash
npm run dev
```

### 3. Frontend Setup
```bash
# From root directory
npm install
npm run dev
```

Visit → **http://localhost:5173**

---

## 📁 Project Structure

```
Meetra-Web/
├── backend/
│   └── src/
│       └── app.js          # Express + Socket.io server
├── src/                    # React frontend
│   ├── components/
│   └── pages/
├── public/
├── index.html
├── vite.config.js
└── package.json
```

---

## 🌐 Live Deployment

| Service | Link |
|---|---|
| Frontend | [meetra-web-frontend.onrender.com](https://meetra-web-frontend.onrender.com) |
| Platform | Render |

---

## 💡 Key Learnings & Challenges

- Implemented **WebRTC peer connections** from scratch — handling ICE candidates, SDP offer/answer exchange
- Managed **Socket.io rooms** for isolated meeting sessions
- Handled **concurrent real-time events** between multiple clients
- Built **dual auth system** (guest token + full user authentication)

---

## 👩‍💻 About the Developer

**Nikita Tale** — Full-Stack Developer specializing in MERN Stack  
📧 Open to work! Let's connect →  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://www.linkedin.com/in/nikita-tale)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?logo=github)](https://github.com/nikitatale)

---

> ⭐ If you found this project interesting, please star it — it helps a lot!
