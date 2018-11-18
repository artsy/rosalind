require 'rails_helper'

RSpec.describe ArtworksController, type: :controller do
  context 'with a logged in admin' do
    include_context 'logged in admin'

    context 'with a valid artwork' do
      let(:artwork) { Fabricate(:kinetic_artwork, id: 'good-stuff', title: 'Good Stuff') }
      let!(:gravity_request) { Kinetic::Stub::Gravity::GravityModel.find(artwork) }

      describe '#show' do
        before do
          get :show, params: { id: 'good-stuff' }
        end

        it 'issues the correct gravity query' do
          expect(gravity_request).to have_been_made
        end

        it 'returns the artwork' do
          expect(response.status).to eq 200
          expect(response.body).to eq artwork.to_json
        end
      end
    end

    context 'with a missing artwork' do
      let!(:error) { { type: 'error', message: 'Not Found!' } }
      let!(:gravity_request) do
        Kinetic::Stub::Gravity::GravityModel.find(
          error, { params: { id: 'bad-stuff' } }, 404, Artwork
        )
      end

      describe '#show' do
        before do
          get :show, params: { id: 'bad-stuff' }
        end

        it 'issues the correct gravity query' do
          expect(gravity_request).to have_been_made
        end

        it 'returns a 404 error message' do
          expect(response.status).to eq 404
          expect(response.body).to match(/Not Found!/)
        end
      end
    end
  end
end
