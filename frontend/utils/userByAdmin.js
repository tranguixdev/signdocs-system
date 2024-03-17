export const createUserByAdmin = (user) =>
  $.ajax({
    url: '/api/users_by_admin',
    method: 'POST',
    data: { user },
  });
export const updateUserByAdmin = (user) =>
  $.ajax({
    url: `/api/users_by_admin/${user.id}`,
    method: 'put',
    data: { user },
  });
export const deleteUserByAdmin = (userId) =>
  $.ajax({
    url: `/api/users_by_admin/${userId}`,
    method: 'DELETE',
  });
export const fetchUser = (userId) =>
  $.ajax({
    url: `/api/users/${userId}`,
    method: 'GET',
  });
