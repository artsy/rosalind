module FilteredArtworkSearchService
  class ServiceError < StandardError; end

  ALLOWED_PARAMS = %i[
    acquireable
    artist_ids
    attribution_class
    fair_id
    for_sale
    gene_ids
    keyword
    offerable
    partner_id
    price_range
    sale_id
    sort
    tag_id
  ].freeze

  class << self
    def call(params = {})
      validate_parameters!(params)

      response = Typhoeus.get(api_url, params: params, params_encoding: :rack, headers: headers, accept_encoding: "gzip")

      if response.success?
        JSON.parse(response.body)
      else
        error_message = "#{response.code}: #{response.body}"
        Rails.logger.warn "FilteredArtworkSearchService error: #{error_message}"
        raise ServiceError, error_message
      end
    end

    private

    def api_url
      "#{Rails.application.config_for(:gravity)["api_root"]}/filter/artworks"
    end

    def headers
      {
        "Content-type" => "application/json",
        "Accept" => "application/json",

        # TODO: replace with user access token, to support fetching unpublished works
        "X-XAPP-TOKEN" => Rails.application.config_for(:gravity)["xapp_token"]
      }
    end

    def validate_parameters!(params)
      actual_params = params.symbolize_keys.keys
      unrecognized_params = actual_params - ALLOWED_PARAMS
      raise ServiceError, "Unrecognized parameters: #{unrecognized_params.inspect}" if unrecognized_params.any?
    end
  end
end
