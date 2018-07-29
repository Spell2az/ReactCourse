import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
  };

  render() {
    const { isAuthenticated } = this.props;

    const { showSideDrawer } = this.state;
    const { children } = this.props;
    return (
      <Fragment>
        <Toolbar isAuthenticated={isAuthenticated} clicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          isAuthenticated={isAuthenticated}
          open={showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{children}</main>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ authReducer: { userId } }) => ({ isAuthenticated: userId !== null });

export default connect(mapStateToProps)(Layout);
