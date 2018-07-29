import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
];
const buildControls = props => {
  const {
    price,
    disabled,
    ingredientAdded,
    ingredientRemoved,
    ordered,
    purchasable,
    isAuthenticated,
  } = props;
  console.log(disabled);
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price:<strong> &#163; {price.toFixed(2)}</strong>
      </p>
      {controls.map(control => (
        <BuildControl
          key={control.label}
          label={control.label}
          disabled={disabled[control.type]}
          added={() => ingredientAdded(control.type)}
          removed={() => ingredientRemoved(control.type)}
        />
      ))}
      <button
        type="button"
        onClick={ordered}
        disabled={!purchasable}
        className={classes.OrderButton}
      >
        {isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
