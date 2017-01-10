Rails.application.routes.draw do
  root to: 'pages#home'
  get 'artwork/:id', to: 'pages#artwork', as: 'artwork'
end
