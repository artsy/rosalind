class PagesController < ApplicationController
  def home
    Kinetic::GravityModel.xapp_token = Rails.application.config_for(:gravity)['xapp_token']
    @artworks = Artwork.list visible: true, sort: '-published_at'
  end
end
