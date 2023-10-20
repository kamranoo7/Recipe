let express=require("express");
const { prefModel } = require("../Model/preference.model");
let savedRouter=express.Router()
const axios = require('axios');
require("dotenv").config
//Getting recipies by search
savedRouter.get('/recipes', async (req, res) => {
    const searchTerm = req.query.query;
    const spoonacularApiKey = process.env.apiKey; 
  
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularApiKey}&query=${searchTerm}`
      );
      const recipes = response.data.results;
      res.json({ message: 'Recipe search results', query: searchTerm, recipes });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching recipes' });
    }
  });
  //Saving recipe to database
  savedRouter.post('/save-recipe',  async (req, res) => {
    try {
        // The userID is already added to the request object by the auth middleware
        const userID = req.body.userID;

        // Add the userID to the recipe data before saving
        const recipeData = {
            recipeId: req.body.recipeId,
            title: req.body.title,
            ingredients: req.body.ingredients,
            instruction: req.body.instruction,
            image: req.body.image,
            nutritional: req.body.nutritional,
            UserID: userID
        };

        let recipe = new prefModel(recipeData);
        await recipe.save();
        res.status(200).json({ msg: "Recipe added", recipeadded: recipeData });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
//Getting recipe from Database
savedRouter.get("/saved",  async (req, res) => {
    let userId = req.body.userID;
    try {
        let recipes = await prefModel.find({ UserID: userId }); // Only retrieve recipes for the authenticated user
        res.send(recipes);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


//deleting Recipe From Database
savedRouter.delete('/delete-recipe/:recipeId', async (req, res) => {
  try {
      const userId = req.body.userID;
      const recipeId = parseInt(req.params.recipeId);
      
      const deletedRecipe = await prefModel.findOneAndDelete({ recipeId, UserID: userId });

      if (deletedRecipe) {
          res.status(200).json({ msg: "Recipe deleted", recipeDeleted: deletedRecipe });
      } else {
          res.status(404).json({ error: "Recipe not found or you don't have permission to delete it" });
      }
  } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ error: "Internal server error", details: err.message });
  }
});


      module.exports={
        savedRouter
      }
      