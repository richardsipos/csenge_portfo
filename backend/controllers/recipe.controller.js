import Recipe from "../models/recipe.model.js";
// import createError from "../utils/createError.js";

export const createRecipe = async (req, res, next) => {

  console.log("HoppaRecept")
  console.log(req.body.images)
  const latestRecipe = await Recipe.findOne({}, {}, { sort: { _id: -1 } });
  const latestId = latestRecipe ? latestRecipe.id : 0;

  const newId = latestId + 1;
  const newRecipe= new Recipe({
    id: newId,
    ...req.body,
  });

  try {
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    console.log("ERRORRRRR")
    next(err.data);
  }
};


export const getRecipes = async (req, res, next) => {
    const q = req.query;
    console.log("Get")
    try {
      const recipes = await Recipe.find();
      res.status(200).send(recipes);
    } catch (err) {
      next(err);
    }
  };

