import Recipe from "../models/recipe.model.js";
// import createError from "../utils/createError.js";

export const createRecipe = async (req, res, next) => {
//   if (req.id === null)
    // return next(createError(403, "No id specified."));

    console.log("Hoppa")
  const newRecipe = new Recipe({
    id: req.id,
    ...req.body,
  });

  try {
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    next(err.data);
  }
};


export const getRecipes = async (req, res, next) => {
    const q = req.query;
    // const filters = {
    //   ...(q.id && { id: q.id }),
    // };
    console.log("Get")
    try {
      const recipes = await Recipe.find();
      res.status(200).send(recipes);
    } catch (err) {
      next(err);
    }
  };

