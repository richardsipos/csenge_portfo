import express from "express";

import {
    createRecipe,
    getRecipes,
    deleteRecipe,
    editRecipe
} from "../controllers/recipe.controller.js";

const router = express.Router();

router.post("/", createRecipe);
router.get("/", getRecipes);
router.delete("/:id", deleteRecipe);
router.patch("/:id", editRecipe);

export default router;