import { PAGE,ALL_RECIPES, SEARCH_RECIPES, DETAIL_RECIPE, CREATE_RECIPE, ORDER,CLEAR_RECIPE,FILTER_DIETS,FILTER_ORIGIN,ALL_DIETS, SAVE_RECIPE_IMAGES} from './actions'; 

const initialState = {
  recipes: [],
  allrecipes: [],
  diets: [],
  page: 1,
  recipe:{},
  recipeImages: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case PAGE:
      return {
        ...state,
        page: action.payload,
        };
    case SAVE_RECIPE_IMAGES:
      return {
        ...state,
        recipeImages: [...action.payload],
      };
    case ALL_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
        allrecipes: [...action.payload],
      };
    case SEARCH_RECIPES:
        return {
          ...state,
          recipes: [...action.payload],
          };
    case DETAIL_RECIPE:
            return {
              ...state,
              recipe: action.payload,
              };
    case CLEAR_RECIPE:
            return {
              ...state,
              recipe: {},
              };
    case ALL_DIETS:
      return {
        ...state,
        diets: [...action.payload],
      }
      case FILTER_DIETS:
        let filteredRecipes = [];
        if (action.payload === 'all') {
          filteredRecipes = state.allrecipes;
        } else {
          filteredRecipes = state.allrecipes.filter(recipe => {
            if (recipe.diets) {
              return recipe.diets.includes(action.payload);
            } else if (recipe.Diets) {
              const dietsNames = recipe.Diets.map(diet => diet.name);
              return dietsNames.includes(action.payload);
            }
            return false;
          });
        }
      
        return {
          ...state,
          recipes: filteredRecipes,
        };
    case FILTER_ORIGIN:
          function searchOrigin(array, searchOrigin) {
            const resultsAPI = [];
            const resultsDB = [];

            array.forEach(item=>{
              if(typeof item.id === 'number') {
                resultsAPI.push(item);
              }else {
                resultsDB.push(item);
              }
            })
            return searchOrigin === 'api' ? resultsAPI : resultsDB;
          }
          let newRecipes2
              if(action.payload === "all") {
                newRecipes2 = [...state.allrecipes];
              }else {
                newRecipes2 = searchOrigin([...state.allrecipes], action.payload);
              }
          console.log("reducer-filter",action.payload, newRecipes2);
          return {
            ...state,
            recipes: [...newRecipes2],
            };
            
    case CREATE_RECIPE:
          return {
            ...state,
            recipes: [...state.recipes, action.payload],
          };
    case ORDER:
            function orderByName(array, order) {
              const sorted = array.slice().sort((a, b) => {
                if (order === 'asc') {
                  return a.title.localeCompare(b.title);
                } else if (order === 'desc') {
                  return b.title.localeCompare(a.title);
                }
              });
              return sorted;
            }
      
            function orderByHealth(array, order) {
              const sorted = array.slice().sort((a, b) => {
                if (order === 'asc') {
                  return a.healthScore - b.healthScore;
                } else if (order === 'desc') {
                  return b.healthScore - a.healthScore;
                }
              });
              return sorted;
            }
      
            let newRecipes3;
            if (action.payload === 'asc' || action.payload === 'desc') {
              newRecipes3 = orderByName([...state.allrecipes], action.payload);
            } else if (action.payload === 'health_asc' || action.payload === 'health_desc') {
              newRecipes3 = orderByHealth([...state.allrecipes], action.payload.substr(7)); // Removing 'health_' prefix
            } else {
              newRecipes3 = [...state.allrecipes];
            }
      
            return {
              ...state,
              recipes: [...newRecipes3],
            };


          default:
          return state;
          }
      }



        
  