const { Recipe } = require("../db");
require("dotenv").config();


async function postRecipe(req, res) {

  if (
    !req.body.title ||
    !req.body.image ||
    !req.body.summary ||
    !req.body.healthScore ||
    !req.body.steps ||
    !req.body.diets
  ) return res.status(400).send("Missing data");
   

  try {
      const [newRecipe, created] = await Recipe.findOrCreate({
      where: { title: req.body.title },
      defaults: {
      image: req.body.image,
      summary: req.body.summary,
      healthScore: req.body.healthScore,
      steps: req.body.steps,
    }
  });

  if(!created)return res.status(403).send('A recipe with this name already exists');
      req.body.diets.forEach(async (diet) => {
      await newRecipe.addDiet(diet);
  })
    return res.status(200).json(newRecipe);
    } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = { postRecipe };