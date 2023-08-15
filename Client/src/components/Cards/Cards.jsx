import RecipeCard from "../Card/RecipeCard.jsx";
import styles from "./Cards.module.css";

export default function Cards({recipes}) {
    return(
    <div className = {styles.distribucion}>
       {recipes?.map((recipe,i)=>{
          return (
          <RecipeCard key = {i}
           recipe ={recipe}
          />
          );
       })}
    </div>
    );
 }