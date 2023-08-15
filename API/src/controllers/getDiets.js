const axios = require("axios");
const { Diet } = require("../db.js");
const { Op } = require("sequelize");
require('dotenv').config();
const { API_URL,API_KEY} = process.env;

async function getDiets(req, res) {
 let listDiets=[]
 
try {
 listDiets = await Diet.findAll(); 

if(listDiets.length===0){
let response = await axios.get(
   `${API_URL}/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
 );

 response.data.results.map(async (recipe)=>{
if(recipe.diets.length>0){
    
recipe.diets.map(async (d)=>{
if(!listDiets.find(e=>e.name===d)){
     listDiets.push({name:d})
     await Diet.create({name:d})
    }
   })
  }
 })
 } 
return res.status(202).json(listDiets);
 } catch (error) {
   return res.status(500).json(error.message);
 }

}

module.exports = { getDiets }