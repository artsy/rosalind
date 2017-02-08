require 'rails_helper'

RSpec.describe PagesController, type: :controller do
  context 'with a logged in regular user' do
    include_context 'logged in user'

    it 'does not allow access' do
      get :home
      expect(response).not_to have_http_status(:success)
      expect(response).to redirect_to(Kinetic.config[:artsy_url])
    end
  end

  context 'with a logged in admin' do
    include_context 'logged in admin'

    describe 'GET #home' do
      let(:artwork) { Fabricate(:kinetic_artwork) }
      let!(:list_artworks_request) { Kinetic::Stub::Gravity::GravityModel.list([artwork]) }

      before do
        get :home
        expect(response).to have_http_status(:success)
      end

      it 'requests GET /artworks properly' do
        expect(list_artworks_request.with(
          query: hash_including(visible: 'true', sort: '-published_at')
        )).to have_been_made
      end
    end
  end
end
