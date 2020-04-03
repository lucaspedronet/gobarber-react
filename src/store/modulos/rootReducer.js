import { combineReducers } from 'redux';

import auth from './auth/reducers';
import account from './account/reducers';

export default combineReducers({ auth, account });
