require 'rails_helper'

RSpec.describe MatchController, type: :controller do
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

    describe '#genes' do
      let(:gene) { Fabricate(:kinetic_gene, name: 'Photojournalism') }
      let!(:gravity_request) { Kinetic::Stub::Gravity::GravityModel.match([gene]) }

      it 'issues the correct gravity query' do
        get :genes, params: { term: 'photo' }
        expect(gravity_request).to have_been_made
      end
    end

    describe '#tags' do
      let(:tag) { Fabricate(:kinetic_tag, name: 'Clown') }
      let!(:gravity_request) { Kinetic::Stub::Gravity::GravityModel.match([tag]) }

      it 'issues the correct gravity query' do
        get :tags, params: { term: 'clown' }
        expect(gravity_request).to have_been_made
      end
    end

    describe '#partners' do
      let(:partner) { Fabricate(:kinetic_partner, name: 'Gagosian') }
      let!(:gravity_request) { Kinetic::Stub::Gravity::GravityModel.match([partner]) }

      it 'issues the correct gravity query' do
        get :partners, params: { term: 'gago' }
        expect(gravity_request).to have_been_made
      end
    end

    describe '#fairs' do
      let(:fair) { Fabricate(:kinetic_fair, name: 'Frieze') }
      let!(:gravity_request) { Kinetic::Stub::Gravity::GravityModel.match([fair]) }

      it 'issues the correct gravity query' do
        get :fairs, params: { term: 'frieze' }
        expect(gravity_request).to have_been_made
      end
    end
  end
end
