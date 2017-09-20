Rails.application.routes.draw do
  namespace :api, { format: 'json'} do
    resources :messages
    get 'users/index', to: 'users#index'
    get 'users/search', to: 'users#search'

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
