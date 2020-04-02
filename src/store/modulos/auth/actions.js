export function authSuccess(token) {
  return {
    type: '@auth/AUTH_SUCCESS',
    playoud: token,
  };
}
