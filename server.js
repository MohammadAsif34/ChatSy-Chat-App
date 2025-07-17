import express from "express";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import Routes from "./routes/index.js";
import { setupSocket } from "./config/socket.js";
import { corsConfig } from "./config/cors.config.js";

const app = express();
const server = http.createServer(app);

const io = setupSocket(server);

app.use(corsConfig());
dotenv.config();
app.use(express.json());
app.use(cookieParser());

connectDB();
app.use("/api4/chat/v1/", Routes);

server.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`server running at http://localhost:${process.env.PORT}`);
});
