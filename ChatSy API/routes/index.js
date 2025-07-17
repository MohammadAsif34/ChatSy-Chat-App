import express from "express";
const routes = express.Router();
import authRoute from "./authRoute.js";
import profileRoute from "./profileRoute.js";
import chatRoute from "./chatRoute.js";
import User from "../models/userModel.js";
import userRoute from "./userRoute.js";

routes.get("/", async (req, res) => {
  const users = await User.find();
  res.json({ code: 200, status: "OK", users });
});

routes.use("/auth", authRoute); // authenticated routes
routes.use("/user", userRoute); // user routes
routes.use("/chat", chatRoute); // user routes

export default routes;
