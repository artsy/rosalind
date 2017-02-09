require 'rails_helper'

RSpec.describe SearchController, type: :controller do
  context 'with a logged in admin' do
    include_context 'logged in admin'

    describe '#artworks' do
      let(:query) { '{"query":{"match_all":{}}}' }
      let(:hits) { elasticsearch_sample_artwork_hits }
      let!(:elasticsearch_request) { stub_elasticsearch_request path: 'artwork/_search', query: query, response_hits: hits }

      it 'issues the correct elasticsearch query' do
        get :artworks, params: { query: query }
        expect(elasticsearch_request).to have_been_made
      end
    end
  end
end
