import express from "express";
import { protect } from "../middlewares/protectMiddleware.js";
import { getChat, setChat } from "../controllers/chatController.js";
const router = express.Router();

router.get("/:senderId/:receiverId", getChat); // curr chats
router.post("/", setChat);
// router.get("/me/contact", protect);

export default router;
