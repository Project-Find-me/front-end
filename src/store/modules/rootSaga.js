import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import professions from './professions/sagas';

export default function* rootSaga() {
  return yield all([auth, professions]);
}
