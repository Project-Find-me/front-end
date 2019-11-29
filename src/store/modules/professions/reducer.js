import produce from 'immer';

const INITIAL_STATE = {
  professions: [],
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@professions/LOAD_SUCCESS':
        draft.professions = action.payload.professions;
        break;
      default:
    }
  });
}
