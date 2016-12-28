class PagesController < ApplicationController
  def home
    @artworks = Artwork.list visible: true, sort: '-published_at'
  end
end
