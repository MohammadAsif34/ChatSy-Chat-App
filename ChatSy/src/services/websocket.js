import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BASE_URL, {
  withCredentials: true,
  autoConnect: false,
});

export const connectSocket = (userId) => {
  if (!userId) {
    console.warn("User ID is required to join socket room.");
    return;
  }

  // Prevent multiple listeners or connections
  if (!socket.connected) {
    console.log("🔌 Attempting to connect socket...");

    socket.connect();

    socket.once("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      socket.emit("join", userId);
    });

    socket.once("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });
  } else {
    console.log("⚠️ Socket already connected:", socket.id);
  }
};

export const sendMessage = (data) => {
  socket.emit("send-message", data);
  console.log("chat send socket:: ", data);
};

export const onReceiveMessage = (callback) => {
  socket.on("receive-message", callback);
  console.log("receive chat socket :: ", callback);
};

export const disconnectSocket = () => {
  console.log("disconneted socket :: ", socket.id);
  socket.disconnect();
};
