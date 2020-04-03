import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, active) {
  switch (active.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, (draft) => {
        draft.token = active.payload.token;
        draft.signed = true;
        return draft;
      });
    default:
      return state;
  }
}
