export function updateProfileRequest(data) {
  return {
    type: '@account/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@account/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: '@account/UPDATE_PROFILE_SUCCESS',
  };
}
