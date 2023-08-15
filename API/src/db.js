require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const RecipeModel = require('./models/Recipe');
const DietModel = require('./models/Diet');

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`,
     { logging: false, native: false }
  );

RecipeModel(sequelize)
DietModel(sequelize)

const { Recipe, Diet } = sequelize.models;

Recipe.belongsToMany(Diet, { through: 'recipe_diet' });
Diet.belongsToMany(Recipe, { through: 'recipe_diet' });


module.exports = {
   Recipe,
   Diet,
   conn: sequelize,//se puede poner un nombre cualquiera como connection
};