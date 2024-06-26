import React, {useReducer, useState} from "react";
import "./Recipes.scss";
import Recipe from "../../components/Recipe/Recipe";
import { recipes } from "../../assets/data";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import upload from "../../utils/upload";

const Recipes = () => {

  const [open, setOpen] = useState(false);
  const [openRecipePreview, setOpenRecipePreview] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);


  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { search } = useLocation();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["recipes"],
    queryFn: () =>
      newRequest.get(`/recipes`).then((res) => {
        return res.data.sort((a, b) => b.id - a.id);
      }),
  });

  const [recipeData, setRecipeData] = useState({
    id:0,
    title: '',
    ingredients: [],
    preparation: '',
    images: [],
  });

  const handleInputChange = (e) => {
    setRecipeData((state) => ({
      ...state,
      [e.target.id]: e.target.value,
    }));
  };




  const handleUpload = async () => {
    setUploading(true);
    try {

      const maxId = data.reduce((max, recipe) => (recipe.id > max ? recipe.id : max), 0) + 1;

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file, "recipes", maxId );
          return url;
        })
      );
      setUploading(false);
      const imageLinks = images.map((image) => String(image));
      setRecipeData((recipeData) => ({
        ...recipeData,
        images: imageLinks,
      }));

      return imageLinks;
    } catch (err) {
      console.error(err.data);
      return [];
    }
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const imageLinks = await handleUpload();
      await newRequest.post("/recipes", {
        title: recipeData.title,
        preparation: recipeData.preparation,
        ingredients: recipeData.ingredients.split(';').map((ingredient) => ingredient.trim()), 
        images: imageLinks,
      }); //recipeData
      
      await setRecipeData({
        id:0,
        title: '',
        ingredients: [],
        preparation: '',
        images: [],
      });
      setOpen(false)
      refetch();

    } catch (error) {
      console.error('Error submitting recipe:', error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const imageLinks = await handleUpload();
      await newRequest.patch(`/recipes/${recipeData.id}`,         
      {
        id: recipeData.id,
        title: recipeData.title,
        preparation: recipeData.preparation,
        ingredients: recipeData.ingredients,
        images: imageLinks,
      });
      setOpen(false)
      refetch();
    }
    catch (error) {
      console.error('Error saving recipe:', error);
    }
  };



  return (
    <div className="recipesPage">
      {currentUser && currentUser.isAdmin && (
        <div className="adminDashboard">
          <div className="adminTitle">Admin Dashboard</div>
          <div className="functions">
            <div className="createRecipe">
              <button onClick={() => setOpen(!open)}>Create Recipe</button>
              {open && (
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Recipe name</label>
                    <input
                      type="text"
                      id="title"
                      placeholder="Title"
                      value={recipeData.title}
                      onChange={handleInputChange}
                    />

                    <label htmlFor="ingredients">
                      Enumerate the ingredients, split them with ';' symbol.
                    </label>
                    <input
                      type="text"
                      id="ingredients"
                      placeholder="1 apple;250g oatmilk;peanut butter;"
                      value={recipeData.ingredients}
                      onChange={handleInputChange}
                    />

                    <label htmlFor="preparation">Tell us how you prepare it:</label>
                    <input
                      type="text"
                      id="preparation"
                      placeholder="Cut the apple up, then marinate it in the oatmilk..."
                      value={recipeData.preparation}
                      onChange={handleInputChange}
                    />

                    <label htmlFor="">Upload Images</label>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => setFiles(e.target.files)}
                    />
                    <button type="submit">Create</button>
                </form>
              )}
            </div>
            <div className="deleteRecipe">
              {isLoading
                ? "loading"
                : error
                ? "Something went wrong!"
                : data.map((recipe) => (
                    <div className="deleteRecipeForm" key={recipe.id}>
                      <h4>{recipe.title}</h4>
                      <button
                        onClick={async () => {
                          if (isDeleting) return;
                          setIsDeleting(true);
                          try {
                            await newRequest.delete(`/recipes/${recipe.id}`);
                            setIsDeleting(false);
                            refetch();
                          } catch (error) {
                            if (error.response && error.response.status === 404) {
                              console.error("Recipe not found!",error);
                            } else {
                              console.error("Error deleting recipe:", error);
                            }
                          } 
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
            </div>
            <div className="editRecipe">
              <select
                onChange={(e) => {
                  setOpenRecipePreview(false);
                  setRecipeData(
                    data.find((recipe) => recipe.id == e.target.value)
                  );
                }}
              >
                {!isLoading &&
                  data.map((recipe) => (
                    <option value={recipe.id}>{recipe.title}</option>
                  ))}
              </select>
              <button onClick={() => {setOpenRecipePreview(true);}}>Preview</button>
              {openRecipePreview && recipeData && (
                <div className="previewRecipe">
                  <div className="recipeDataTitle">
                      <input value = {recipeData.title} onChange={(e) => setRecipeData({...recipeData, title: e.target.value})}/>
                  </div>
                  <div className="recipeDataIngredients">
                    <input value = {recipeData.ingredients} onChange={(e) => setRecipeData({...recipeData, ingredients: e.target.value})}/>
                  </div>
                  <div className="recipeDataPreparation">
                    <input value = {recipeData.preparation} onChange={(e) => setRecipeData({...recipeData, preparation: e.target.value})}/>
                  </div>
                  <div className="recipeDataImages">
                    {recipeData && recipeData.images && recipeData.images.map((image) => (
                      <img src={image} />
                    ))}
                    Change images:
                    <input
                      type="file"
                      multiple
                      onChange={(e) => setFiles(e.target.files)}
                    />
                    
                  </div>
                  <button onClick={handleSave}>Save</button>
                </div>
              )}
            </div>
          </div> 
        </div>
      )}

      <div className="recipesAbout">
        <h1>Receptjeim</h1>
        <p>
          Egy konyha tündér vagyok és ezeket szoktam főzni és sütni! {"<3"}{" "}
        </p>
      </div>
      <div className="recipes">
      <>
        {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : data
            .map((recipe) => ( data &&
          <div key={recipe.index}>
            <Recipe key={recipe.index} props={recipe} />
          </div>
        ))}

        {/* Map over the 'recipes' array 
        {recipes.map((recipe, index) => (
          <Recipe key={`recipe-${index}`} props={recipe} />
        ))}*/}
      </>
      </div>
    </div>
  );
};

export default Recipes;
