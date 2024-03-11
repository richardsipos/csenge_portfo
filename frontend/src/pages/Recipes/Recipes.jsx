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
  const [chooseRecipe, setChooseRecipe] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);


  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { search } = useLocation();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["recipes"],
    queryFn: () =>
      newRequest.get(`/recipes`).then((res) => {
        return res.data;
      }),
  });

  const [recipeData, setRecipeData] = useState({
    title: '',
    ingredients: '',
    preparation: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
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
      console.log("\nImages: ", images[0]);
      setUploading(false);
      //dispatch({ type: "ADD_IMAGES", payload: { images } });
      setRecipeData((prevData) => ({
        ...prevData,
        images: images,
      }));
    } catch (err) {
      console.log("PROBLEMS");
      console.log(err.data);
    }
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      await handleUpload();
      await newRequest.post("/recipes", {
        title: recipeData.title,
        preparation: recipeData.preparation,
        ingredients: recipeData.ingredients.split(';').map((ingredient) => ingredient.trim()), 
        images: recipeData.images,
      }); //recipeData
      
      refetch();
      setOpen(false);

    } catch (error) {
      console.error('Error submitting recipe:', error);
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
            {/* <div className="deleteQanda">
              {isLoading
                ? "loading"
                : error
                ? "Something went wrong!"
                : data.map((qanda) => (
                    <div className="deleteQandaForm" key={qanda.id}>
                      <h4>{qanda.questions}</h4>
                      <button
                        onClick={async () => {
                          await newRequest.delete(`/qandas/${qanda.id}`);
                          refetch();
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
            </div>
            <div className="chooseQanda">
              <select
                onChange={(e) => {
                  setOpenQandaPreview(false);

                  //qanda.id === e.target.value));
                  console.log("Before");
                  console.log(data);
                  console.log(e.target.value);
                  setChooseQanda(
                    data.find((qanda) => qanda.id == e.target.value)
                  );
                  console.log(chooseQanda);
                  console.log("After");
                }}
              >
                {!isLoading &&
                  data.map((qanda) => (
                    <option value={qanda.id}>{qanda.questions}</option>
                  ))}
              </select>
              <button onClick={() => setOpenQandaPreview(true)}>Preview</button>
              {openQandaPreview && (
                <div className="previewQanda">
                  OPEN PREVIEW
                  {console.log(chooseQanda)}
                  <div className="chooseQandaTitle">{chooseQanda.title}</div>
                  <div className="chooseQandaQuestions">
                    {chooseQanda.questions}
                  </div>
                  <div className="chooseQandaAnswers">
                    {chooseQanda.answers}
                  </div>
                  <div className="chooseQandaDisplay">
                    <label>Display </label>
                    <input
                      type="checkbox"
                      checked={chooseQanda.display}
                      onChange={() =>
                        setChooseQanda({
                          ...chooseQanda,
                          display: !chooseQanda.display,
                        })
                      }
                    />
                  </div>
                  <button onClick={handleSave}>Save</button>
                </div>
              )}
            </div>*/}
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
