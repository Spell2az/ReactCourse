import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Burger/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {
  componentDidMount() {
    const { onFetchOrders, token, userId } = this.props;
    onFetchOrders(token, userId);
  }

  render() {
    const { orders, loading } = this.props;
    let orderItems = orders.map(o => (
      <Order key={o.id} ingredients={o.ingredients} price={o.totalPrice} />
    ));
    if (loading) {
      orderItems = <Spinner />;
    }

    return <div>{orderItems}</div>;
  }
}

const mapStateToProps = ({
  orderReducer: { loading, orders },
  authReducer: { token, userId },
}) => ({
  loading,
  orders,
  token,
  userId,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
