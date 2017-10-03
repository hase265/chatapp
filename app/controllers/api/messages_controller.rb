module Api
  class MessagesController < ApplicationController
    before_action :authenticate_user!

    def index
      @messages = Message.all
      render json: @messages
    end

    def create
      @message = Message.create(content: params[:content], user_id: current_user.id, to_id: params[:to_id])
      render json: {messages: @message}
    end

    def show
      @user = User.find(params[:id])
      @messages = @user.messages.where(to_id: current_user.id) + current_user.messages.where(to_id: @user)
      render json: @messages
    end

    def upload_image
      @image = current_user.messages.create(image: params[:image], user_id: current_user, to_id: params[:to_id])
      File.binwrite('public/message_images', params[:image].read)
      render json: {messages: @image}
    end

  end
end
