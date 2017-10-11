Rails.application.routes.draw do
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
  end

  get 'users/search', to: 'users#search'
  root "messages#index"

  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  resources :users, only: [:show]

end
