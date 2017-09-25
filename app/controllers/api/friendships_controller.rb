module Api
  class FriendshipsController < ApplicationController

    def create
      @user = User.find(params[:to_user_id])
      if Friendship.find_by(to_user_id: params[:to_user_id])
        flash[:notice] = "Already You're Friends!"
      elsif Friendship.find_by(from_user_id: params[:to_user_id])
        flash[:notice] = "This is You!"
      else
        current_user.friends(@user)
      end
      render json: {friendship: @user}
    end
  end
end
