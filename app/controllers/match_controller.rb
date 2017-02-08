class MatchController < ApplicationController
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
    tags = Partner.match term: term, size: 5
    render json: tags
  end

  def fairs
    term = params.require(:term)
    tags = Fair.match term: term, size: 5
    render json: tags
  end
end
