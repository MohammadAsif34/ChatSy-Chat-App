import { Server, Socket } from "socket.io";
import { origins } from "./cors.config.js";
export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: origins,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected: ", socket.id);

    //on user join on websocket
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`user ${userId} join room`);
    });

    //on user send message on websocket
    socket.on("send-message", ({ senderId, receiverId, message }) => {
      io.to(receiverId).emit("receive-message", { senderId, message });
    });

    //on user desconnect on websocket
    socket.on("disconnect", () => {
      console.log("user disconnected: ", socket.id);
    });
  });

  return io;
};
