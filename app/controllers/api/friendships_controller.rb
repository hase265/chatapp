module Api
  class FriendshipsController < ApplicationController
    def index
      @users = current_user.following + current_user.follower
      render json: @users
    end

    def create
      @user = User.find(params[:to_user_id])
      if Friendship.find_by(from_user_id: current_user.id, to_user_id: params[:to_user_id])
        flash[:notice] = "Already You're Friends!"
      elsif @user.id == current_user.id
        flash[:notice] = "This is You!"
      else
        current_user.friends(@user)
      end
      render json: {friendship: @user}
    end

    def destroy
      if Friendship.find_by(from_user_id: current_user.id, to_user_id: params[:friend_id])
        friendship = Friendship.find_by(from_user_id: current_user.id, to_user_id: params[:friend_id])
        friendship.destroy
      elsif Friendship.find_by(from_user_id: params[:friend_id], to_user_id: current_user.id)
        friendship = Friendship.find_by(from_user_id: params[:friend_id], to_user_id: current_user.id)
        friendship.destroy
      else
        flash[:notice] = "This is a bug"
      end
      @users = current_user.following + current_user.follower
      render json: @users
    end
  end
end
