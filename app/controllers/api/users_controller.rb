module Api
  class UsersController < ApplicationController
    before_action :authenticate_user!

    def show
      # ここの変数宣言いらないかな
      @user = current_user
      render json: @user
    end

    def search
      @search = params[:username]
      # 上でせっかく変数宣言してるから、それ以降は@searchを使った方がいいと思う
      # もう少し良い変数名が考えられそう
      if params[:username] == ""
        @use = nil
      else
        @user = User.where("username like ?", "#{@search}%")
      end
      render json: @user
    end
  end
end
