import React from 'react';

import classes from './BuildControl.css';

const buildControl = ({ label, disabled, removed, added }) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{label}</div>
    <button type="button" disabled={disabled} onClick={removed} className={classes.Less}>
      Less
    </button>
    <button type="button" onClick={added} className={classes.More}>
      More
    </button>
  </div>
);

export default buildControl;
