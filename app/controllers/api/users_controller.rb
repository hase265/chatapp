module Api
  class UsersController < ApplicationController
    before_action :authenticate_user!

    def show
      render json: current_user
    end

    def search
      search_box = params[:username]
      if search_box == ""
        @search = nil
      else
        @search = User.where("username like ?", "#{search_box}%")
      end
      @user = @search.as_json(methods: :friend_of_current_user?)
      render json: @user
    end
  end
end
