module Api
  class MessagesController < ApplicationController

    def index
      @messages = Message.all
      render json: @messages
    end

    def create
      @message = Message.create(content: params[:content])
      render json: {message: @message}
    end
  end
end
