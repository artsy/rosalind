def stub_elasticsearch_request(path:, query:, response_hits:)
  root_url, index_name = Rails.application.config_for(:elasticsearch)
                              .values_at "url", "index"
  WebMock.stub_request(:post, "#{root_url}/#{index_name}/#{path}")
         .with(body: query)
         .to_return(body: {hits: {hits: response_hits}}.to_json)
end

def elasticsearch_sample_artwork_hits
  [
    {
      "_index" => "gravity",
      "_id" => "1234",
      "_source" => {
        "id" => "1234",
        "genes" => [
          "Kawaii"
        ],
        "name" => "Pikachu"
      }
    },
    {
      "_index" => "gravity",
      "_id" => "5678",
      "_source" => {
        "id" => "5678",
        "genes" => [
          "Kawaii"
        ],
        "name" => "Jigglypuff"
      }
    }
  ]
end
