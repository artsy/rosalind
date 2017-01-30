Rails.application.routes.draw do
  root to: 'pages#janky_prototype'
  get 'artworks', to: 'pages#home'
  get 'artwork/:id', to: 'pages#artwork', as: 'artwork'

  get 'search/artworks'
end
