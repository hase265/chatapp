Rails.application.routes.draw do
  get 'relationships/create'

  get 'relationships/destroy'

  namespace :api, { format: 'json'} do
    resources :messages
    get 'users/index', to: 'users#index'
    get 'users/search', to: 'users#search'
    get 'users/search', to: 'friendships#create'
    resources :friendships, only: [:index, :create, :destroy]
  end

  get 'home/index'
  get 'home/show'

  root "home#index"
  get 'users/search', to: 'users#search'

  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }

  resources :users
end
