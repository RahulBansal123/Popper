import { LOGIN_ACTION } from './constants';

const initialState = {};

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return state;
    default:
      return state;
  }
};

export default applicationReducer;
