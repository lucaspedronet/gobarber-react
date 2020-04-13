import produce from 'immer';

const INITIAL_STATE = {
  schedule: [],
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
