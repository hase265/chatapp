Rails.application.routes.draw do
  get 'relationships/create'

  get 'relationships/destroy'

  namespace :api, { format: 'json'} do
    resources :messages
    resources :friendships, only: [:index, :create, :destroy]
    get 'users/index', to: 'friendships#index'
    get 'users/search', to: 'users#search'
    post 'users/search', to: 'friendships#create'
    delete 'users/:id', to: 'friendships#destroy'
    resources :current_user, only: [:index]
  end

  get 'home/index'
  get 'home/show'

  root "messages#index"
  get 'users/search', to: 'users#search'

  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }

  resources :users
end
