module Api
  class UsersController < ApplicationController

    def index
      @users = User.all
      render json: @users
    end

    def search
      @users = User.all
      @user = @users.find_by(username: params[:username])
      if @user
        return @user
      end
      render json: @user
    end
  end
end
