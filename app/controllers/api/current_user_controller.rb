module Api
  class CurrentUserController < ApplicationController
    def index
      render json: current_user
    end
  end
end
