import React, { Component, Fragment } from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  componentWillUpdate() {}

  render() {
    const { ingredients, price, cancel, continued } = this.props;
    const ingredientSummary = Object.keys(ingredients).map(igKey => (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {ingredients[igKey]}
      </li>
    ));

    return (
      <Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: &#163; {price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button type="button" clicked={cancel} btnType="Danger">
          CANCEL
        </Button>
        <Button type="button" clicked={continued} btnType="Success">
          CONTINUE
        </Button>
      </Fragment>
    );
  }
}

export default OrderSummary;
