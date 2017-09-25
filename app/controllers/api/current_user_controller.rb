class Api::CurrentUserController < ApplicationController
  def index
    @users = Friendship.where(to_user_id: current_user.friendships_of_to_user)
    render json: { friends: @users }
  end
end
