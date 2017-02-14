class PagesController < ApplicationController
  def home
    @artworks = Artwork.list visible: true, sort: '-published_at'
  end

  def artwork
    @artwork = Artwork.find params[:id]
  end

  def original_prototype; end
end
