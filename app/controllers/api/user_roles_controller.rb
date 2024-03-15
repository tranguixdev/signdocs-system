class Api::UserRolesController < ApplicationController
  def index
    @userRoles = UserRole.all
    render :index
  end
end
