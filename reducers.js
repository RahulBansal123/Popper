import { combineReducers } from 'redux';

import authReducer from './containers/auth/reducers';
import loginReducer from './containers/login/reducers';

const reducers = {
  auth: authReducer,
  login: loginReducer,
};

export default combineReducers(reducers);
