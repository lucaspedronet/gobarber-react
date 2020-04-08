import produce from 'immer';

const INITIAL_STATE = {
  _profile: null,
  loading: false,
};

export default function account(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft._profile = action.payload.user;
        break;
      }
      case '@account/UPDATE_PROFILE_SUCCESS': {
        draft._profile = action.payload.profile;
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
