class ArtworkSearchService
  class ServiceError < StandardError; end

  def self.call(query:)
    new(query: query).call
  end

  def initialize(query:)
    @query = query
  end

  def call
    api_url = "#{config['url']}/#{config['index']}/artwork/_search"
    basic_auth_credentials = "#{config['username']}:#{config['password']}"
    headers = { 'Content-type' => 'application/json', 'Accept' => 'application/json' }

    response = Typhoeus.post(api_url, body: @query, userpwd: basic_auth_credentials, headers: headers, accept_encoding: 'gzip')

    if response.success?
      response.body
    else
      error_message = "#{response.code}: #{response.body}"
      Rails.logger.warn "ArtworkSearchService error: #{error_message}"
      raise ServiceError, error_message
    end
  end

  private

  def config
    Rails.application.config_for(:elasticsearch)
  end
end
