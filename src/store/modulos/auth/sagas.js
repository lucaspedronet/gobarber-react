import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, `/v1/sessions`, {
      email,
      password,
    });

    const { token, user } = response.data.data;

    if (!user.active) {
      toast.error('Seu login não esta ativado!');
    }

    if (!user.profile === 'provider') {
      toast.error('Apenas providers podem realizar autenticação!');
      yield put(signFailure());

      history.push('/');
    }

    yield put(signInSuccess(token, user));

    api.defaults.headers.Authorization = `Bearer ${token}`;
    history.push('/dashboard');
  } catch (error) {
    console.log(error);
    toast.error('Falha na autenticação, verifique seus dados!');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password, phone, profile } = payload;

    yield call(api.post, `/v1/users`, {
      name,
      email,
      password,
      phone: String(phone),
      profile,
      active: true,
    });

    console.tron.log(payload);
    history.push('/');
  } catch (error) {
    toast.error('Não foi possível realizar seu cadastro, tente novamente!');

    yield put(signFailure());
  }
}

function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
