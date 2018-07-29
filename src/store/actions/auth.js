import axios from 'axios';
import * as actionTypes from './actionTypes';

const authStarted = () => ({
  type: actionTypes.AUTH_STARTED,
});

const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
});

const authFailed = error => ({
  type: actionTypes.AUTH_FAILED,
  error,
});

export const authLogout = () => ({ type: actionTypes.AUTH_LOGOUT });

const checkAuthTimeout = expirationTime => dispatch =>
  setTimeout(() => dispatch(authLogout()), expirationTime * 1000);

export const auth = (email, password, isSignIn) => dispatch => {
  dispatch(authStarted());
  const authData = { email, password, returnSecureToken: true };
  axios
    .post(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${
        isSignIn ? 'verifyPassword' : 'signupNewUser'
      }?key=AIzaSyDlTyXTRbd3o3DoumJoOww20DhMi9sQotk`,
      authData
    )
    .then(res => {
      console.log(res);
      const { idToken: token, localId: userId, expiresIn } = res.data;
      dispatch(authSuccess(token, userId));
      dispatch(checkAuthTimeout(expiresIn));
    })
    .catch(err => {
      console.log(err);
      dispatch(authFailed(err.response.data.error));
    });
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});
