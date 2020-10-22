require 'sidekiq/web'
require 'admin_constraint'

Rails.application.routes.draw do
  root to: 'pages#batch_update'

  resources :batch_updates, only: :create
  resources :artworks, only: :show

  # searches and autocompletes
  post 'match/artworks'
  get 'match/genes'
  get 'match/tags'
  get 'match/fairs'
  get 'match/partners'
  get 'match/artists'

  mount Sidekiq::Web, at: '/sidekiq', constraints: AdminConstraint.new
  mount Coverband::Reporters::Web.new, at: '/coverage', constraints: AdminConstraint.new
end
