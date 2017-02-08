Rails.application.routes.draw do
  root to: 'pages#original_prototype'
  get 'artworks', to: 'pages#home'
  get 'artwork/:id', to: 'pages#artwork', as: 'artwork'

  get 'search/artworks'

  # autocomplete matchers
  get 'match/genes'
  get 'match/tags'
  get 'match/fairs'
  get 'match/partners'
end
