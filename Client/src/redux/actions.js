import axios from 'axios';

export const PAGE = 'PAGE';
export const ALL_RECIPES = 'ALL_RECIPES';
export const SEARCH_RECIPES = 'SEARCH_RECIPES';
export const DETAIL_RECIPE = 'DETAIL_RECIPE';
export const FILTER_DIETS = 'FILTER_DIETS';
export const FILTER_ORIGIN = 'FILTER_ORIGIN';
export const ORDER = 'ORDER';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const ALL_DIETS = 'ALL_DIETS';
export const CLEAR_RECIPE = 'CLEAR_RECIPE';
export const SAVE_RECIPE_IMAGES = 'SAVE_RECIPE_IMAGES';


export const savePage = (pag) => {
  return {
  type: PAGE,
  payload: pag
  }
  }

export const getAllRecipes = () => {
return async (dispatch) => {
 try {
   let response = await  axios.get('http://localhost:3001/recipes')
   let data = response.data

  const recipeImages = data.map((recipe) => recipe.image);
  dispatch(saveRecipeImages(recipeImages));

   return dispatch({
    type: 'ALL_RECIPES',
    payload: data,
 });

 } catch (error) {
   console.log(error)
 }
 
};
};



export const saveRecipeImages = (images) => {
  return {
    type: SAVE_RECIPE_IMAGES,
    payload: images,
  };
};

export const getAllDiets = () => {
  return async (dispatch) => {
   try {
     let response = await  axios.get('http://localhost:3001/diets')
     let data = response.data
     return dispatch({
      type: 'ALL_DIETS',
      payload: data,
   });
  
   } catch (error) {
     console.log(error)
   }
   
  };
  }

export const getRecipeByName = (name) => {
  return async (dispatch) => {
   try {
     let response = await  axios.get('http://localhost:3001/recipes',{
      params: {
        name: name,
      }
     })
     let data = response.data
     //console.log(data, "aa")
     
     return dispatch({
      type: 'SEARCH_RECIPES',
      payload: data,
   });
  
   } catch (error) {
     console.log(error)
   }
   
  };
  };

  export const getRecipeById = (idRecipe) => {
    return async (dispatch) => {
     try {
       let response = await  axios.get(`http://localhost:3001/recipes/${idRecipe}`)
       let data = response.data
       //console.log(data, "aca")
       return dispatch({
        type: 'DETAIL_RECIPE',
        payload: data,
     });
    
     } catch (error) {
       console.log(error)
     }
     
    };
    }

  export const clearRecipe = () => {
    return {
      type: 'CLEAR_RECIPE',
    };
  };

  export const filterRecipesDiets = (diet) => {
    return {
      type: 'FILTER_DIETS',
      payload: diet,
    };
  }

  export const filterRecipesOrigin = (origin) => {
    return {
      type: 'FILTER_ORIGIN',
      payload: origin,
    };
  }

  export const resetRecipes = () => {
    return {
      type: 'RESET_RECIPES',
    };
  }

  export const orderRecipesByNameAsc = () => ({
    type: ORDER,
    payload: 'asc',
  });
  
  export const orderRecipesByNameDesc = () => ({
    type: ORDER,
    payload: 'desc',
  });
  
  export const orderRecipesByHealthAsc = () => ({
    type: ORDER,
    payload: 'health_asc',
  });
  
  export const orderRecipesByHealthDesc = () => ({
    type: ORDER,
    payload: 'health_desc',
  });

  export const createRecipe = (formData) => {
    return async dispatch => {
      // Lógica para crear una nueva receta en la API
      const response = await axios.post('http://localhost:3001/recipes', formData);
      dispatch({ 
        type: 'CREATE_RECIPE', 
        payload: response.data 
      });
    };
  };
