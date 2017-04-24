Rails.application.routes.draw do
  root to: 'pages#batch_update'

  # searches and autocompletes
  get 'match/artworks'
  get 'match/genes'
  get 'match/tags'
  get 'match/fairs'
  get 'match/partners'
end
