import { all, put, takeLatest } from 'redux-saga/effects';
import { authSuccess } from './actions';

function* auth({ token }) {
  yield put(authSuccess(token));
}

export default all([takeLatest('@auth/AUTH_SUCCESS', auth)]);
