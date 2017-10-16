module Api
  class UsersController < ApplicationController
    before_action :authenticate_user!

    def show
      render json: current_user
    end

    def search
      search_box = params[:searchString]
      if search_box == ''
        render json: nil
      else
        @search = User.where('username like ?', "#{search_box}%")
        @user = @search.as_json(methods: :friend_of_current_user?)
        render json: @user
      end
    end
  end
end
