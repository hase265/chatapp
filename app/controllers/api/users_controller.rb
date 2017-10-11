module Api
  class UsersController < ApplicationController
    before_action :authenticate_user!

    def show
      render json: current_user
    end

    def search
      search_box = params[:username]
      if search_box == ""
        @searching_user = nil
      else
        @searching_user = User.where("username like ?", "#{search_box}%")
      end
      render json: @searching_user
    end
  end
end
