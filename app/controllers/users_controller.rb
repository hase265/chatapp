class UsersController < ApplicationController
  before_action :authenticate_user!
  # ここ改行欲しい
    def show
      @user = User.find(params[:id])
    end

    def search; end

end
