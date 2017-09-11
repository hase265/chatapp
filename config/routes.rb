Rails.application.routes.draw do
  namespace :api, { format: 'json'} do
    resources :messages
  end

  root 'messages#index'
  resources :messages
end
