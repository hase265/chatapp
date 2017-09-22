module Api
  class FriendshipsController < ApplicationController

    def index
      @users = Friendship.all
      render json: @users
    end

    def create
      @user = User.find(params[:to_user_id])
      current_user.friends(@user)
      render json: { friendship: @user }
    end
  end
end
