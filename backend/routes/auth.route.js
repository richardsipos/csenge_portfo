import express from "express";
import { register, login, logout,modifyProfile } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post("/modifyProfile",modifyProfile)

export default router;