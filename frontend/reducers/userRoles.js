import { RECEIVE_USER_ROLES } from '../actions/userRole';

const initialState = Object.freeze({});

export default (state = initialState, { type, payload }) => {
  Object.freeze(state);
  const newState = { ...state };
  switch (type) {
    case RECEIVE_USER_ROLES: {
      if (payload?.userRoles) return { ...newState, ...payload.userRoles };
      break;
    }
    default:
      return state;
  }
};
