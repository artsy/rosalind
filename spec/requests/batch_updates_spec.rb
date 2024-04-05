require "rails_helper"

describe "POST /batch_updates" do
  before do
    allow_any_instance_of(BatchUpdatesController).to receive(:find_current_user)
    allow_any_instance_of(BatchUpdatesController).to receive(:is_admin?).and_return(true)
    allow_any_instance_of(BatchUpdatesController).to receive(:is_genomer?).and_return(true)
    current_user = double(:current_user, id: "def456")
    allow_any_instance_of(BatchUpdatesController).to receive(:current_user).and_return(current_user)
  end

  context "with valid data" do
    it "works with genes" do
      genes = {
        "Fashion Photography" => 100,
        "Painting" => 80
      }

      payload = {
        batch_update: {
          artworks: [1, 2, 3],
          genes: genes
        }
      }

      post "/batch_updates", params: payload

      expect(BatchUpdate.count).to eq 1
      expect(BatchUpdate.first.user_id).to eq "def456"
      jobs = ActiveJob::Base.queue_adapter.enqueued_jobs
      expect(jobs.count).to eq 1
    end

    it "works with tags" do
      payload = {
        batch_update: {
          artworks: [1, 2, 3],
          tags: {
            toAdd: %w[foo bar],
            toRemove: %w[baz bang]
          }
        }
      }

      post "/batch_updates", params: payload

      expect(BatchUpdate.count).to eq 1
      expect(BatchUpdate.first.user_id).to eq "def456"
      expect(BatchUpdate.first.tags["toAdd"]).to include "foo"
      expect(BatchUpdate.first.tags["toAdd"]).to include "bar"
      expect(BatchUpdate.first.tags["toRemove"]).to include "baz"
      expect(BatchUpdate.first.tags["toRemove"]).to include "bang"
      jobs = ActiveJob::Base.queue_adapter.enqueued_jobs
      expect(jobs.count).to eq 1
    end

    it "works with both genes and tags" do
      genes = {
        "Fashion Photography" => 100,
        "Painting" => 80
      }

      payload = {
        batch_update: {
          artworks: [1, 2, 3],
          genes: genes,
          tags: {
            toAdd: %w[foo bar],
            toRemove: %w[baz bang]
          }
        }
      }

      post "/batch_updates", params: payload

      expect(BatchUpdate.count).to eq 1
      expect(BatchUpdate.first.user_id).to eq "def456"
      expect(BatchUpdate.first.tags["toAdd"]).to include "foo"
      expect(BatchUpdate.first.tags["toAdd"]).to include "bar"
      expect(BatchUpdate.first.tags["toRemove"]).to include "baz"
      expect(BatchUpdate.first.tags["toRemove"]).to include "bang"
      jobs = ActiveJob::Base.queue_adapter.enqueued_jobs
      expect(jobs.count).to eq 1
    end
  end

  context "with invalid data" do
    before do
      bad_payload = {
        batch_update: {
          artworks: nil,
          genes: nil,
          tags: nil
        }
      }
      post "/batch_updates", params: bad_payload
    end

    it "does not create a BatchUpdate" do
      expect(BatchUpdate.count).to eq 0
    end

    it "returns an informative json error" do
      expect(response).to have_http_status(:unprocessable_entity)
      expect(response.content_type).to eq "application/json"
      err = JSON.parse(response.body)
      expect(err).to match("error_message" => /You must submit at least genes or tags to update this artwork./)
    end
  end
end
