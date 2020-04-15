export function scheduleRequest(date) {
  return {
    type: '@schedule/SHEDULE_REQUEST',
    payload: { date },
  };
}

export function scheduleSuccess(
  schedulesToDay,
  availiablesToDay,
  appointmentsToDay
) {
  return {
    type: '@schedule/SCHEDULE_SUCCESS',
    payload: { schedulesToDay, availiablesToDay, appointmentsToDay },
  };
}

export function scheduleFailure() {
  return {
    type: '@schedule/SCHEDULE_SUCCESS',
  };
}
