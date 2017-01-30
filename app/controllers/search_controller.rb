class SearchController < ApplicationController
  def artworks
    response = elasticsearch_request(type: 'artwork', body: params.require(:query))
    render json: response.body
  end

  private

  def elasticsearch_request(type:, body:)
    headers = { 'Authorization': Rails.application.config_for(:elasticsearch)['auth_header'] }
    uri = "#{Rails.application.config_for(:elasticsearch)['url']}/" \
          "#{Rails.application.config_for(:elasticsearch)['index']}/#{type}/_search"

    Typhoeus::Request.new(
      uri,
      method: :post,
      body: body,
      headers: headers
    ).run
  end
end
