import { LOGIN_ACTION, SET_USER } from './constants';

export const loginAction = () => {
  return {
    type: LOGIN_ACTION,
  };
};

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
