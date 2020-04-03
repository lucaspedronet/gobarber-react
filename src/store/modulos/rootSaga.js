// eslint-disable-next-line import/no-named-as-default-member
import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import account from './account/sagas';

export default function* rootSaga() {
  return yield all([auth, account]);
}
