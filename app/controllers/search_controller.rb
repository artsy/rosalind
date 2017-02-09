class SearchController < ApplicationController
  def artworks
    query = params.require(:query)
    response = ArtworkSearchService.call(query: query)
    render json: response
  end
end
