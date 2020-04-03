import produce from 'immer';

const INITIAL_STATE = {
  _profile: null,
};

export default function account(state = INITIAL_STATE, active) {
  switch (active.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, (draft) => {
        draft._profile = active.payload.user;
        return draft;
      });
    default:
      return state;
  }
}
