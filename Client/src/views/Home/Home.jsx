import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import styles from './Home.module.css';
import Cards from '../../components/Cards/Cards.jsx';
import { getAllRecipes, filterRecipesDiets,filterRecipesOrigin,savePage, getAllDiets, orderRecipesByNameAsc,orderRecipesByNameDesc, orderRecipesByHealthAsc, orderRecipesByHealthDesc} from '../../redux/actions.js'; // Importa las acciones necesarias

const HomePage = () => {
  const dispatch = useDispatch();

  // Obtener el estado de Redux
  const allRecipes = useSelector((store) => store.allrecipes);
  const recipes = useSelector((store) => store.recipes);
  const nowPage = useSelector((store) => store.page);
  const diets = useSelector((store) => store.diets);
  const order = useSelector((store) => store.order);
  

  const[recipesPage, setRecipesPage] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const [filterDiet, setFilterDiet] = useState('all');
  const [orderRecipes, setOrderRecipes] = useState('all');
  const [filterOrigin, setFilterOrigin] = useState('all');

  let pageRecipes = [];
  const recipesPerPage = 9;

  function paginator(pag){
    setActualPage(pag);
    const init = (pag - 1) * recipesPerPage;
    const end = init + recipesPerPage;
    pageRecipes = recipes?.slice(init, end);
    setRecipesPage(pageRecipes);
    console.log("xx" + pag, pageRecipes);
    window.scrollTo({
      top: 0,
      behavior: 'smooth', //desplazamiento suave
    });
    dispatch(savePage(pag));
  }

  let totalPages = 1;
  let [btnPaginator, setBtnPaginator] = useState(null);

  useEffect(() => {
    if (recipes?.length > 0) {
      totalPages = Math.ceil(recipes.length / recipesPerPage);

    let new_btnPaginator = Array.from (
      {length: totalPages},
      (_, index) => index + 1
      );
      setBtnPaginator(new_btnPaginator);
      paginator(nowPage);
      console.log("qq", nowPage);
    }
  }, [recipes]);

  function handleFilterDiet(event){
    dispatch(filterRecipesDiets(event.target.value));
    setFilterDiet(event.target.value)
    setFilterOrigin('all')
    setActualPage(1)
    paginator(1);
  }

  function handleFilterDietCard(filtro){
    setActualPage(1)
    dispatch(filterRecipesDiets(filtro));
    setFilterDiet(filtro)
    setFilterOrigin('all')
    paginator(1);
  }
    
   function handleFilterOrigin(event){
    setActualPage(1)
    dispatch(filterRecipesOrigin(event.target.value));
    setFilterOrigin(event.target.value)
    setFilterDiet('all')
    paginator(1);
  } 

  useEffect(() => {
    if (orderRecipes === 'asc') {
      dispatch(orderRecipesByNameAsc());
    } else if (orderRecipes === 'desc') {
      dispatch(orderRecipesByNameDesc());
    } else if (orderRecipes === 'health_asc') {
      dispatch(orderRecipesByHealthAsc());
    } else if (orderRecipes === 'health_desc') {
      dispatch(orderRecipesByHealthDesc());
    }
  }, [orderRecipes]);
  

  useEffect(() => {
    dispatch(getAllRecipes())
    .catch(error => {
      console.error('Error when obtaining recipes', error);
    });
    dispatch(getAllDiets())
    .catch(error => {
      console.error('Error when obtaining diets', error);
    });
  },[]);

  return (
    <div className={styles.fondo}>
      <div className={styles.filtros}>
        <select onChange={handleFilterDiet} value={filterDiet}>
          <option value="all">Filter by Diet</option>
          {diets?.map((diet, i) => (
            <option key={i} value={`${diet.name}`}>
              {diet.name}
            </option>
          ))}
          <option value="all">All Diets</option>
        </select>

        <select onChange={handleFilterOrigin} value={filterOrigin}>
          <option value="all">Filter by Origin</option>
          <option value="api">API</option>
          <option value="db">Data Base</option>
          <option value="all">All</option>
        </select>

         <select onChange={(e) => setOrderRecipes(e.target.value)} value={orderRecipes}>
            <option value="all">Order by</option>
            <option value="asc">Name A-Z</option>
            <option value="desc">Name Z-A</option>
            <option value="health_asc">Health Score (Low to High)</option>
            <option value="health_desc">Health Score (High to Low)</option>
        </select> 

        
      </div>

      <div>
        <Cards recipes={recipesPage} handleFilterDietCard={handleFilterDietCard} />
      </div>

      <div className={styles.pages}>
        {btnPaginator?.map((numeroPag, i) => (
          <button
            className={actualPage === numeroPag ? styles.active : null}
            key={i}
            onClick={() => paginator(numeroPag)}
          >{`${numeroPag}`}</button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

