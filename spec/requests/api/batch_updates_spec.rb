require 'rails_helper'

describe 'POST /api/batch_updates' do
  context 'with valid data' do
    it 'creates a BatchUpdate' do
      allow_any_instance_of(BatchUpdatesController).to receive(:find_current_user)
      allow_any_instance_of(BatchUpdatesController).to receive(:is_admin?).and_return(true)
      allow_any_instance_of(BatchUpdatesController).to receive(:is_genomer?).and_return(true)
      current_user = double(:current_user, id: 123)
      allow_any_instance_of(BatchUpdatesController).to receive(:current_user).and_return(current_user)

      genes = {
        'Fashion Photography' => 100,
        'Painting' => 80
      }

      payload = {
        batch_update: {
          artworks: [1, 2, 3],
          genes: genes
        }
      }

      post '/api/batch_updates', params: payload

      expect(BatchUpdate.count).to eq 1
    end
  end
end
