module Api
  class UsersController < ApplicationController
    before_action :authenticate_user!

    def search
      @search = params[:username]
      @user = User.where("username like ?", "#{@search}%")
      render json: @user
    end
  end
end
