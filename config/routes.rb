Rails.application.routes.draw do

  root "messages#index"
  resources :users, only: [:edit, :update]
  resources :groups, only: [:new, :create]
end
