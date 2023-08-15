import { Link } from "react-router-dom";
//import Slider from "../../components/Slider/Slider";
import styles from "./LandingPage.module.css";


export default function LandingPage() {
 return (
  <div className={styles.fondo}>
   {/* <Slider /> */}
   <div>
  <div className={styles.title}>
    OPEN THE DOOR TO NEW FOOD RECIPES
   </div> 
  <Link to={"/home"}>
    <button className={styles.button}>See available recipes</button>
  </Link>
  
  </div>


  </div>
 )
 }



