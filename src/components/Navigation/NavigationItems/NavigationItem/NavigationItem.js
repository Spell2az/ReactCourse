import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.css';

const navigationItem = ({ exact, link, children }) => (
  <li className={classes.NavigationItem}>
    <NavLink exact={exact} activeClassName={classes.active} to={link}>
      {children}
    </NavLink>
  </li>
);

export default navigationItem;
