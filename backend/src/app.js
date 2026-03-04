import dotenv from "dotenv";
dotenv.config();

import express from 'express';

//to connect express and socket server
import { createServer } from 'node:http';


import {Server} from 'socket.io';

import mongoose from 'mongoose';

import { connectToSocket } from './controllers/socketManager.js';

import cors from 'cors';
import userRoutes from './routes/users.Route.js'
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8080));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Meetra Backend Running ");
});


const start = async() => {
    const connectionDB = await mongoose.connect(process.env.MONGO_URI)
    
    console.log(`MONGO Connected DB HOST: ${connectionDB.connection.host}`)
    server.listen(app.get("port"), () => {
        console.log(`LISTENING ON PORT 8080`);
    })

 
}

start();