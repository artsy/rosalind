class MatchController < ApplicationController
  def artworks
    query = params.require(:query)
    response = ArtworkSearchService.call(query: query)
    render json: response
  end

  def genes
    term = params.require(:term)
    genes = Gene.match term: term, size: 5
    render json: genes
  end

  def tags
    term = params.require(:term)
    tags = Tag.match term: term, size: 5
    render json: tags
  end

  def partners
    term = params.require(:term)
    partners = Partner.match term: term, size: 5
    render json: partners
  end

  def fairs
    term = params.require(:term)
    fairs = Fair.match term: term, size: 5
    render json: fairs
  end
end
