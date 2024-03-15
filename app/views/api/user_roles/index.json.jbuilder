json.userRoles do
  @userRoles.each do |userRole|
    json.set! userRole.id do
      json.partial! 'api/user_roles/user_role', userRole: userRole
    end
  end
end
