import { call, all, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { scheduleSuccess, scheduleFailure } from '../schedule/actions';
import api from '~/services/api';

export function* schedule({ payload }) {
  try {
    const { date } = payload;

    const { appointments, schedules } = yield all({
      appointments: call(api.get, '/v1/schedule', {
        params: { date },
      }),
      schedules: call(api.get, '/v1/providers/available', {
        params: { date: date.getTime() },
      }),
    });

    const { scheduleWeek, availiable } = schedules.data;

    yield put(scheduleSuccess(scheduleWeek, availiable, appointments.data));
  } catch (error) {
    toast.error(
      'Falha, não foi possível carregar sua agenda, verifique sua conexão!'
    );
    yield put(scheduleFailure());
  }
}

export default all([takeLatest('@schedule/SCHEDULE_REQUEST', schedule)]);
