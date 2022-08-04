class FilterController < ApplicationController
  def artworks
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
end
