const axios = require('axios');
const {Recipe, Diet} = require('../db');
require('dotenv').config();
const {API_KEY, API_URL} = process.env;
const db = require('../utilities/bd01.json');

async function getAllRecipes(req, res) {
try{
    let recipesDB =[];
    recipesDB = await Recipe.findAll({ 
    include:[
        {
            model: Diet,
        } 
    ]    
})
const response = await axios.get(
    `${API_URL}/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}`
  );
 recipesAPI = response.data.results;

 return res.status(200).json([...recipesDB,...recipesAPI]);
/*   recipesAPI = db.results 
 return res.status(200).json([...recipesDB]); */
}catch(error){
    return res.status(404).json(error.message);
}
};

module.exports = {getAllRecipes}