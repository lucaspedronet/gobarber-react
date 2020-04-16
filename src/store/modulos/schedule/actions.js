export function scheduleRequest(date) {
  return {
    type: '@schedule/SCHEDULE_REQUEST',
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

export function scheduleFormattedSuccess(scheduleFormatted) {
  return {
    type: '@schedule/SCHEDULE_FORMATTED_SUCCESS',
    payload: { scheduleFormatted },
  };
}

export function scheduleFailure() {
  return {
    type: '@schedule/SCHEDULE_FAILURE',
  };
}
