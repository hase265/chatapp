# このapiのcontrollerも他のものと同様に、
# module Api
#   class CurrentUserController < ApplicationController
# って書いた方がいいね
class Api::CurrentUserController < ApplicationController
  def index
    render json: current_user
  end
end
