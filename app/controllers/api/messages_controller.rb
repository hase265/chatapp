module Api
  class MessagesController < ApplicationController
    before_action :authenticate_user!

    def index
      @messages = Message.all
      render json: @messages
    end

    def create
      @message = current_user.messages.create(content: params[:content], to_id: params[:to_id])
      render json: {messages: @message}
    end

    def show
      user = User.find(params[:id])
      messages = Message.where(user_id: current_user.id, to_id: user) + Message.where(user_id: user, to_id: current_user.id)
      @messages = messages.sort_by{|message| message.id}
      render json: @messages
    end

    def upload_image
      @image_message = current_user.messages.build
      @image_message.to_id = params[:to_id]
      @image_message.set_image(params[:image])
      @image_message.save
      render json: {messages: @image_message}
    end

  end
end
