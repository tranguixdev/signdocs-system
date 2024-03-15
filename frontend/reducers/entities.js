import { combineReducers } from 'redux';
import contentFields from './contentFields';
import documents from './documents';
import signatures from './signatures';
import summary from './summary';
import users from './users';
import userRoles from './userRoles';

export default combineReducers({
  contentFields,
  documents,
  signatures,
  users,
  summary,
  userRoles,
});
