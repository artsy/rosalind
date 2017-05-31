require 'rails_helper'

describe 'POST /batch_updates' do
  before do
    allow_any_instance_of(BatchUpdatesController).to receive(:find_current_user)
    allow_any_instance_of(BatchUpdatesController).to receive(:is_admin?).and_return(true)
    allow_any_instance_of(BatchUpdatesController).to receive(:is_genomer?).and_return(true)
    current_user = double(:current_user, id: 123)
    allow_any_instance_of(BatchUpdatesController).to receive(:current_user).and_return(current_user)
  end

  context 'with valid data' do
    it 'creates a BatchUpdate' do
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

      post '/batch_updates', params: payload

      expect(BatchUpdate.count).to eq 1
      jobs = ActiveJob::Base.queue_adapter.enqueued_jobs
      expect(jobs.count).to eq 1
    end
  end

  context 'with invalid data' do
    before do
      bad_payload = {
        batch_update: {
          artworks: nil,
          genes: nil
        }
      }
      post '/batch_updates', params: bad_payload
    end

    it 'does not create a BatchUpdate' do
      expect(BatchUpdate.count).to eq 0
    end

    it 'returns an informative json error' do
      expect(response).to have_http_status(:unprocessable_entity)
      expect(response.content_type).to eq 'application/json'
      err = JSON.parse(response.body)
      expect(err).to match('error_message' => /can't be blank/)
    end
  end
end
