module Api
  class UsersController < ApplicationController
    before_action :authenticate_user!

    def show
      @user = current_user
      render json: @user
    end

    def search
      @search = params[:username]
      @user = User.where("username like ?", "#{@search}%")
      render json: @user
    end
  end
end
