module Api
  class MessagesController < ApplicationController
    before_action :authenticate_user!

    def index
      @messages = Message.all
      render json: @messages
    end

    def show
      @user = User.find_by(params[:id])
      @messages = @user.messages.where(to_id: current_user.id) + current_user.messages.where(to_id: @user)
      render json: @messages
    end

    def create
      @message = Message.create(content: params[:content], from_id: current_user.id, to_id: params[:openUserID])
      render json: {message: @message}
    end
  end
end
