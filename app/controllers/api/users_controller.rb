module Api
  class UsersController < ApplicationController
    before_action :authenticate_user!

    def show
      render json: current_user
    end

    def search
      @search = params[:username]
      if params[:username] == ""
        @searching_user = nil
      else
        @searching_user = User.where("username like ?", "#{@search}%")
      end
      render json: @searching_user
    end
  end
end
