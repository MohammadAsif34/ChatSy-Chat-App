import express from "express";
import {
  addContact,
  getContact,
  userInfo,
} from "../controllers/userController.js";
import { protect } from "../middlewares/protectMiddleware.js";
const router = express.Router();

router.get("/:id", userInfo); // current contact user info
router.post("/me/add-contact", protect, addContact); // curr user contact
router.get("/me/contact", protect, getContact); // curr user contact

export default router;
