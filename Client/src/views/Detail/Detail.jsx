import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById, clearRecipe } from '../../redux/actions';
import { useDispatch} from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import styles from './Detail.module.css';

const DetailPage = () => {
const { recipeId } = useParams();
const dispatch = useDispatch();
const recipe = useSelector((store) => store.recipe);
//console.log(recipe,"77");

useEffect(() => {
  dispatch(getRecipeById(recipeId));
  return () => {
    dispatch(clearRecipe());
  }
},[dispatch, recipeId]);

  let arraysteps = [];

  if (recipeId && recipe) {
    if (Array.isArray(recipe.steps)) {
      arraysteps = recipe.steps.map((step) => step.step);
    } else if (Array.isArray(recipe.analyzedInstructions) && recipe.analyzedInstructions.length > 0) {
      arraysteps = recipe.analyzedInstructions[0].steps.map((step) => step.step);
    }
  }

  let arraydiets = recipe?.diets;
  if (!arraydiets) {
    arraydiets = recipe?.Diets;
  }
  arraydiets = arraydiets?.map(diet => diet.name? diet.name : diet).join(' , ');

  return (
    <div className={styles.fondo}>
      <h1>{recipe?.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <h2 >ID: {recipe?.id}</h2>
      <h2>SUMMARY:</h2>
      <div dangerouslySetInnerHTML={{ __html: recipe.summary }}> 
      </div>
      <h2>HEALTH SCORE: {recipe.healthScore}</h2>
      <h2>DIETS: {arraydiets}</h2>
      <h2>STEPS: </h2>
      <ol>
        {arraysteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default DetailPage;
