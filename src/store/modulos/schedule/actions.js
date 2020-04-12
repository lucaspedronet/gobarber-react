export function scheduleLoadingRequest() {
  return {
    type: '@schedule/SHEDULE_LOADING_REQUEST',
  };
}

export function scheduleLoadingSuccess(schedule) {
  return {
    type: '@schedule/SCHEDULE_LOADING_SUCCESS',
    payload: { schedule },
  };
}

export function scheduleLoadingFailure() {
  return {
    type: '@schedule/SCHEDULE_LOADING_SUCCESS',
  };
}
