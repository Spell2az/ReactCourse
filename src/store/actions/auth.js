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

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return { type: actionTypes.AUTH_LOGOUT };
};

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
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', userId);
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

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const expirationDate = new Date(localStorage.getItem('expirationDate'));

  if (!token) dispatch(authLogout());
  if (expirationDate < new Date()) dispatch(authLogout());

  if (token) {
    dispatch(authSuccess(token, userId));
    dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
  }
};
