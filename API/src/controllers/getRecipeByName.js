const axios = require("axios");
const { Recipe, Diet } = require("../db.js");
const { Op } = require("sequelize");
require('dotenv').config();
const db = require('../utilities/bd01.json');
const {
 API_URL,API_KEY
} = process.env;

async function getRecipeByName(req, res) {
 const { name } = req.query;
 if(!name){
  try{
    let recipesDB =[];
    recipesDB = await Recipe.findAll({ 
    include:[
        {
            model: Diet,
        } 
    ]    
})
// const response = await axios.get(
//     `${API_URL}/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}`
//   );
//  recipesAPI = response.data.results;
// return res.status(200).json([...recipesDB,...recipesAPI]);
 
 
 recipesAPI = db.results
 return res.status(200).json([...recipesDB,...recipesAPI]);
}catch(error){
    return res.status(404).json(error.message);
}
 }else if(name){
 
 
 let listDB=[]
 let listAPI=[]
 
 try {
 listDB = await Recipe.findAll({
  where: {title: 
   {[Op.iLike]: `%${name}%`}
  },
  attributes: ["id","title","image"],
  include:[
    {
        model: Diet,
    } 
]    
}); 
 
  let response = await axios.get(
   `${API_URL}/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100&query=${name}`
 );
 listAPI = response.data;
 
 if(listDB.length===0 && listAPI.totalResults===0) return res.status(404).send(`No recipe with this name '${name}' was found`);
 
  return res.status(200).json([...listDB,...listAPI.results]);
  
 } catch (error) {
   return res.status(500).json(error.message);
 }

}
}

module.exports = { getRecipeByName }