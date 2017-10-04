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
      @image_message = current_user.messages.build(params[:id])
      @image_message.to_id = params[:to_id]
      @image_message.set_image(params[:image])
      @image_message.save
      render json: {messages: @image_message}
    end

  end
end
