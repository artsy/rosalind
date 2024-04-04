class Genome
  def initialize(artwork_id, params = {}, method = :get)
    @artwork_id = artwork_id
    @params = params
    @method = method
  end

  def genes
    response = request.run
    json = JSON.parse(response.body)
    json["genes"]
  end

  def update_genes
    request.run
  end

  private

  def request
    Typhoeus::Request.new(
      api_url,
      headers: headers,
      params: @params,
      method: @method
    )
  end

  def api_root
    gravity_config["api_root"]
  end

  def api_url
    throw "Implement in subclass"
  end

  def headers
    {"X-XAPP-TOKEN" => gravity_config["xapp_token"]}
  end

  def gravity_config
    Rails.application.config_for(:gravity)
  end
end
