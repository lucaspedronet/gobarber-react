import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { updateProfileSuccess, updateProfileFailure } from './actions';
import api from '~/services/api';

export function* updateProfile({ payload }) {
  try {
    const { nome, email, username, phone, ...rest } = payload.data;

    const profile =
      ({ nome, email, username, phone }, rest.oldPassword ? rest : {});

    console.tron.log(profile);
    const response = yield call(api.put, `/v1/users`, profile);

    yield put(updateProfileSuccess(response.data));
    toast.success('Perfil atualizado com sucesso!');
  } catch (error) {
    toast.error('Não foi possível atualizar os dados!');
    yield put(updateProfileFailure());
  }
}
export default all([
  takeLatest('@account/UPDATE_PROFILE_REQUEST', updateProfile),
]);
