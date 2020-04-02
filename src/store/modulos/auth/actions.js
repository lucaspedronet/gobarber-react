export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(toke, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { toke, user },
  };
}
