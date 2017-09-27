module Api
  class MessagesController < ApplicationController
    before_action :authenticate_user!

    def index
      @messages = Message.where(from_id: current_user.id, to_id: params[:openUserID]) + Message.where(from_id: params[:openUserID], to_id: current_user.id)
      render json: @messages
    end

    def create
      @message = Message.create(content: params[:content])
      render json: {message: @message}
    end
  end
end
