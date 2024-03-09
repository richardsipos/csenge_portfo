import express from "express";
import { deleteUser, getUser,allUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";


const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.get("/", allUsers);

export default router;