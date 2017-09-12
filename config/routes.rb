Rails.application.routes.draw do
  namespace :api, { format: 'json'} do
    resources :messages
  end

  get 'home/index'
  get 'home/show'

  root "home#index"
end
