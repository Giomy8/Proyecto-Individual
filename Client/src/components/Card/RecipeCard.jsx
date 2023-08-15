import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RecipeCard.module.css';

const RecipeCard = ({ recipe }) => {
  let arraydiets = recipe?.diets;
  if (!arraydiets) {
    arraydiets = recipe.Diets;
  }
  arraydiets = arraydiets?.map(diet => diet.name? diet.name : diet).join(' , ');

  return (
    <div className={styles.card}>
    <Link to={`/recipe/${recipe.id}`}>
      <div className={styles.image}>
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <div className={styles.contenedordatos}>
      <div className={styles.datos}>
        <h2>{recipe.title}</h2>
        <p>Type of diets: {arraydiets}</p>
      </div>
      </div>
    </Link>
    </div>
  );
};

export default RecipeCard;