require 'rails_helper'

RSpec.describe SearchController, type: :controller do
  context 'with a logged in admin' do
    include_context 'logged in admin'

    let(:elasticsearch_base_url) do
      Rails.application.config_for(:elasticsearch).values_at('url', 'index').join('/')
    end

    describe '#artworks' do
      let(:query) { '{"query":{"match_all":{}}}' }
      let(:elasticsearch_request) do
        stub_request(:post, Regexp.new("^#{elasticsearch_base_url}/artwork/_search"))
          .with(body: query)
      end

      it 'issues the correct elasticsearch query' do
        get :artworks, params: { query: query }
        expect(elasticsearch_request).to have_been_made
      end
    end
  end
end
