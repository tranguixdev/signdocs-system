export const fetchUserRoles = () =>
  $.ajax({
    url: `/api/user_roles`,
    method: 'GET',
  });
