import * as APIUtil from '../utils/userRole';

export const RECEIVE_USER_ROLES = 'RECEIVE_USER_ROLES';

const receiveUserRoles = (userRoles) => ({
  type: RECEIVE_USER_ROLES,
  payload: userRoles,
});
export const fetchUserRoles = () => (dispatch) =>
  APIUtil.fetchUserRoles().then((userRoles) => {
    dispatch(receiveUserRoles(userRoles));
    return userRoles;
  });
