import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (orderId, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId,
  orderData,
});

const purchaseBurgerFailed = () => ({
  type: actionTypes.PURCHASE_BURGER_FAILED,
});

const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_STARTED,
});

export const purchaseBurger = orderData => dispatch => {
  dispatch(purchaseBurgerStart());
  axios
    .post('/orders.json', orderData)
    .then(resp => {
      const orderId = resp.data.name;
      dispatch(purchaseBurgerSuccess(orderId, orderData));
    })
    .catch(e => dispatch(purchaseBurgerFailed(e)));
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});

const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders,
});

const fetchOrdersFailed = error => ({
  type: actionTypes.FETCH_ORDERS_FAILED,
  error,
});

export const fetchOrdersStarted = () => ({ type: actionTypes.FETCH_ORDERS_STARTED });

export const fetchOrders = () => dispatch => {
  dispatch(fetchOrdersStarted());
  axios
    .get('/orders.json')
    .then(res => {
      const fetchedOrders = Object.keys(res.data).map(key => ({
        ...res.data[key],
        id: key,
      }));
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(err => {
      dispatch(fetchOrdersFailed(err));
    });
};
