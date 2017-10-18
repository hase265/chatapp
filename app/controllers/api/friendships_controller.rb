module Api
  class FriendshipsController < ApplicationController
    def index
      @users = current_user.following + current_user.follower
      render json: @users
    end

    def create
      @user = User.find(params[:toUserId])
      return if current_user.is_friend_with(params[:toUserId])
      current_user.make_friends_with(@user.id)
      render json: {friendship: @user}
    end

    def destroy
      friendship = current_user.is_friend_with(params[:id])
      return if friendship.nil?
      friendship.destroy
      @users = current_user.following + current_user.follower
      render json: @users
    end
  end
end
