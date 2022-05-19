import { combineReducers } from 'redux';

import authReducer from './containers/auth/reducers';
import loginReducer from './containers/login/reducers';
import mainReducer from './containers/main/reducers';

const reducers = {
  auth: authReducer,
  login: loginReducer,
  main: mainReducer,
};

export default combineReducers(reducers);
