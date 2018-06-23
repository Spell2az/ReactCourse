import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = ({ ingredients, cancelCheckout, countinueCheckout }) => (
  <div className={classes.CheckoutSummary}>
    <h1>We hope it tastes well, or not!!!</h1>
    <div style={{ width: '100%', margin: 'auto' }}>
      <Burger ingredients={ingredients} />
    </div>
    <Button clicked={cancelCheckout} btnType="Danger">
      CANCEL
    </Button>
    <Button clicked={countinueCheckout} btnType="Success">
      CONTINUE
    </Button>
  </div>
);

export default checkoutSummary;
