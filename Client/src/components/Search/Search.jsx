import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {IconSearch} from "@tabler/icons-react";
import { useDispatch } from 'react-redux';
import { getRecipeByName} from '../../redux/actions.js';
import styles from './Search.module.css';


export default function Search({onSearch, setAccess}) {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [title , setTitle] = useState ("");

  function handleChange (event){
     let valor = event.target.value
     setTitle(valor)
  }

  async function handleSearch() {
    try {
      dispatch(getRecipeByName(title)); 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className = {styles.contenedor}>
    <div className = {styles.buscador}>
     <input className={styles.input} type='search' onChange = {handleChange}
    />
    
    <i className={styles.lupa}>
       <IconSearch/>
    </i>  
    </div>
    <button className={styles.button} onClick={handleSearch}>Search</button>

    
 </div>
  );

}