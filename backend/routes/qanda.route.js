import express from "express";
// import {
//   createGig,
//   deleteGig,
//   getGig,
//   getGigs
// } from "../controllers/gig.controller.js";
// import { verifyToken } from "../middleware/jwt.js";

import {
    createQanda 
} from "../controllers/qanda.controller.js";

const router = express.Router();

router.post("/", createQanda);

export default router;