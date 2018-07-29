import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Burger/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {
  componentDidMount() {
    const { onFetchOrders, token } = this.props;
    onFetchOrders(token);
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

const mapStateToProps = ({ orderReducer: { loading, orders }, authReducer: { token } }) => ({
  loading,
  orders,
  token,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: token => dispatch(actions.fetchOrders(token)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
