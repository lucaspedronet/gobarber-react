import { put, all, takeLatest, call } from 'redux-saga/effects';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess } from './actions';

function* authResquest({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, `/v1/sessions`, {
    email,
    password,
  });

  const { token, user } = response.data;

  if (!user.active) {
    console.tron.error('Error você precisa ativar seu login!');
    return;
  }

  if (user.profile === 'provider') {
    yield put(signInSuccess(token, user));
    history.push('/dashboard');
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', authResquest)]);
