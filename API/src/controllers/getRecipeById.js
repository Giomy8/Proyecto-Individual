const axios = require('axios');
const {Recipe, Diet} = require('../db');
require('dotenv').config();
const {API_KEY, API_URL} = process.env;

async function getRecipeById(req, res) {
  const { idRecipe } = req.params; 

  try {
  const arrayIdRecipe = idRecipe.split("-"); 
  let recipeDB
  if(arrayIdRecipe[1]){
 recipeDB = await Recipe.findByPk(idRecipe,{
   include: Diet
 })
  }else{
   const response = await axios.get(
    `${API_URL}/${idRecipe}/information?apiKey=${API_KEY}`
  );
 recipeDB = response.data;
  }
  
  if(!recipeDB){
   throw Error("Recipe not found");
  }
   return res.status(200).json(recipeDB);
   
  } catch (error) {
    return res.status(404).json(error.message);
  }
 
 }
 
 module.exports = { getRecipeById }

