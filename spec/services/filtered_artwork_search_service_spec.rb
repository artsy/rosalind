require 'spec_helper'
require './app/services/filtered_artwork_search_service'

RSpec.describe FilteredArtworkSearchService, type: :model do
  describe '.call' do
    def stub_filter_artworks_request(status, params, body)
      endpoint = "#{Rails.application.config_for(:gravity)['api_root']}/filter/artworks"
      WebMock.stub_request(:get, endpoint).with(query: params).to_return(status: status, body: body, headers: {})
    end

    let(:params) do
      # kitchen-sink query that should match kiki-smith-the-falls-i
      {
        keyword: 'tattoo',
        gene_ids: ['mixed-media'],
        tag_id: 'waterfall',
        artist_ids: ['kiki-smith'],
        partner_id: 'universal-limited-art-editions',
        fair_id: 'art-basel-2017',
        attribution_class: ['limited edition'],
        # TODO: creation date # (2013-11-06T19:01:19Z)
        price_range: '5000-10000',
        # TODO: ids # (527a91ffcd530e5006000400)
        # TODO: include_published # (requires user access token),
        acquireable: true,
        offerable: true,
        for_sale: true
      }
    end

    let(:response) do
      { hits: [artwork_hit], aggregations: [] }
    end

    let(:artwork_hit) do
      JSON.parse(File.read('./spec/fixtures/kiki-smith-the-falls-i.json'))
    end

    it 'issues the correct gravity request' do
      request = stub_filter_artworks_request(200, params, response.to_json)
      FilteredArtworkSearchService.call(params)
      expect(request).to have_been_requested
    end

    it 'returns the artwork hits' do
      stub_filter_artworks_request(200, params, response.to_json)
      response = FilteredArtworkSearchService.call(params)
      expect(response['hits'][0]).to eq artwork_hit
    end

    context 'on failure' do
      let(:params) do
        { sort: 'lolol' }
      end

      let(:response) do
        {
          type: 'param_error',
          message: 'Invalid parameters.',
          detail: {
            sort: [
              'does not have a valid value'
            ]
          }
        }
      end

      it 'raises the upstream errors' do
        stub_filter_artworks_request(400, params, response.to_json)
        expect do
          FilteredArtworkSearchService.call(params)
        end.to raise_error FilteredArtworkSearchService::ServiceError
      end
    end
  end
end
