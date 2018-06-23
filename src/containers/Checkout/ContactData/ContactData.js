import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

const createInputConfig = (elementType, type, placeholder) => ({
  elementType,
  elementConfig: {
    type,
    placeholder,
  },
  value: '',
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
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
      },
    },
    loading: false,
  };

  orderHandler = event => {
    const { price, ingredients } = this.props;
    event.preventDefault();
    console.log(price, ingredients);
    this.setState({ loading: true });
    const order = {
      ingredients,
      price,
      customer: {
        name: 'Martin Kovac',
        address: {
          street: 'Test street 22',
          zipCode: '12321312',
          country: 'Slovakia',
        },
        email: 'test@test.com',
      },
      delivery: 'superfast',
    };
    console.log(order);
    axios
      .post('/orders.json', order)
      .then(resp => {
        const { history } = this.props;
        this.setState({ loading: false });
        history.push('/');
      })
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    const { orderForm } = this.state;
    const formElementsArray = Object.keys(orderForm).map(key => ({
      id: key,
      config: orderForm[key],
    }));

    let form = (
      <form>
        {formElementsArray.map(({ id, config, value }) => (
          <Input
            key={id}
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            value={value}
          />
        ))}
        <Button clicked={this.orderHandler} btnType="Success">
          ORDER
        </Button>
      </form>
    );
    const { loading } = this.state;
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

export default ContactData;
