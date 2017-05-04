module ArtworkSearchService
  class ServiceError < StandardError; end

  def self.call(query:)
    api_url = "#{Rails.application.config_for(:elasticsearch)['url']}/#{Rails.application.config_for(:elasticsearch)['index']}/artwork/_search"
    basic_auth_credentials = "#{Rails.application.config_for(:elasticsearch)['username']}:#{Rails.application.config_for(:elasticsearch)['password']}"
    headers = { 'Content-type' => 'application/json', 'Accept' => 'application/json' }

    response = Typhoeus.post(api_url, body: query, userpwd: basic_auth_credentials, headers: headers, accept_encoding: 'gzip')

    if response.success?
      response.body
    else
      error_message = "#{response.code}: #{response.body}"
      Rails.logger.warn "ArtworkSearchService error: #{error_message}"
      raise ServiceError, error_message
    end
  end
end
