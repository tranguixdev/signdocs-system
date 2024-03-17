class Api::UsersController < ApplicationController
  before_action :require_logged_in, only: %i[show index summary]
  # before_action :require_logged_out, only: [:create]
  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show
    else
      errors = @user.errors.messages
      render json: errors, status: 403
    end
  end

  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.find(params[:id])

    render :show
  end

  def create_by_admin
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: 200
    else
      errors = @user.errors.messages
      render json: errors, status: 403
    end
  end

  def update_by_admin
    @user = User.find(params[:id])
    if @user.update(user_update_params)
      render json: @user, status: 200
    else
      errors = @user.errors.messages
      render json: errors, status: 418
    end
  end

  def destroy_by_admin
    user = User.find(params[:id])
    if user.destroy
      render json: { "status": 'success' }, status: :ok
    else
      # render json: { document: ["An error occured."] }, status: 418

    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name)
  end

  def user_update_params
    params.require(:user).permit(:email, :first_name, :last_name)
  end
end
