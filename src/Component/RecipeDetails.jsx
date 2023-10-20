import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './RecipeDetails.css';
import { useToast } from '@chakra-ui/react'
const RecipeDetails = () => {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const recipeId = searchParams.get('id');
  let toast=useToast()
  let handleSubmit=()=>{
    const ingredientNames = recipe.extendedIngredients.map((ingredient) => ingredient.original);
    const dataToSave = {
      recipeId: recipeId, // You may need to adjust this depending on your data structure
      title: recipe.title,
      ingredients: ingredientNames,
      image: recipe.image,
      instruction: recipe.instructions, // Make sure you have the correct data structure
      nutritional: recipe.nutritional, // Make sure yo
    };
    
    

    
    fetch("https://recipe-23.onrender.com/get/save-recipe",{
        method:"POST",
        headers:{
           "Authorization":`Bearer ${localStorage.getItem("token")}`,
           "Content-Type":"application/json"
        },
        body:JSON.stringify(dataToSave)
    })
    .then(res=>res.json())
    .then(res=>{console.log(res)
        toast({
            title: ' Data has been Added',
            position: 'top',
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
          
    })
    .catch(err=>console.log(err))
};
//GEt

  
    // Send a POST request to your Express.js API endpoint to save the recipe
   

  useEffect(() => {
    if (recipeId) {
      // Fetch the recipe details from the Spoonacular API
      axios
        .get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
          params: {
            apiKey: 'c7d1790361e04f798b895c5c62fee495',
          },
        })
        .then((response) => {
          console.log(response )
          setRecipe(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [recipeId]);

  if (loading) {
    return <div className="loading" style={{fontSize:"30px"}}>Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  // Once data is loaded, render the recipe details
  return (
    <div className="recipe-details-container">
      <h2 className="recipe-title">{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />

      <div className="section ingredients-section">
        <h3 className="section-title">Ingredients:</h3>
        <ul className="ingredients-list">
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id} className="ingredient">
              {ingredient.original}
            </li>
          ))}
        </ul>
      </div>

      <div className="section instructions-section">
        <h3 className="section-title">Instructions:</h3>
        <ol className="instructions-list">
          {recipe.analyzedInstructions[0].steps.map((step) => (
            <li key={step.number} className="instruction">
              {step.step}
            </li>
          ))}
        </ol>
      </div>

      <div className="section nutrition-section">
  <h3 className="section-title">Nutritional Information:</h3>
  <ul className="nutrition-list">
    {recipe.diets.map((diet, index) => (
      <li key={index} className="nutrition-item">
        {diet}
      </li>
    ))}
  </ul>
</div>
      <button className="save-button" onClick={handleSubmit}>
        Save for Later
      </button>
    </div>
  );
};

export default RecipeDetails;
