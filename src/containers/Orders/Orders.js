import React, { Component } from 'react';
import Order from '../../components/Burger/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get('/orders.json')
      .then(res => {
        const fetchedOrders = Object.keys(res.data).map(key => ({
          ...res.data[key],
          id: key,
        }));

        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { orders, loading } = this.state;
    let orderItems = orders.map(o => (
      <Order key={o.id} ingredients={o.ingredients} price={o.price} />
    ));
    if (loading) {
      orderItems = <Spinner />;
    }

    return <div>{orderItems}</div>;
  }
}

export default withErrorHandler(Orders, axios);
