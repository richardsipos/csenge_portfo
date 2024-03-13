import Blog from "../models/blog.model.js";
// import createError from "../utils/createError.js";

export const getBlogs = async (req, res, next) => {

  try {
    const blogs = await Blog.find();
    res.status(200).send(blogs);
  } catch (err) {
    next(err);
  }
};

export const createBlog = async (req, res, next) => {

  const latestBlog = await Blog.findOne({}, {}, { sort: { _id: -1 } });
  const latestId = latestBlog ? latestBlog.id : 0;

  const newId = latestId + 1;
  const newBlog= new Blog({
    id: newId,
    ...req.body,
  });

  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    console.log("ERRORRRRR")
    next(err.data);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const result = await Blog.deleteMany({id:req.params.id});
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
    console.log("Get")
    try {
      const recipes = await Recipe.find();
      res.status(200).send(recipes);
    } catch (err) {
      next(err);
    }
  };

  export const editRecipe = async (req, res, next) => {
    try {
      console.log("editRecipe:" + req.params.id + " " + req.body);
  
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

