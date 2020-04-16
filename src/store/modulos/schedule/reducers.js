import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  schedulesToDay: [],
  availiablesToDay: [],
  appointmentsToDay: [],
  scheduleFormatted: [],
};

export default function schedule(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@schedule/SCHEDULE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@schedule/SCHEDULE_SUCCESS': {
        const {
          schedulesToDay,
          availiablesToDay,
          appointmentsToDay,
        } = action.payload;
        draft.schedulesToDay = schedulesToDay || [];
        draft.availiablesToDay = availiablesToDay || [];
        draft.appointmentsToDay = appointmentsToDay || [];
        draft.loading = false;
        break;
      }
      case '@schedule/SCHEDULE_FAILURE': {
        draft.appointmentsToDay = [];
        draft.availiablesToDay = [];
        draft.schedulesToDay = [];
        draft.loading = false;
        break;
      }
      case '@schedule/SCHEDULE_FORMATTED_SUCCESS': {
        draft.scheduleFormatted = action.payload.scheduleFormatted || [];
        break;
      }
      default:
    }
  });
}
