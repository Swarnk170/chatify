//npm i socket.io -> 1st thing

import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import { socketAuthMiddleWare } from "../middleware/socket.auth.middleware.js";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
}); //io->socketServer

//apply authentication middleware to all socket connection
io.use(socketAuthMiddleWare);

//this is for storing online users
const userSocketMap = {}; //{userId : socketId ->stored in socket middleware}
io.on("connection", (socket) => {
  console.log(`A user connected ${socket.user.fullName}`);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  //io.emit() is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`A user disconnected ${socket.user.fullName}`);

    delete userSocketMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
