class ProcessBatchUpdateJob < ApplicationJob
  def perform(batch_update_id)
    batch_update = BatchUpdate.find_by id: batch_update_id
    return unless batch_update

    batch_update.artworks.each do |artwork_id|
      UpdateArtworkJob.perform_later artwork_id, batch_update_id
    end
  end
end
