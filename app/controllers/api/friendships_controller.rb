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
        flash[:notice] = "Congraturation! You're friends!"
      end
      render json: {friendship: @user}
    end

    def destroy
      user1 = Friendship.find_by(from_user_id: current_user.id, to_user_id: params[:id])
      user2 = Friendship.find_by(from_user_id: params[:id], to_user_id: current_user.id)
      if user1
         friendship = user1
         friendship.destroy
      elsif user2
        friendship = user2
        friendship.destroy
      else
        flash[:notice] = "This is a bug"
      end
      @users = current_user.following + current_user.follower
      render json: @users
    end
  end
end
