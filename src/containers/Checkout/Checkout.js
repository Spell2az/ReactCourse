import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {};

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
    const { ingredients, purchased, match } = this.props;
    const summary = (
      <Fragment>
        {purchased && <Redirect to="/" />}
        <CheckoutSummary
          cancelCheckout={this.cancelCheckoutHandler}
          countinueCheckout={this.continueCheckoutHandler}
          ingredients={ingredients}
        />
        <Route path={`${match.path}/contact-data`} component={ContactData} />
      </Fragment>
    );

    return <div>{ingredients ? summary : <Redirect to="/" />}</div>;
  }
}

const mapStateToProps = ({
  burgerBuilderReducer: { ingredients },
  orderReducer: { purchased },
}) => ({
  ingredients,
  purchased,
});

export default connect(mapStateToProps)(Checkout);
