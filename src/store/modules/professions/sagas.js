import { takeLatest, all, put, call } from 'redux-saga/effects';

import api from '../../../services/api';
import { loadProfessionsSuccess, loadProfessionsFailure } from './actions';

export function* setProfessions() {
  try {
    const { data } = yield call(api.get, 'servico/todos-servicos');

    yield put(loadProfessionsSuccess([...data]));
  } catch (error) {
    yield put(loadProfessionsFailure());
  }
}

export default all([takeLatest('persist/REHYDRATE', setProfessions)]);
