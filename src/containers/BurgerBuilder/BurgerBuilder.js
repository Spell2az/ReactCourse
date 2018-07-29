import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSumary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    const { onInitIngredients } = this.props;
    onInitIngredients();
  }

  purchaseHandler = () => {
    const { isAuthenticated, history, onSetAuthRedirectPath } = this.props;
    if (isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      onSetAuthRedirectPath('/checkout');
      history.push({
        pathname: '/auth',
      });
    }
  };

  purchaseCanceledHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const { history, onInitPurchase } = this.props;
    onInitPurchase();
    history.push({
      pathname: '/checkout',
    });
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sumOf, el) => sumOf + el, 0);
    return sum > 0;
  };

  render() {
    const { purchasing } = this.state;
    const {
      ingredients,
      onIngredientAdded,
      onIngredientRemoved,
      totalPrice,
      error,
      isAuthenticated,
    } = this.props;

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    let disabledInfo = {};

    if (ingredients) {
      disabledInfo = Object.keys(ingredients).reduce((acc, key) => {
        acc[key] = ingredients[key] <= 0;
        return acc;
      }, {});

      burger = (
        <Fragment>
          <Burger ingredients={ingredients} />
          <BuildControls
            price={totalPrice}
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(ingredients)}
            ordered={this.purchaseHandler}
            isAuthenticated={isAuthenticated}
          />
        </Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          cancel={this.purchaseCanceledHandler}
          continued={this.purchaseContinueHandler}
          price={totalPrice}
        />
      );
    }
    return (
      <Fragment>
        <Modal modalClosed={this.purchaseCanceledHandler} show={purchasing}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  burgerBuilderReducer: { ingredients, totalPrice, error },
  authReducer: { userId },
}) => ({
  ingredients,
  totalPrice,
  error,
  isAuthenticated: userId !== null,
});
const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingredient => dispatch(actions.addIngredient(ingredient)),
  onIngredientRemoved: ingredient => dispatch(actions.removeIngredient(ingredient)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
