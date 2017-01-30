require 'rails_helper'

RSpec.describe SearchController, type: :controller do
  describe '#artworks' do
    let(:query) { '{"query":{"match_all":{}}}' }
    let(:elasticsearch_request) do
      stub_request(:post, Regexp.new(Rails.application.config_for(:elasticsearch)['url']))
    end

    it 'issues the correct elasticsearch query' do
      get :artworks, params: { query: query }
      expect(elasticsearch_request).to have_been_made
    end
  end
end
