import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  user: null,
  provider: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST':
        draft.loading = true;
        break;
      case '@auth/SIGN_IN_SUCESS':
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        draft.user = action.payload.user;
        draft.provider = action.payload.provider;
        break;
      case '@auth/SIGN_FAILURE':
        draft.loading = false;
        break;
      case '@auth/SIGN_UP_REQUEST':
        draft.loading = true;
        break;
      case '@auth/SIGN_UP_SUCESS':
        draft.loading = false;
        break;
      case '@auth/SIGN_OUT':
        draft.token = null;
        draft.signed = false;
        draft.user = null;
        break;
      default:
    }
  });
}
