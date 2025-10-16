import express from 'express';

//to connect express and socket server
import { createServer } from 'node:http';


import {Server} from 'socket.io';

import mongoose from 'mongoose';

import { connectToSocket } from './controllers/socketManager.js';

import cors from 'cors';
import userRoutes from './routes/users.Route.js'

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8080));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.use("/api/v1/users", userRoutes);



const start = async() => {
    const connectionDB = await mongoose.connect("mongodb+srv://talenikita3:Nikita576@cluster0.qviia6x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    
    console.log(`MONGO Connected DB HOST: ${connectionDB.connection.host}`)
    server.listen(app.get("port"), () => {
        console.log(`LISTENING ON PORT 8080`);
    })
}

start();