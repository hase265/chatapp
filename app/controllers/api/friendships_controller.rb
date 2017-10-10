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
        current_user.make_friends(@user)
      end
      render json: {friendship: @user}
    end

    def destroy
      friendship = Friendship.find_by(from_user_id: current_user.id, to_user_id: params[:id]) ||
                    Friendship.find_by(from_user_id: params[:id], to_user_id: current_user.id)
      return if friendship.nil
      friendship.destroy
      @users = current_user.following + current_user.follower
      render json: @users
    end
  end
end
