import Recipe from "../models/recipe.model.js";
// import createError from "../utils/createError.js";

export const createRecipe = async (req, res, next) => {

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
    next(err.data);
  }
};

export const deleteRecipe = async (req, res, next) => {
  try {
    const result = await Recipe.deleteMany({id:req.params.id});
    if (result.deletedCount > 0) {
      res.status(200).send("Recipe have been deleted!");
    } else {
      res.status(404).send("No matching Recipe found for deletion.");
    }
  } catch (err) {
    next(err);
  }
};



export const getRecipes = async (req, res, next) => {
    const q = req.query;
    try {
      const recipes = await Recipe.find();
      res.status(200).send(recipes);
    } catch (err) {
      next(err);
    }
  };

  export const editRecipe = async (req, res, next) => {
    try {
  
      const updatedRecipe = await Recipe.updateOne(
        { id: req.params.id }, // Finding the recipe by its ID
        { $set: req.body }, // Updating the recipe with the data in req.body
        { new: true } // Ensuring that the updated document is returned
      );
  
      if (!updatedRecipe) {
        return res.status(404).send("Recipe not found");
      }
  
      res.status(200).json(updatedRecipe);
    } catch (err) {
      next(err);
    }
  };

