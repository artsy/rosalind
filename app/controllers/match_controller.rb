class MatchController < ApplicationController
  def artworks
    query = params.require(:query)
    response = ArtworkSearchService.call(query: query)
    render json: response
  end

  def filter_artworks
    valid_params = params.permit(
      FilteredArtworkSearchService::ALLOWED_PARAMS,
      # HACK: Per the Strong Parameters convention, array-valued params
      # must be mapped to an empty array, so the allowlist above
      # isn't quite sufficient. We therefore redundantly add…
      gene_ids: [],
      artist_ids: []
    ).to_h

    response = FilteredArtworkSearchService.call(valid_params)
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

  def sales
    term = params.require(:term)
    sales = Kinetic::Sale.match term: term, size: 5
    render json: sales
  end

  def artists
    term = params.require(:term)
    artists = Artist.match term: term, size: 5
    render json: artists
  end
end
