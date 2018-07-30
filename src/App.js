import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount() {
    const { onLoadApp } = this.props;
    onLoadApp();
  }

  render() {
    const { isAuthenticated } = this.props;

    const userLoggedInRoutes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    const userNotLoggedInRoutes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    return (
      <div>
        <Layout>{isAuthenticated ? userLoggedInRoutes : userNotLoggedInRoutes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = ({ authReducer: { userId } }) => ({ isAuthenticated: userId !== null });

const mapDispatchToProps = dispatch => ({ onLoadApp: () => dispatch(actions.authCheckState()) });

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
