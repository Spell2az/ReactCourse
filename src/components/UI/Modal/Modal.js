import React, { Component, Fragment } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    const { show, children } = this.props;
    return nextProps.show !== show || nextProps.children !== children;
  }

  render() {
    const { show, children, modalClosed } = this.props;
    return (
      <Fragment>
        <div
          className={classes.Modal}
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0',
          }}
        >
          {children}
        </div>
        <Backdrop clicked={modalClosed} show={show} />
      </Fragment>
    );
  }
}

export default Modal;
