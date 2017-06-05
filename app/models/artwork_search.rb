class ArtworkSearch
  class ServiceError < StandardError; end

  def self.run(query)
    new(query).run
  end

  def initialize(query)
    @query = query
  end

  def run
    if response.success?
      response.body
    else
      error_message = "#{response.code}: #{response.body}"
      Rails.logger.warn "ArtworkSearch error: #{error_message}"
      raise ServiceError, error_message
    end
  end

  private

  def response
    @response ||= Typhoeus.post(
      api_url,
      body: @query,
      userpwd: credentials,
      headers: headers,
      accept_encoding: 'gzip'
    )
  end

  def api_url
    "#{config['url']}/#{config['index']}/artwork/_search"
  end

  def credentials
    "#{config['username']}:#{config['password']}"
  end

  def headers
    {
      'Accept' => 'application/json',
      'Content-type' => 'application/json'
    }
  end

  def config
    Rails.application.config_for(:elasticsearch)
  end
end
