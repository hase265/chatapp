module Api
  class FriendshipsController < ApplicationController

    def index
      @users = current_user.following
      render json: @users
    end

    def create
      @user = User.find(params[:to_user_id])
      if @user == current_user
        root_url
      else
        current_user.friends(@user)
      end
      render json: {friendship: @user}
    end
  end
end
