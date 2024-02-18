import React from 'react'
import './Recipes.scss'
import Recipe from "../../components/Recipe/Recipe";
import { recipes } from '../../assets/data';


const Recipes = () => {
  return (
    <div className='recipesPage'>
        <div className="recipesAbout">
            <h1>Receptjeim</h1>
            <p>Egy konyha tündér vagyok és ezeket szoktam főzni és sütni! {"<3"} </p>
        </div>
        <div className="recipes">
            {recipes.map((recipe, index) => (
                <>
                    <Recipe
                        key={index} 
                        props={recipe}
                    />
                </>
            ))}
        </div>
    </div>
  )
}

export default Recipes