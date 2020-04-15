// eslint-disable-next-line import/no-named-as-default-member
import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import account from './account/sagas';
import schedule from './schedule/sagas';

export default function* rootSaga() {
  return yield all([auth, account, schedule]);
}
