module Api
  class MessagesController < ApplicationController
    before_action :authenticate_user!

    def index
      @messages = Message.all
      render json: @messages
    end

    def create
      @message = Message.create(content: params[:content], user_id: current_user.id, to_id: params[:to_id])
      render json: {message: @message}
    end

    def show
      @user = User.find(params[:id])
      @messages = @user.messages.where(to_id: current_user.id) + current_user.messages.where(to_id: @user)
      render json: @messages
    end

    def upload_image
      @image_message = current_user.messages.build(params[:id])
    end
  end
end
