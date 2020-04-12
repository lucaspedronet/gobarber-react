import produce from 'immer';

const INITIAL_STATE = {
  _profile: null,
  loading: false,
};

export default function schedule(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@schedule/SCHEDULE_LOADING_SUCCESS': {
        break;
      }
      default:
    }
  });
}
