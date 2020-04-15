import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  schedulesToDay: [],
  availiablesToDay: [],
  appointmentsToDay: [],
};

export default function schedule(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@schedule/SCHEDULE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@schedule/SCHEDULE_SUCCESS': {
        draft.appointmentsToDay = action.payload.appointmentsToDay;
        draft.availiablesToDay = action.payload.availiablesToDay;
        draft.schedulesToDay = action.payload.schedulesToDay;
        draft.loading = false;
        break;
      }
      case '@schedule/SCHEDULE_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
