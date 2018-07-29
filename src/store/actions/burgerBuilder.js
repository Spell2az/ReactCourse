import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ingredient => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredient,
});

export const removeIngredient = ingredient => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredient,
});

const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients,
});

const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

export const initIngredients = () => dispatch => {
  axios
    .get('https://react-my-burger-52b1e.firebaseio.com/ingredients.json')
    .then(res => {
      const ingredients = res.data;
      dispatch(setIngredients(ingredients));
    })
    .catch(err => dispatch(fetchIngredientsFailed()));
};
