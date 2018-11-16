class ArtworksController < ApplicationController
  expose :artwork

  def show
    render json: artwork
  rescue StandardError => e
    render json: { error: e.message }, status: :internal_server_error
  end
end
