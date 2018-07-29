import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  loading: false,
  orders: [],
  purchased: false,
};

const reducer = (state = initialState, action) => {
  const { orderId, orderData, orders } = action;
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.concat({ orderId, ...orderData }),
        purchased: true,
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.PURCHASE_BURGER_STARTED:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.FETCH_ORDERS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders,
        loading: false,
      };
    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
