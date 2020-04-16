// eslint-disable-next-line import/extensions
import { combineReducers } from 'redux';

import auth from './auth/reducers';
import account from './account/reducers';
import schedule from './schedule/reducers';

export default combineReducers({ auth, account, schedule });
