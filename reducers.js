import { combineReducers } from 'redux';

import loginReducer from './containers/login/reducers';

const createReducer = (history) =>
  combineReducers({
    login: loginReducer,
  });

export default createReducer;
