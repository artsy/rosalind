require "rails_helper"
require "./app/services/artwork_search_service"

RSpec.describe ArtworkSearchService, type: :model do
  describe ".call" do
    let(:query) { '{"query":{"bool":{"must":[{"match":{"genes":"Kawaii"}}]}}}' }
    let(:hits) { search_sample_artwork_hits }
    let!(:search_request) { stub_search_request path: "_search", query: query, response_hits: hits }

    it "issues the correct search request" do
      ArtworkSearchService.call(query: query)
      expect(search_request).to have_been_requested
    end

    it "returns the full search json response" do
      response = ArtworkSearchService.call(query: query)
      expect(response).to be_a String
      expect(JSON.parse(response)["hits"]["hits"]).to eq(hits)
    end
  end
end
