import * as APIUtil from '../utils/userByAdmin';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_SESSION_ERROR = 'RECEIVE_SESSION_ERROR';

// Action creators
const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  payload: users,
});

export const receiveErrors = (errors) => ({
  payload: errors,
  type: RECEIVE_SESSION_ERROR,
});

export const clearErrors = () => (dispatch) => dispatch(receiveErrors({}));
export const fetchUser = (userId) => (dispatch) =>
  APIUtil.fetchUser(userId).then((user) => {
    dispatch(receiveUsers(user));
    return user;
  });
export const createUserByAdmin = (userForm) => (dispatch) =>
  APIUtil.createUserByAdmin(userForm)
    .then((user) => {})
    .fail((err) => dispatch(receiveErrors(err.responseJSON)));

export const updateUserByAdmin = (userForm) => (dispatch) =>
  APIUtil.updateUserByAdmin(userForm)
    .then((user) => {
      return user;
    })
    .fail((err) => dispatch(receiveErrors(err.responseJSON)));

export const deleteUserByAdmin = (userId) => (dispatch) =>
  APIUtil.deleteUserByAdmin(userId)
    .then((users) => {
      return users;
    })
    .fail((err) => dispatch(receiveErrors(err.responseJSON)));
