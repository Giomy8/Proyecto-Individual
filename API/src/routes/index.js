const express = require("express");
const router = express.Router();
const {getAllRecipes} = require('../controllers/getAllRecipes.js')
const {getRecipeById} = require('../controllers/getRecipeById.js')
const {getRecipeByName} = require('../controllers/getRecipeByName.js')
const {postRecipe} = require('../controllers/postRecipe.js')
const {getDiets} = require('../controllers/getDiets.js')



router.get('/recipes-all', getAllRecipes);
router.get('/recipes/:idRecipe', getRecipeById);
router.get('/recipes', getRecipeByName);
router.post('/recipes', postRecipe);
router.get('/diets', getDiets);


module.exports = router;