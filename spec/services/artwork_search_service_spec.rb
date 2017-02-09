require 'spec_helper'
require './app/services/artwork_search_service'

RSpec.describe ArtworkSearchService, type: :model do
  describe '.call' do
    let(:query) { '{"query":{"bool":{"must":[{"match":{"genes":"Kawaii"}}]}}}' }
    let(:hits) { elasticsearch_sample_artwork_hits }
    let!(:elasticsearch_request) { stub_elasticsearch_request path: 'artwork/_search', query: query, response_hits: hits }

    it 'issues the correct elasticsearch request' do
      ArtworkSearchService.call(query: query)
      expect(elasticsearch_request).to have_been_requested
    end

    it 'returns the full elasticsearch json response' do
      response = ArtworkSearchService.call(query: query)
      expect(response).to be_a String
      expect(JSON.parse(response)['hits']['hits']).to eq(hits)
    end
  end
end
