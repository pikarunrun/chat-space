Rails.application.routes.draw do

  devise_for :users
  root "messages#index"
  resources :users, only: [:edit, :update, :new, :create]
  resources :groups, only: [:new, :create]
end
