/* eslint "jsx-a11y/label-has-for" : 0 */

import React from 'react';
import classes from './Input.css';

const input = props => {
  let inputElement = null;
  const { elementConfig, label, value } = props;
  switch (props.inputtype) {
    case 'input':
      inputElement = <input className={classes.InputElement} {...elementConfig} value={value} />;
      break;
    case 'textarea':
      inputElement = <textarea className={classes.InputElement} {...elementConfig} value={value} />;
      break;
    default:
      inputElement = <input className={classes.InputElement} {...elementConfig} value={value} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
    </div>
  );
};

export default input;
