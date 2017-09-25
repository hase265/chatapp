module Api
  class UsersController < ApplicationController

    def index
      @users = current_user.following + current_user.follower
      render json: @users
    end

    def search
      @search = params[:username]
      @user = User.where("username like ?", "#{@search}%")
      render json: @user
    end
  end
end
