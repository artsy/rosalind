module FilteredArtworkSearchService
  class ServiceError < StandardError; end

  class << self
    def call(params = {})
      response = Typhoeus.get(api_url, params: params, params_encoding: :rack, headers: headers, accept_encoding: 'gzip')
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
      "#{Rails.application.config_for(:gravity)['api_root']}/filter/artworks"
    end

    def headers
      {
        'Content-type' => 'application/json',
        'Accept' => 'application/json',

        # TODO: replace with user access token, to support fetching unpublished works
        'X-XAPP-TOKEN' => Rails.application.config_for(:gravity)['xapp_token']
      }
    end
  end
end
