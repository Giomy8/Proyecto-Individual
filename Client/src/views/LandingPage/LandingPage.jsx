import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../redux/actions.js';

export default function LandingPage() {
  const dispatch = useDispatch();
  const recipeImages = useSelector((store) => store.recipeImages);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    dispatch(getAllRecipes())
      .catch((error) => {
        console.error('Error when obtaining recipes', error);
      });
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Cambiar la imagen mostrada al siguiente índice
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % recipeImages.length);
    }, 3000); // Cambiar la imagen cada 3 segundos

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [recipeImages.length]);

  return (
    <div className={styles.fondo}>
      <div className={styles.slideshowContainer}>
        {recipeImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Recipe ${index}`}
            className={`${styles.slideshowImage} ${index === currentImageIndex ? styles.show : ''}`}
          />
        ))}
      </div>
      <div>
        <div className={styles.title}>
          OPEN THE DOOR TO NEW FOOD RECIPES
        </div> 
        <Link to="/home">
          <button className={styles.button}>See available recipes</button>
        </Link>
      </div>
    </div>
  );
}




