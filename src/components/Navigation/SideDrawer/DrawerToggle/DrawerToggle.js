/* eslint "jsx-a11y/click-events-have-key-events": 0, "jsx-a11y/no-static-element-interactions": 0, "jsx-a11y/aria-role": 0 */

import React from 'react';
import classes from './DrawerToggle.css';

const drawerToggle = ({ clicked }) => (
  <div role="drawer" className={classes.DrawerToggle} onClick={clicked}>
    <div />
    <div />
    <div />
  </div>
);

export default drawerToggle;
