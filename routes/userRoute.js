import { registerUser, loginUser,adminLogin } from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin",adminLogin);

export default router;