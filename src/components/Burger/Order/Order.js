import React from 'react';
import classes from './Order.css';

const order = ({ ingredients, price }) => {
  const ingredientOutput = Object.keys(ingredients)
    .map(ingredient => ({
      name: ingredient,
      amount: ingredients[ingredient],
    }))
    .map(ig => (
      <span
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          padding: '5px',
          border: '1px solid #ccc',
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    ));
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price <strong> &#163; {price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
