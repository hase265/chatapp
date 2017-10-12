module Api
  class FriendshipsController < ApplicationController
    def index
      @users = current_user.following + current_user.follower
      render json: @users
    end

    def create
      @user = User.find(params[:toUserId])
      return if current_user.friends(params[:toUserId])
      current_user.make_friends(@user)
      render json: {friendship: @user}
    end

    def destroy
      friendship = Friendship.find_by(from_user_id: current_user.id, to_user_id: params[:id]) ||
                   Friendship.find_by(from_user_id: params[:id], to_user_id: current_user.id)
      return if friendship.nil?
      friendship.destroy
      @users = current_user.following + current_user.follower
      render json: @users
    end
  end
end
