import express from "express";
import {
  login,
  logout,
  myInfo,
  register,
} from "../controllers/authController.js";
import { protect } from "../middlewares/protectMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, myInfo); // curr user info

export default router;
