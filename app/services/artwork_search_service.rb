module ArtworkSearchService
  class ServiceError < StandardError; end

  class << self
    def call(query:)
      response = Typhoeus.post(api_url, body: query,
        headers: headers, accept_encoding: "gzip")
      if response.success?
        response.body
      else
        error_message = "#{response.code}: #{response.body}"
        Rails.logger.warn "ArtworkSearchService error: #{error_message}"
        raise ServiceError, error_message
      end
    end

    private

    def api_url
      "#{Rails.application.config_for(:search)["url"]}/#{Rails.application.config_for(:search)["index"]}" \
        "/_search"
    end

    def headers
      {
        "Content-type" => "application/json",
        "Accept" => "application/json"
      }
    end
  end
end
