<div align="center">

# 🎥 Meetra Web

**Real-time Video Calling & Chat Application**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-8245ec?style=for-the-badge)](https://meetra-web-frontend.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/nikitatale/Meetra-Web)

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat&logo=socketdotio&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![WebRTC](https://img.shields.io/badge/WebRTC-333333?style=flat&logo=webrtc&logoColor=white)

</div>

---

## 📌 Overview

Meetra Web is a full-stack real-time communication platform — think a lightweight Google Meet clone. Users can join video meetings as guests or through authentication, chat in real-time, and manage meeting rooms seamlessly.

---

## ✨ Features

- 🎥 **Real-time Video Calls** — Multi-participant meetings powered by WebRTC
- 💬 **Instant Messaging** — Live in-meeting chat via Socket.io
- 🔐 **Guest & Auth Access** — Join instantly as guest or via secure login
- 👥 **User Management** — Meeting & user data handled with MongoDB
- 📱 **Responsive UI** — Clean interface built with React
- ⚡ **Low Latency** — Socket.io events for real-time sync across clients

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express v5 |
| Real-time | Socket.io v4, WebRTC |
| Database | MongoDB, Mongoose |
| Auth | bcrypt, crypto |
| Dev Tools | Nodemon, dotenv, ESLint |
| Deployment | Render |

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
├── package.json
└── README.md
```

---

## 🏃 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repo
git clone https://github.com/nikitatale/Meetra-Web.git
cd Meetra-Web
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
PORT=5000
```

```bash
# Start backend
npm run dev
```

### Frontend Setup

```bash
# From root
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🚀 Deployment

| Service | Link |
|---|---|
| Frontend | [meetra-web-frontend.onrender.com](https://meetra-web-frontend.onrender.com) |
| Platform | Render |

---

## 👩‍💻 Author

**Nikita Tale**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/nikita-tale)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat&logo=github)](https://github.com/nikitatale)

---

<div align="center">
  <sub>Built by Nikita Tale</sub>
</div>
