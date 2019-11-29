import { combineReducers } from 'redux';

import auth from './auth/reducer';
import professions from './professions/reducer';

export default combineReducers({
  auth,
  professions,
});
