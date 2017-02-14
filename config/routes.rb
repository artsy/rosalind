Rails.application.routes.draw do
  root to: 'pages#original_prototype'

  # static pages
  get 'artworks', to: 'pages#home'
  get 'artwork/:id', to: 'pages#artwork', as: 'artwork'

  # searches and autocompletes
  get 'match/artworks'
  get 'match/genes'
  get 'match/tags'
  get 'match/fairs'
  get 'match/partners'
end
