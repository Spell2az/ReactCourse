import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.9,
  meat: 1.5,
  bacon: 0.9,
};

const reducer = (state = initialState, action) => {
  const { type, ingredient } = action;

  switch (type) {
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ingredient]: state.ingredients[ingredient] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredient],
      };
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...updateObject(state.ingredients, {
            [ingredient]: state.ingredients[ingredient] + 1,
          }),
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredient],
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      break;
  }

  return state;
};

export default reducer;
