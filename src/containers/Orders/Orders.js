import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Burger/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {
  componentDidMount() {
    const { onFetchOrders } = this.props;
    onFetchOrders();
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

const mapStateToProps = ({ orderReducer: { loading, orders } }) => ({
  loading,
  orders,
});

const mapDispatchToProps = dispatch => ({ onFetchOrders: () => dispatch(actions.fetchOrders()) });
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
