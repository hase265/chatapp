Rails.application.routes.draw do
  namespace :api, { format: 'json'} do
    resources :messages
    resources :current_user, only: [:index]
    resources :friendships, only: [:index, :create, :destroy]
    resources :users, only: [:show] do
      collection do
        get '/search', to: 'users#search'
      end
    end
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
