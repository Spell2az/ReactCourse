import React, { Component } from 'react';
import qs from 'query-string';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {};

  componentDidMount() {
    const { location } = this.props;
    const params = qs.parse(location.search);
    const ingredients = {};
    let totalPrice = null;
    Object.keys(params).forEach(el => {
      if (el === 'totalPrice') {
        totalPrice = +params[el];
      } else {
        ingredients[el] = +params[el];
      }
    });
    this.setState({ ingredients, totalPrice });
  }

  cancelCheckoutHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  continueCheckoutHandler = () => {
    // console.log(this.props);
    const { history } = this.props;
    history.replace('/checkout/contact-data');
  };

  render() {
    const { match } = this.props;
    const { ingredients, totalPrice } = this.state;
    const summary = (
      <CheckoutSummary
        cancelCheckout={this.cancelCheckoutHandler}
        countinueCheckout={this.continueCheckoutHandler}
        ingredients={ingredients}
      />
    );

    return (
      <div>
        {ingredients ? summary : null}
        <Route
          path={`${match.path}/contact-data`}
          render={props => <ContactData ingredients={ingredients} price={totalPrice} {...props} />}
        />
      </div>
    );
  }
}

export default Checkout;
