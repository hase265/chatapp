module Api
  class UsersController < ApplicationController
    before_action :authenticate_user!

    def show
      render json: current_user
    end

    def search
      search_box = params[:username]
      if search_box == ""
        @searching_user = nil
      else
        @searching_user = User.where("username like ?", "#{search_box}%")
      end
      # @searching_user.each do |user|
      # if current_user.friendships.find_by()
      # @lists = @searching_user.each { |list| list.as_json(:include => {:friendships => {:include =>
                                        # [{:from_id => {}},
                                          # {:to_id => {}}]}})}
      render json: @searching_user.as_json(methods: :friend_of_current_user?)
    end
  end
end
