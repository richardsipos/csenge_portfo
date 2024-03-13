import express from "express";

import {
    getBlogs,
    createBlog,
    deleteBlog
} from "../controllers/blog.controller.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", createBlog);
router.delete("/:id", deleteBlog);

export default router;