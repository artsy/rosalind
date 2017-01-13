class PagesController < ApplicationController
  def home
    @artworks = Artwork.list visible: true, sort: '-published_at'
  end

  def artwork
    @artwork = Artwork.find params[:id]
  end

  def janky_prototype
    @foo = 'bar'
  end
end
