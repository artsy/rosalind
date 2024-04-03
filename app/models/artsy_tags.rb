class ArtsyTags
  def self.tags(artwork_id)
    new(artwork_id).tags
  end

  def self.update_tags(artwork_id, tags)
    params = {tags: tags}
    new(artwork_id, params, :put).update_tags
  end

  def initialize(artwork_id, params = {}, method = :get)
    @artwork_id = artwork_id
    @params = params
    @method = method
  end

  def tags
    response = request.run
    if response.body.present?
      json = JSON.parse(response.body)
      return json["tags"] || []
    end

    []
  end

  def update_tags
    request.run
  end

  private

  def request
    url = api_url
    url += "/tags" if @method == :put
    Typhoeus::Request.new(
      url,
      headers: headers,
      params: @params,
      method: @method,
      params_encoding: :rack
    )
  end

  def api_root
    gravity_config["api_root"]
  end

  def api_url
    "#{api_root}/artwork/#{@artwork_id}"
  end

  def headers
    {"X-XAPP-TOKEN" => gravity_config["xapp_token"]}
  end

  def gravity_config
    Rails.application.config_for(:gravity)
  end
end
