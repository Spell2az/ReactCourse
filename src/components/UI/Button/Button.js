/* eslint "react/button-has-type": 0 */

import React from 'react';
import pt from 'prop-types';
import classes from './Button.css';

const button = ({ clicked, btnType, children, type, disabled }) => (
  <button
    type={type}
    disabled={disabled}
    className={[classes.Button, classes[btnType]].join(' ')}
    onClick={clicked}
  >
    {children}
  </button>
);

button.pt = {
  type: pt.string,
};
export default button;
