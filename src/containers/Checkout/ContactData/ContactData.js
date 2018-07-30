import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/order';

const createInputConfig = (elementType, type, placeholder) => ({
  elementType,
  elementConfig: {
    type,
    placeholder,
  },
  value: '',
  validation: {
    required: true,
    minLength: 3,
  },
  valid: false,
  touched: false,
});

class ContactData extends Component {
  state = {
    orderForm: {
      name: createInputConfig('input', 'text', 'Your Name'),
      street: createInputConfig('input', 'text', 'Street'),
      zipCode: createInputConfig('input', 'text', 'Post Code'),
      country: createInputConfig('input', 'text', 'Country'),
      email: createInputConfig('input', 'email', 'Email'),
      delivery: {
        elementType: 'select',
        elementConfig: {
          options: [
            { optionValue: 'fastest', displayValue: 'Fastest' },
            { optionValue: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
        valid: true,
      },
    },
    formIsValid: false,
  };

  inputChangedHandler = (event, elementId) => {
    const { orderForm } = this.state;
    const updatedOrderForm = { ...orderForm };
    const updatedFormElement = { ...updatedOrderForm[elementId] };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[elementId] = updatedFormElement;
    const formValidated = Object.keys(updatedOrderForm).every(
      item => orderForm[item].valid === true
    );
    console.log(formValidated);

    this.setState({ orderForm: updatedOrderForm, formIsValid: formValidated });
  };

  orderHandler = event => {
    const { totalPrice, ingredients, onOrderBurger, token, userId } = this.props;
    const { orderForm } = this.state;

    event.preventDefault();

    const formData = Object.keys(orderForm).reduce((acc, currVal) => {
      acc[currVal] = orderForm[currVal].value;
      return acc;
    }, {});
    const order = {
      ingredients,
      totalPrice,
      orderData: formData,
      userId,
    };

    onOrderBurger(order, token);
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules) {
      if (rules.required) {
        isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
      }

      if (rules.maxLength) {
        isValid = value.length >= rules.maxLength && isValid;
      }
    }

    return isValid;
  };

  render() {
    const { orderForm, formIsValid } = this.state;
    const formElementsArray = Object.keys(orderForm).map(key => ({
      id: key,
      config: orderForm[key],
      valid: orderForm[key].valid,
      validation: orderForm[key].validation,
      value: orderForm[key].value,
      touched: orderForm[key].touched,
    }));

    let form = (
      <form method="post" onSubmit={this.orderHandler}>
        {formElementsArray.map(({ id, config, value, valid, validation, touched }) => (
          <Input
            key={id}
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            value={value}
            invalid={!valid}
            shouldValidate={validation}
            touched={touched}
            changed={event => this.inputChangedHandler(event, id)}
          />
        ))}
        <Button disabled={!formIsValid} type="submit" btnType="Success">
          ORDER
        </Button>
      </form>
    );
    const { loading } = this.props;
    if (loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = ({
  burgerBuilderReducer: { ingredients, totalPrice },
  orderReducer: { loading },
  authReducer: { token, userId },
}) => ({
  ingredients,
  totalPrice,
  loading,
  token,
  userId,
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
