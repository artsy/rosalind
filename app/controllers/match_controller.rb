class MatchController < ApplicationController
  def genes
    term = params.require(:term)
    genes = Kinetic::Gene.match term: term, size: 5
    render json: genes
  end

  def tags
    term = params.require(:term)
    tags = Kinetic::Tag.match term: term, size: 5
    render json: tags
  end
end
