require 'rails_helper'

RSpec.describe PagesController, type: :controller do
  context 'with a logged in user' do
    include_context 'logged in user'

    describe 'GET #home' do
      let(:artwork) { Fabricate(:kinetic_artwork) }
      let!(:list_artworks_request_stub) { Kinetic::Stub::Gravity::GravityModel.list([artwork]) }

      before do
        get :home
        expect(response).to have_http_status(:success)
      end

      it 'requests GET /artworks properly' do
        expect(list_artworks_request_stub.with(
          query: hash_including(visible: 'true', sort: '-published_at')
        )).to have_been_made
      end
    end
  end
end
