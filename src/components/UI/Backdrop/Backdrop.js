/* eslint "jsx-a11y/no-static-element-interactions": 0, "jsx/a11y/click-events-have-key-events": 0 */

import React from 'react';
import classes from './Backdrop.css';

const backdrop = ({ show, clicked }) =>
  show ? <div onClick={clicked} className={classes.Backdrop} onKeyDown={() => {}} /> : null;

export default backdrop;
