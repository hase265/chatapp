Rails.application.routes.draw do
  # home_controller周りは全然使ってない?? であれば消しましょう！
  namespace :api, { format: 'json'} do
    resources :messages do
      collection do
        post :upload_image
      end
    end
    resources :current_user, only: [:index]
    resources :friendships, only: [:index, :create, :destroy]
    resources :users, only: [:show] do
      collection do
        get '/search', to: 'users#search'
      end
    end
    # ここのルーティング使ってる??
    post 'users/search', to: 'friendships#create'
    delete 'users/:id', to: 'friendships#destroy'
  end

  get 'users/search', to: 'users#search'
  root "messages#index"

  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }
  resources :users, only: [:show]

end
