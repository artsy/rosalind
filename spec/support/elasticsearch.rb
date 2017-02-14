def stub_elasticsearch_request(path:, query:, response_hits:)
  root_url, index_name, user, pass = Rails.application.config_for(:elasticsearch)
                                          .values_at 'url', 'index', 'username', 'password'
  WebMock.stub_request(:post, "#{root_url}/#{index_name}/#{path}")
         .with(body: query, basic_auth: [user, pass])
         .to_return(body: { hits: { hits: response_hits } }.to_json)
end

# rubocop:disable Metrics/MethodLength
def elasticsearch_sample_artwork_hits
  [
    {
      '_index' => 'gravity',
      '_type' => 'artwork',
      '_id' => '1234',
      '_source' => {
        'id' => '1234',
        'genes' => [
          'Kawaii'
        ],
        'name' => 'Pikachu'
      }
    },
    {
      '_index' => 'gravity',
      '_type' => 'artwork',
      '_id' => '5678',
      '_source' => {
        'id' => '5678',
        'genes' => [
          'Kawaii'
        ],
        'name' => 'Jigglypuff'
      }
    }
  ]
end
# rubocop:enable Metrics/MethodLength
