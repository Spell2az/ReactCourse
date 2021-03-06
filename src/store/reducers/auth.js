import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
};

const authStart = state => updateObject(state, { error: null, loading: true });

const authSuccess = (state, { userId, token }) =>
  updateObject(state, { token, userId, error: null, loading: false });

const authFailed = (state, { error }) => updateObject(state, { error, loading: false });

const authLogout = state => updateObject(state, { token: null, userId: null });

const setAuthRedirectPath = (state, { path }) => updateObject(state, { authRedirectPath: path });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_STARTED:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAILED:
      return authFailed(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
