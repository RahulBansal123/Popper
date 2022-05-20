import { combineReducers } from 'redux';

import accountReducer from './containers/account/reducers';
import authReducer from './containers/auth/reducers';
import loginReducer from './containers/login/reducers';
import mainReducer from './containers/main/reducers';

const reducers = {
  account: accountReducer,
  auth: authReducer,
  login: loginReducer,
  main: mainReducer,
};

export default combineReducers(reducers);
