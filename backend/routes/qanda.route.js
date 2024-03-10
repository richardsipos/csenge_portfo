import express from "express";
// import {
//   createGig,
//   deleteGig,
//   getGig,
//   getGigs
// } from "../controllers/gig.controller.js";
// import { verifyToken } from "../middleware/jwt.js";

import {
    createQanda,
    getQandas,
    deleteQanda,
    editQanda
} from "../controllers/qanda.controller.js";

const router = express.Router();

router.post("/", createQanda);
router.get("/", getQandas);
router.delete("/:id", deleteQanda);
router.patch("/:id", editQanda);

export default router;