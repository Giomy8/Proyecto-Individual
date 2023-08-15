import styles from "./Slider.module.css";
import { useState, useEffect } from "react";

export default function Slider(props) {
const [slide, setSlide] = useState(0);

  function playSlider(){
    let newStep=slide+1
    if(newStep>4) newStep=0
    setSlide(newStep)
    console.log('Paso',newStep,slide)
  }

  useEffect(() => {
   //setInterval(playSlider, 10000);
  },[])

  //setInterval(playSlider, 10000);
  return (
    
    <div className={styles.slideZone}>
{/*       <div className={`${styles.img01} ${slide >= 1 ? styles.deslizar : styles.normal}`}>
      <img src="../src/assets/landing/bg01.jpg" alt="" id="img01" />
      </div>

      <div className={`${styles.img02} ${slide >= 2 ? styles.deslizar : styles.normal}`}>
       <img src="../src/assets/landing/bg02.jpg" alt=""/> 
      </div>

      <div className={`${styles.img03} ${slide >= 3 ? styles.deslizar : styles.normal}`}>
      <img src="../src/assets/landing/bg03.jpg" alt="" id="img03" />
      </div>

      <div className={`${styles.img04} ${slide >= 4 ? styles.deslizar : styles.normal}`}>
      <img src="../src/assets/landing/bg04.jpg" alt="" id="img04" />
      </div>

      <div className={`${styles.img02} ${styles.normal}`}>
      <img src="../src/assets/landing/bg01.jpg" alt="" id="img05" />
      </div> */}
    </div>

  );
}