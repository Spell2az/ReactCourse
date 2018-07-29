import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends React.Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },

    isSignIn: true,
  };

  componentDidMount() {
    const { building, onSetAuthRedirectPath, authRedirectPath } = this.props;
    if (!building && authRedirectPath !== '/') onSetAuthRedirectPath();
  }

  onSubmitHandler = event => {
    const { onAuthenticate } = this.props;
    event.preventDefault();
    const {
      controls: { email, password },
      isSignIn,
    } = this.state;
    onAuthenticate(email.value, password.value, isSignIn);
  };

  switchAuthModeHandler = () =>
    this.setState(prevState => ({
      isSignIn: !prevState.isSignIn,
    }));

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, elementId) => {
    const { controls } = this.state;
    const updatedControls = { ...controls };
    const updatedFormElement = { ...updatedControls[elementId] };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedControls[elementId] = updatedFormElement;
    const formValidated = Object.keys(updatedControls).every(item => controls[item].valid === true);
    console.log(formValidated);

    this.setState({ controls: updatedControls });
  };

  render() {
    const { controls, isSignIn } = this.state;
    const { loading, error, isAuthenticated, authRedirectPath } = this.props;
    const formElementsArray = Object.keys(controls).map(key => ({
      id: key,
      config: controls[key],
      valid: controls[key].valid,
      validation: controls[key].validation,
      value: controls[key].value,
      touched: controls[key].touched,
    }));

    return (
      <div className={classes.Auth}>
        {isAuthenticated && <Redirect to={authRedirectPath} />}
        {error && <p>{error.message}</p>}
        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.onSubmitHandler}>
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
            <Button type="submit" btnType="Success">
              SUBMIT
            </Button>
          </form>
        )}
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {isSignIn ? 'SIGNUP' : 'SIGNIN'}
        </Button>
      </div>
    );
  }
}

const mapStatetoProps = ({
  burgerBuilderReducer: { building },
  authReducer: { loading, error, userId, authRedirectPath },
}) => ({
  loading,
  error,
  isAuthenticated: userId !== null,
  building,
  authRedirectPath,
});

const mapDispatchToProps = dispatch => ({
  onAuthenticate: (email, password, isSignIn) => dispatch(actions.auth(email, password, isSignIn)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Auth);
