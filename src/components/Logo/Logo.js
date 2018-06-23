import React from 'react';
import classes from './Logo.css';

import burgerLogo from '../../Assets/Images/burger-logo.png';

const logo = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="MyBurger logo" />
  </div>
);

export default logo;
