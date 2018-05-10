require 'sidekiq/web'
require 'admin_constraint'

Rails.application.routes.draw do
  root to: 'pages#batch_update'

  resources :batch_updates, only: :create

  # searches and autocompletes
  get 'match/artworks'
  get 'match/genes'
  get 'match/tags'
  get 'match/fairs'
  get 'match/partners'

  mount Sidekiq::Web => '/sidekiq', :constraints => AdminConstraint.new

  # temporary test page
  get 'pages/test'
end
